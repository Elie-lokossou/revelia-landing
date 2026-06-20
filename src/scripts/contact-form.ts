interface ContactFormConfig {
  submitLabel: string;
  stepTitles: string[];
  errorDefault: string;
  demoSuccess: string;
}

const DEMO_KEY = 'demo-key-replace-me';

function isDemoKey(key: string): boolean {
  return !key.trim() || key.trim() === DEMO_KEY;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initContactForm(): void {
  const form = document.getElementById('contact-form');
  if (!(form instanceof HTMLFormElement)) return;

  const config: ContactFormConfig = JSON.parse(form.dataset.contactConfig ?? '{}');
  const submitBtn = document.getElementById('submit-btn');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');
  const stepFill = document.querySelector('[data-step-fill]');
  const stepLabel = document.querySelector('[data-step-label]');
  const objectifHidden = document.getElementById('objectif-hidden');
  const panels = form.querySelectorAll('[data-form-step]');
  let currentStep = 1;

  function activatePanel(step: number): void {
    panels.forEach((panel) => {
      if (!(panel instanceof HTMLElement)) return;
      const n = Number(panel.getAttribute('data-form-step'));
      panel.hidden = n !== step;
      panel.classList.remove('is-exiting', 'is-entering', 'is-active');
      if (n === step) panel.classList.add('is-active');
    });
    if (stepFill instanceof HTMLElement) {
      stepFill.style.width = `${(step / 3) * 100}%`;
    }
    if (stepLabel) {
      stepLabel.textContent = `Étape ${step}/3 — ${config.stepTitles[step - 1] ?? ''}`;
    }
  }

  function showStep(step: number, direction: 'forward' | 'back' = 'forward'): void {
    const outgoing = form.querySelector(`[data-form-step="${currentStep}"]`) as HTMLElement | null;
    const incoming = form.querySelector(`[data-form-step="${step}"]`) as HTMLElement | null;

    if (!outgoing || !incoming || step === currentStep) return;

    if (prefersReducedMotion()) {
      currentStep = step;
      activatePanel(step);
      return;
    }

    outgoing.classList.remove('is-active');
    outgoing.classList.add('is-exiting');
    incoming.hidden = false;
    incoming.classList.add('is-entering');

    window.setTimeout(() => {
      outgoing.hidden = true;
      outgoing.classList.remove('is-exiting');
      incoming.classList.remove('is-entering');
      incoming.classList.add('is-active');
      currentStep = step;

      if (stepFill instanceof HTMLElement) {
        stepFill.style.width = `${(step / 3) * 100}%`;
      }
      if (stepLabel) {
        stepLabel.textContent = `Étape ${step}/3 — ${config.stepTitles[step - 1] ?? ''}`;
      }
    }, 320);
  }

  activatePanel(1);

  form.querySelectorAll('[data-form-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep === 1) {
        const selected = form.querySelector('[name="objectif_choice"]:checked');
        if (!(selected instanceof HTMLInputElement)) {
          form.querySelector('.objective-card')?.classList.add('objective-card--error');
          return;
        }
        if (objectifHidden instanceof HTMLInputElement) {
          objectifHidden.value = selected.value;
        }
      }
      if (currentStep === 2) {
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        if (
          !(name instanceof HTMLInputElement) ||
          !(email instanceof HTMLInputElement) ||
          !name.value.trim() ||
          !email.value.trim() ||
          !email.checkValidity()
        ) {
          if (name instanceof HTMLInputElement) name.reportValidity();
          if (email instanceof HTMLInputElement) email.reportValidity();
          return;
        }
      }
      if (currentStep < 3) showStep(currentStep + 1, 'forward');
    });
  });

  form.querySelectorAll('[data-form-back]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) showStep(currentStep - 1, 'back');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (successEl) {
      successEl.hidden = true;
      successEl.classList.remove('form-message--success');
    }
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.classList.remove('form-message--error');
      errorEl.textContent = config.errorDefault;
    }

    const accessKeyInput = form.querySelector('input[name="access_key"]');
    const accessKey =
      accessKeyInput instanceof HTMLInputElement ? accessKeyInput.value.trim() : '';

    if (isDemoKey(accessKey)) {
      if (successEl) {
        successEl.textContent = config.demoSuccess;
        successEl.hidden = false;
        successEl.classList.add('form-message--success');
      }
      form.reset();
      activatePanel(1);
      currentStep = 1;
      return;
    }

    if (!(submitBtn instanceof HTMLButtonElement)) return;

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.textContent = 'Envoi en cours…';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form),
      });

      let data: { success?: boolean; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        throw new Error('Réponse invalide du serveur.');
      }

      if (response.ok && data.success) {
        if (successEl) {
          successEl.hidden = false;
          successEl.classList.add('form-message--success');
        }
        form.reset();
        activatePanel(1);
        currentStep = 1;
      } else {
        if (errorEl) {
          errorEl.textContent =
            data.message ||
            (response.ok
              ? config.errorDefault
              : `Erreur ${response.status} — ${config.errorDefault}`);
          errorEl.hidden = false;
          errorEl.classList.add('form-message--error');
        }
      }
    } catch {
      if (errorEl) {
        errorEl.textContent =
          'Impossible de contacter le serveur. Vérifie ta connexion et réessaie.';
        errorEl.hidden = false;
        errorEl.classList.add('form-message--error');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = config.submitLabel;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
