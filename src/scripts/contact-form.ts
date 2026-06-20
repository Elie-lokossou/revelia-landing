interface ContactFormConfig {
  submitLabel: string;
  loadingLabel: string;
  stepTitles: string[];
  successMessage: string;
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

function scrollToFeedback(el: HTMLElement | null): void {
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
}

function setButtonLoading(btn: HTMLButtonElement, loading: boolean, label: string, loadingLabel: string): void {
  btn.disabled = loading;
  btn.classList.toggle('is-loading', loading);
  if (loading) {
    btn.setAttribute('aria-busy', 'true');
    btn.textContent = loadingLabel;
  } else {
    btn.removeAttribute('aria-busy');
    btn.textContent = label;
  }
}

function syncObjectif(form: HTMLFormElement, objectifHidden: HTMLInputElement | null): boolean {
  const selected = form.querySelector('[name="objectif_choice"]:checked');
  if (!(selected instanceof HTMLInputElement) || !selected.value.trim()) {
    form.querySelector('.objective-card')?.classList.add('objective-card--error');
    return false;
  }
  if (objectifHidden instanceof HTMLInputElement) {
    objectifHidden.value = selected.value;
  }
  return true;
}

function validateStep2(form: HTMLFormElement): boolean {
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
    return false;
  }
  return true;
}

function buildFormData(form: HTMLFormElement): FormData {
  const fd = new FormData();

  const accessKeyInput = form.querySelector('input[name="access_key"]');
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  const objectifInput = form.querySelector('#objectif-hidden');
  const subjectInput = form.querySelector('input[name="subject"]');

  fd.append('access_key', accessKeyInput instanceof HTMLInputElement ? accessKeyInput.value.trim() : '');
  fd.append('subject', subjectInput instanceof HTMLInputElement ? subjectInput.value : 'Nouvelle demande — Revelia');
  fd.append('name', nameInput instanceof HTMLInputElement ? nameInput.value.trim() : '');
  fd.append('email', emailInput instanceof HTMLInputElement ? emailInput.value.trim() : '');
  fd.append('message', messageInput instanceof HTMLTextAreaElement ? messageInput.value.trim() : '');
  fd.append('objectif', objectifInput instanceof HTMLInputElement ? objectifInput.value.trim() : '');
  fd.append('botcheck', '');

  return fd;
}

function translateApiError(message: string | undefined, status: number, fallback: string): string {
  if (!message) {
    return status >= 400 ? `Erreur ${status} — ${fallback}` : fallback;
  }
  const lower = message.toLowerCase();
  if (lower.includes('invalid') && lower.includes('access')) {
    return 'Clé d’accès Web3Forms invalide. Vérifiez la configuration du site.';
  }
  if (lower.includes('email') && lower.includes('invalid')) {
    return 'Adresse email invalide. Vérifie le format et réessaie.';
  }
  return message;
}

function initContactForm(): void {
  const form = document.getElementById('contact-form');
  if (!(form instanceof HTMLFormElement)) return;

  const config: ContactFormConfig = JSON.parse(form.dataset.contactConfig ?? '{}');
  const submitBtn = document.getElementById('submit-btn');
  const successPanel = document.getElementById('form-success-panel');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');
  const feedbackEl = document.querySelector('[data-form-feedback]');
  const stepsEl = document.querySelector('[data-form-steps]');
  const footnoteEl = form.querySelector('.contact-form__footnote');
  const demoNoticeEl = form.closest('.contact-form-card')?.querySelector('.contact-form__demo-notice');
  const resetBtn = form.closest('.contact-form-card')?.querySelector('[data-form-reset]');
  const stepFill = document.querySelector('[data-step-fill]');
  const stepLabel = document.querySelector('[data-step-label]');
  const objectifHidden = document.getElementById('objectif-hidden');
  const panels = form.querySelectorAll('[data-form-step]');
  let currentStep = 1;
  let isSubmitting = false;

  function hideFeedback(): void {
    if (successPanel instanceof HTMLElement) {
      successPanel.hidden = true;
    }
    if (successEl instanceof HTMLElement) {
      successEl.hidden = true;
    }
    if (errorEl instanceof HTMLElement) {
      errorEl.hidden = true;
      errorEl.textContent = config.errorDefault;
    }
    if (feedbackEl instanceof HTMLElement) {
      feedbackEl.hidden = true;
    }
    if (resetBtn instanceof HTMLButtonElement) {
      resetBtn.hidden = true;
    }
  }

  function showSuccess(message: string): void {
    hideFeedback();

    if (successPanel instanceof HTMLElement) {
      successPanel.hidden = false;
    }
    if (successEl instanceof HTMLElement) {
      successEl.textContent = message;
      successEl.hidden = false;
    }
    if (errorEl instanceof HTMLElement) {
      errorEl.hidden = true;
    }
    if (feedbackEl instanceof HTMLElement) {
      feedbackEl.hidden = false;
    }
    if (resetBtn instanceof HTMLButtonElement) {
      resetBtn.hidden = false;
    }

    if (stepsEl instanceof HTMLElement) {
      stepsEl.hidden = true;
    }
    panels.forEach((panel) => {
      if (panel instanceof HTMLElement) panel.hidden = true;
    });
    if (footnoteEl instanceof HTMLElement) {
      footnoteEl.hidden = true;
    }
    form.hidden = true;
    if (demoNoticeEl instanceof HTMLElement) {
      demoNoticeEl.hidden = true;
    }

    scrollToFeedback(feedbackEl instanceof HTMLElement ? feedbackEl : successEl);
  }

  function showError(message: string): void {
    if (successPanel instanceof HTMLElement) {
      successPanel.hidden = true;
    }
    if (successEl instanceof HTMLElement) {
      successEl.hidden = true;
    }
    if (errorEl instanceof HTMLElement) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
    if (feedbackEl instanceof HTMLElement) {
      feedbackEl.hidden = false;
    }
    if (resetBtn instanceof HTMLButtonElement) {
      resetBtn.hidden = true;
    }

    scrollToFeedback(feedbackEl instanceof HTMLElement ? feedbackEl : errorEl);
  }

  function resetFormState(): void {
    form.reset();
    hideFeedback();
    form.hidden = false;
    if (stepsEl instanceof HTMLElement) {
      stepsEl.hidden = false;
    }
    if (footnoteEl instanceof HTMLElement) {
      footnoteEl.hidden = false;
    }
    if (demoNoticeEl instanceof HTMLElement) {
      demoNoticeEl.hidden = false;
    }
    currentStep = 1;
    isSubmitting = false;
    activatePanel(1);
    if (objectifHidden instanceof HTMLInputElement) {
      objectifHidden.value = '';
    }
    form.querySelectorAll('.objective-card--error').forEach((el) => {
      el.classList.remove('objective-card--error');
    });
    if (submitBtn instanceof HTMLButtonElement) {
      setButtonLoading(submitBtn, false, config.submitLabel, config.loadingLabel);
    }
  }

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

  function showStep(step: number): void {
    const outgoing = form.querySelector(`[data-form-step="${currentStep}"]`) as HTMLElement | null;
    const incoming = form.querySelector(`[data-form-step="${step}"]`) as HTMLElement | null;

    if (!outgoing || !incoming || step === currentStep) return;

    hideFeedback();

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
      if (currentStep === 1 && !syncObjectif(form, objectifHidden)) return;
      if (currentStep === 2 && !validateStep2(form)) return;
      if (currentStep < 3) showStep(currentStep + 1);
    });
  });

  form.querySelectorAll('[data-form-back]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });
  });

  resetBtn?.addEventListener('click', resetFormState);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    hideFeedback();

    if (!syncObjectif(form, objectifHidden)) {
      showStep(1);
      showError('Choisis un objectif pour continuer.');
      return;
    }

    if (!validateStep2(form)) {
      showStep(2);
      showError('Indique ton prénom et une adresse email valide.');
      return;
    }

    const formData = buildFormData(form);
    const accessKey = formData.get('access_key');
    const accessKeyStr = typeof accessKey === 'string' ? accessKey : '';

    if (isDemoKey(accessKeyStr)) {
      showSuccess(config.demoSuccess);
      return;
    }

    if (!(submitBtn instanceof HTMLButtonElement)) return;

    isSubmitting = true;
    setButtonLoading(submitBtn, true, config.submitLabel, config.loadingLabel);

    let succeeded = false;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      let data: { success?: boolean; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        throw new Error('Réponse invalide du serveur.');
      }

      if (response.ok && data.success) {
        succeeded = true;
        showSuccess(config.successMessage);
      } else {
        showError(translateApiError(data.message, response.status, config.errorDefault));
      }
    } catch {
      showError('Impossible de contacter le serveur. Vérifie ta connexion et réessaie.');
    } finally {
      isSubmitting = false;
      if (!succeeded && submitBtn instanceof HTMLButtonElement) {
        setButtonLoading(submitBtn, false, config.submitLabel, config.loadingLabel);
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
