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

  function showStep(step: number): void {
    currentStep = step;
    panels.forEach((panel) => {
      if (!(panel instanceof HTMLElement)) return;
      const n = Number(panel.getAttribute('data-form-step'));
      panel.hidden = n !== step;
    });
    if (stepFill instanceof HTMLElement) {
      stepFill.style.width = `${(step / 3) * 100}%`;
    }
    if (stepLabel) {
      stepLabel.textContent = `Étape ${step}/3 — ${config.stepTitles[step - 1] ?? ''}`;
    }
  }

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
      if (currentStep < 3) showStep(currentStep + 1);
    });
  });

  form.querySelectorAll('[data-form-back]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successEl?.classList.remove('form-message--success');
    errorEl?.classList.remove('form-message--error');
    if (errorEl) errorEl.textContent = config.errorDefault;

    const accessKeyInput = form.querySelector('input[name="access_key"]');
    const accessKey =
      accessKeyInput instanceof HTMLInputElement ? accessKeyInput.value.trim() : '';

    if (isDemoKey(accessKey)) {
      if (successEl) {
        successEl.textContent = config.demoSuccess;
        successEl.classList.add('form-message--success');
      }
      form.reset();
      showStep(1);
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
        if (successEl) successEl.classList.add('form-message--success');
        form.reset();
        showStep(1);
      } else {
        if (errorEl) {
          errorEl.textContent =
            data.message ||
            (response.ok
              ? config.errorDefault
              : `Erreur ${response.status} — ${config.errorDefault}`);
          errorEl.classList.add('form-message--error');
        }
      }
    } catch {
      if (errorEl) {
        errorEl.textContent =
          'Impossible de contacter le serveur. Vérifie ta connexion et réessaie.';
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
