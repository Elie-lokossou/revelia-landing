import { icon } from '../icons';

interface QuizAnswer {
  id: string;
  text: string;
  icon: string;
  profile: string;
  scores: Record<string, number>;
}

interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
}

interface QuizProfile {
  name: string;
  description: string;
  offer: string;
  offerReason: string;
}

interface QuizConfig {
  progressLabel: string;
  questions: QuizQuestion[];
  profiles: Record<string, QuizProfile>;
  scores: { id: string; label: string; key: string }[];
  recommendCta?: string;
  recommendCtaHref?: string;
}

function initQuiz(): void {
  const app = document.getElementById('quiz-app');
  if (!app) return;

  const config: QuizConfig = JSON.parse(app.dataset.quizConfig ?? '{}');
  const panels = {
    intro: app.querySelector('[data-quiz-panel="intro"]') as HTMLElement,
    questions: app.querySelector('[data-quiz-panel="questions"]') as HTMLElement,
    analyzing: app.querySelector('[data-quiz-panel="analyzing"]') as HTMLElement,
    results: app.querySelector('[data-quiz-panel="results"]') as HTMLElement,
  };

  const progressLabel = app.querySelector('[data-quiz-progress-label]') as HTMLElement;
  const progressFill = app.querySelector('[data-quiz-progress-fill]') as HTMLElement;
  const questionEl = app.querySelector('[data-quiz-question]') as HTMLElement;
  const answersEl = app.querySelector('[data-quiz-answers]') as HTMLElement;
  const profileEl = app.querySelector('[data-quiz-profile]') as HTMLElement;
  const scoresEl = app.querySelector('[data-quiz-scores]') as HTMLElement;
  const recommendContent = app.querySelector('[data-quiz-recommend-content]') as HTMLElement;

  let currentQ = 0;
  const profileCounts: Record<string, number> = {};
  const scoreTotals: Record<string, number> = { confiance: 0, corps: 0, mental: 0, energie: 0 };

  function showPanel(name: keyof typeof panels): void {
    Object.entries(panels).forEach(([key, el]) => {
      if (el) el.hidden = key !== name;
    });
  }

  function renderQuestion(): void {
    const q = config.questions[currentQ];
    if (!q) return;

    const total = config.questions.length;
    progressLabel.textContent = config.progressLabel
      .replace('{current}', String(currentQ + 1))
      .replace('{total}', String(total));
    progressFill.style.width = `${((currentQ + 1) / total) * 100}%`;
    questionEl.textContent = q.question;

    answersEl.innerHTML = '';
    q.answers.forEach((answer) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz__answer-card';
      btn.innerHTML = `<span class="quiz__answer-icon">${icon(answer.icon, 28)}</span><span class="quiz__answer-text">${answer.text}</span>`;
      btn.addEventListener('click', () => selectAnswer(answer));
      answersEl.appendChild(btn);
    });
  }

  function selectAnswer(answer: QuizAnswer): void {
    profileCounts[answer.profile] = (profileCounts[answer.profile] ?? 0) + 1;
    Object.entries(answer.scores).forEach(([key, val]) => {
      scoreTotals[key] = (scoreTotals[key] ?? 0) + val;
    });

    currentQ++;
    if (currentQ < config.questions.length) {
      renderQuestion();
    } else {
      showAnalyzing();
    }
  }

  function showAnalyzing(): void {
    showPanel('analyzing');
    setTimeout(showResults, 2200);
  }

  function getDominantProfile(): string {
    let max = 0;
    let dominant = 'exploratrice';
    Object.entries(profileCounts).forEach(([profile, count]) => {
      if (count > max) {
        max = count;
        dominant = profile;
      }
    });
    return dominant;
  }

  function computeScorePercent(key: string): number {
    const max = config.questions.length * 4;
    const raw = scoreTotals[key] ?? 0;
    return Math.min(95, Math.max(45, Math.round((raw / max) * 100)));
  }

  function showResults(): void {
    const profileKey = getDominantProfile();
    const profile = config.profiles[profileKey];
    if (!profile) return;

    profileEl.innerHTML = `
      <p class="quiz__profile-name">${profile.name}</p>
      <p class="quiz__profile-desc">${profile.description}</p>
    `;

    scoresEl.innerHTML = '';
    config.scores.forEach((s) => {
      const pct = computeScorePercent(s.key);
      const bar = document.createElement('div');
      bar.className = 'quiz__score-item';
      bar.innerHTML = `
        <div class="quiz__score-header">
          <span>${s.label}</span>
          <span class="quiz__score-pct" data-target="${pct}">0%</span>
        </div>
        <div class="quiz__score-bar"><div class="quiz__score-fill" style="width: 0%" data-fill="${pct}"></div></div>
      `;
      scoresEl.appendChild(bar);
    });

    const recommendCta = config.recommendCta ?? 'Découvrir la méthode Revelia';
    const recommendCtaHref = config.recommendCtaHref ?? '#methode';

    recommendContent.innerHTML = `
      <p class="quiz__recommend-offer">${profile.offer}</p>
      <p class="quiz__recommend-reason">${profile.offerReason}</p>
      <a href="${recommendCtaHref}" class="hero__link-secondary">${recommendCta} ${icon('arrow', 16)}</a>
    `;

    showPanel('results');

    requestAnimationFrame(() => {
      scoresEl.querySelectorAll('.quiz__score-fill').forEach((fill) => {
        const pct = fill.getAttribute('data-fill') ?? '0';
        (fill as HTMLElement).style.width = `${pct}%`;
      });
      scoresEl.querySelectorAll('.quiz__score-pct').forEach((el) => {
        const target = Number(el.getAttribute('data-target') ?? 0);
        animateNumber(el as HTMLElement, 0, target, 1200);
      });
    });
  }

  function animateNumber(el: HTMLElement, from: number, to: number, duration: number): void {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(from + (to - from) * eased)}%`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  app.querySelector('[data-quiz-start]')?.addEventListener('click', () => {
    currentQ = 0;
    Object.keys(profileCounts).forEach((k) => delete profileCounts[k]);
    Object.keys(scoreTotals).forEach((k) => (scoreTotals[k] = 0));
    showPanel('questions');
    renderQuestion();
  });

  app.querySelector('[data-quiz-email-form]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = app.querySelector('[data-quiz-email-input]') as HTMLInputElement;
    if (input?.value) {
      try {
        localStorage.setItem('revelia-quiz-email', input.value);
      } catch { /* noop */ }
    }
    (app.querySelector('[data-quiz-email]') as HTMLElement).hidden = true;
  });

  app.querySelector('[data-quiz-email-skip]')?.addEventListener('click', () => {
    (app.querySelector('[data-quiz-email]') as HTMLElement).hidden = true;
  });
}

initQuiz();
