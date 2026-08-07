
// Safe Storage Wrapper to prevent 'file:' protocol security errors
const memoryStorage = {};
function safeGetItem(key) {
  try { return window.localStorage.getItem(key); }
  catch(e) { return memoryStorage[key] || null; }
}
function safeSetItem(key, value) {
  try { window.localStorage.setItem(key, value); }
  catch(e) { memoryStorage[key] = String(value); }
}
function safeRemoveItem(key) {
  try { window.localStorage.removeItem(key); }
  catch(e) { delete memoryStorage[key]; }
}

/**
 * LuminaStudio - Master JavaScript Engine
 * Commercial Grade - ThemeForest & Envato Elite Author Standard
 * Version: 1.1.0
 * Features: Dark/Light Mode, RTL Engine, Before/After Slider,
 * Passport Spec Checker, Multi-step Booking Wizard, Form Validation,
 * Portfolio Filter, Animated Counters, Toast System, AOS Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     0. IMMEDIATE ANIMATION & AOS INITIALIZATION (Prevents Blank Page Gaps)
     ========================================================================== */
  if (typeof AOS !== 'undefined') {
    try {
      AOS.init({
        duration: 700,
        once: true,
        offset: 30,
        easing: 'ease-out-cubic',
        disable: false
      });
      // Refresh to ensure any dynamic content is visible
      setTimeout(() => { AOS.refresh(); }, 150);
    } catch (err) {
      console.warn('AOS Init notice:', err);
    }
  }

  /* ==========================================================================
     1. THEME CONTROLLER (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlElement = document.documentElement;

  const savedTheme = safeGetItem('lumina_theme') || 'light';
  
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlElement.setAttribute('data-bs-theme', 'dark');
      htmlElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
      updateThemeIcons('dark');
    } else {
      htmlElement.setAttribute('data-bs-theme', 'light');
      htmlElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-mode');
      updateThemeIcons('light');
    }
    safeSetItem('lumina_theme', theme);

    // Trigger dashboard chart theme update if on dashboard
    if (window.updateDashboardChartsTheme) {
      window.updateDashboardChartsTheme(theme);
    }
  }

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun text-warning';
        } else {
          icon.className = 'fa-solid fa-moon text-primary';
        }
      }
    });
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast('Theme Updated', `Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
  });

  /* ==========================================================================
     2. RTL LAYOUT CONTROLLER
     ========================================================================== */
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedRtl = safeGetItem('lumina_rtl') === 'true';

  if (savedRtl) {
    applyRtl(true);
  }

  function applyRtl(isRtl) {
    if (isRtl) {
      htmlElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-mode');
    } else {
      htmlElement.removeAttribute('dir');
      document.body.classList.remove('rtl-mode');
    }
    safeSetItem('lumina_rtl', isRtl);
  }

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyRtl = htmlElement.getAttribute('dir') === 'rtl';
      applyRtl(!isCurrentlyRtl);
      showToast('Layout Updated', `Switched to ${!isCurrentlyRtl ? 'RTL' : 'LTR'} layout`, 'primary');
    });
  });

  /* ==========================================================================
     3. STICKY HEADER, SCROLL PROGRESS & BACK TO TOP
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    if (siteHeader) {
      if (scrollPos > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (scrollProgressBar) {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (scrollPos / windowHeight) * 100 : 0;
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollPos > 250) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3.1 MOUSE TRACKING SPOTLIGHT EFFECT ON CARDS
     ========================================================================== */
  const spotlightCards = document.querySelectorAll('.glass-card, .glass-card-hover, .spotlight-card, .bento-card, .pricing-card, .service-card-luxury');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     3.2 GLOBAL SEARCH & KEYBOARD SHORTCUT (CTRL / CMD + K)
     ========================================================================== */
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchModal = document.getElementById('globalSearchModal');
      if (searchModal && window.bootstrap && window.bootstrap.Modal) {
        const bsModal = window.bootstrap.Modal.getOrCreateInstance(searchModal);
        bsModal.toggle();
      }
    }
  });

  /* ==========================================================================
     4. INTERACTIVE BEFORE / AFTER RETOUCHING SLIDER
     ========================================================================== */
  const baContainers = document.querySelectorAll('.before-after-container');

  baContainers.forEach(container => {
    const beforeWrapper = container.querySelector('.before-img-wrapper');
    const handle = container.querySelector('.slider-handle');
    let isDragging = false;

    if (!beforeWrapper || !handle) return;

    function setSliderPosition(x) {
      const rect = container.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      if (pos < 0) pos = 0;
      if (pos > 1) pos = 1;
      const percentage = pos * 100;

      beforeWrapper.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    // Mouse Events
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Events
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  });

  /* ==========================================================================
     5. PASSPORT & VISA BIOMETRIC SPEC CALCULATOR
     ========================================================================== */
  const passportCountrySelect = document.getElementById('passportCountrySelect');
  const passportCountryPills = document.querySelectorAll('.passport-quick-pill');

  const countrySpecsDatabase = {
    usa: {
      name: 'United States of America (US Passport / Visa)',
      dimensions: '2 x 2 inches (51 x 51 mm)',
      background: 'Plain White or Off-White',
      headHeight: '1 to 1 3/8 inches (25 - 35 mm)',
      resolution: '600 x 600 px min (300 DPI)',
      rules: [
        'Eyeglasses strictly prohibited since 2016',
        'Neutral facial expression with both eyes open',
        'Taken within the last 6 months',
        'Digital biometric JPEG format included'
      ],
      price: '$19.99'
    },
    uk: {
      name: 'United Kingdom (HM Passport Office)',
      dimensions: '35 x 45 mm',
      background: 'Light Grey or Plain Cream',
      headHeight: '29 mm to 34 mm from crown to chin',
      resolution: '720 x 960 px min',
      rules: [
        'Plain light grey background (NOT pure white)',
        'No smiling, mouth completely closed',
        'Official UK Photo Code generated for online renewal',
        'No reflections on eyes or skin'
      ],
      price: '$21.99'
    },
    schengen: {
      name: 'Schengen Area (EU / Germany / France / Italy)',
      dimensions: '35 x 45 mm',
      background: 'Light Grey / Neutral',
      headHeight: '32 mm to 36 mm (70% - 80% face area)',
      resolution: '600 DPI High-Definition',
      rules: [
        'ICAO 9303 Biometric Compliance guaranteed',
        'Uniform lighting without deep shadows',
        'Hair must not obscure facial features or eyes',
        'Printed on premium satin photographic paper'
      ],
      price: '$20.99'
    },
    canada: {
      name: 'Canada (Passport & Permanent Residency PR)',
      dimensions: '50 x 70 mm (2 x 2 3/4 inches)',
      background: 'Plain White or Light-Coloured',
      headHeight: '31 mm to 36 mm',
      resolution: '300 DPI Pristine Studio Quality',
      rules: [
        'Back of one photo stamped with Studio Name & Date',
        'Guarantor signature box spacing preserved',
        'Neutral expression, direct camera gaze',
        '100% government acceptance guaranteed or free retake'
      ],
      price: '$24.99'
    },
    australia: {
      name: 'Australia (Australian Passport Office)',
      dimensions: '35 x 45 mm',
      background: 'Plain White or Light Grey',
      headHeight: '32 mm to 36 mm',
      resolution: 'High resolution glossy or matte',
      rules: [
        'No head coverings unless for religious purposes',
        'Eyes directly aligned with camera lens',
        'No retouching that alters distinctive features',
        'Includes printed set of 4 plus digital copy'
      ],
      price: '$22.99'
    },
    india: {
      name: 'India (Passport & OCI Card)',
      dimensions: '51 x 51 mm (2 x 2 in) or 35 x 45 mm',
      background: 'Plain Light Background (White Preferred)',
      headHeight: '80% facial coverage required',
      resolution: '300 DPI Crisp Biometrics',
      rules: [
        'Frontal view with full face, neck, and shoulders',
        'No spectacles or dark frames',
        'Compliant for Indian Passport, OCI, and Visa',
        'Digital copy formatted to Indian portal file size limits'
      ],
      price: '$19.99'
    },
    china: {
      name: 'China (Chinese Visa & Travel Document)',
      dimensions: '33 x 48 mm',
      background: 'Pure White (No shadow or frame)',
      headHeight: '28 mm to 33 mm',
      resolution: '354 x 472 px to 420 x 560 px',
      rules: [
        'Strict digital validation check passed',
        'No jewelry, earrings, or large head ornaments',
        'Ears and forehead must be visible',
        'Official barcode certification slip provided'
      ],
      price: '$24.99'
    },
    japan: {
      name: 'Japan (Japanese Passport & My Number Card)',
      dimensions: '35 x 45 mm',
      background: 'Plain Solid White or Light Blue',
      headHeight: '34 mm (±2mm)',
      resolution: 'High Definition 600 DPI',
      rules: [
        'Taken strictly within the last 6 months',
        'No hair covering eyes or eyebrows',
        'Clear border demarcation',
        'Strict adherence to Ministry of Foreign Affairs guidelines'
      ],
      price: '$22.99'
    }
  };

  function updateCountrySpecs(countryKey) {
    const data = countrySpecsDatabase[countryKey] || countrySpecsDatabase.usa;
    
    const countryNameEl = document.getElementById('specCountryName');
    const dimensionsEl = document.getElementById('specDimensions');
    const backgroundEl = document.getElementById('specBackground');
    const headHeightEl = document.getElementById('specHeadHeight');
    const rulesListEl = document.getElementById('specRulesList');
    const priceEl = document.getElementById('specPrice');

    if (countryNameEl) countryNameEl.textContent = data.name;
    if (dimensionsEl) dimensionsEl.textContent = data.dimensions;
    if (backgroundEl) backgroundEl.textContent = data.background;
    if (headHeightEl) headHeightEl.textContent = data.headHeight;
    if (priceEl) priceEl.textContent = data.price;

    if (rulesListEl) {
      rulesListEl.innerHTML = data.rules.map(r => `
        <li class="biometric-guide-check">
          <i class="fa-solid fa-circle-check text-success"></i>
          <span>${r}</span>
        </li>
      `).join('');
    }

    // Update active pill state
    passportCountryPills.forEach(pill => {
      if (pill.dataset.country === countryKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    if (passportCountrySelect) {
      passportCountrySelect.value = countryKey;
    }
  }

  if (passportCountrySelect) {
    passportCountrySelect.addEventListener('change', (e) => {
      updateCountrySpecs(e.target.value);
    });
  }

  passportCountryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const country = pill.dataset.country;
      updateCountrySpecs(country);
    });
  });

  if (document.getElementById('specCountryName')) {
    updateCountrySpecs('usa');
  }

  /* ==========================================================================
     6. STEP-BY-STEP BOOKING WIZARD MODAL
     ========================================================================== */
  const bookingModal = document.getElementById('bookingWizardModal');
  if (bookingModal) {
    const stepNodes = bookingModal.querySelectorAll('.wizard-step-node');
    const stepPanes = bookingModal.querySelectorAll('.wizard-step-pane');
    const btnNext = bookingModal.querySelector('#wizardBtnNext');
    const btnPrev = bookingModal.querySelector('#wizardBtnPrev');
    const btnSubmit = bookingModal.querySelector('#wizardBtnSubmit');
    const serviceCards = bookingModal.querySelectorAll('.booking-service-card');
    
    let currentStep = 1;
    const totalSteps = 4;
    let selectedService = 'Passport & Visa Photo';
    let basePrice = 19.99;

    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedService = card.dataset.serviceName || 'Service';
        basePrice = parseFloat(card.dataset.servicePrice || 20);
        updateWizardSummary();
      });
    });

    function showWizardStep(step) {
      stepPanes.forEach(pane => {
        pane.classList.add('d-none');
        if (parseInt(pane.dataset.step) === step) {
          pane.classList.remove('d-none');
        }
      });

      stepNodes.forEach(node => {
        const nodeStep = parseInt(node.dataset.step);
        node.classList.remove('active', 'completed');
        if (nodeStep === step) {
          node.classList.add('active');
        } else if (nodeStep < step) {
          node.classList.add('completed');
          node.innerHTML = '<i class="fa-solid fa-check"></i>';
        } else {
          node.textContent = nodeStep;
        }
      });

      if (btnPrev) {
        if (step === 1) {
          btnPrev.classList.add('d-none');
        } else {
          btnPrev.classList.remove('d-none');
        }
      }

      if (btnNext && btnSubmit) {
        if (step === totalSteps) {
          btnNext.classList.add('d-none');
          btnSubmit.classList.remove('d-none');
          updateWizardSummary();
        } else {
          btnNext.classList.remove('d-none');
          btnSubmit.classList.add('d-none');
        }
      }
    }

    function updateWizardSummary() {
      const sumService = document.getElementById('sumServiceName');
      const sumDate = document.getElementById('sumBookingDate');
      const sumTotal = document.getElementById('sumTotalAmount');
      
      const dateInput = document.getElementById('wizardDateInput');
      const timeInput = document.getElementById('wizardTimeInput');
      
      let addonTotal = 0;
      bookingModal.querySelectorAll('.wizard-addon-check:checked').forEach(addon => {
        addonTotal += parseFloat(addon.dataset.price || 0);
      });

      const finalTotal = basePrice + addonTotal;

      if (sumService) sumService.textContent = selectedService;
      if (sumDate) sumDate.textContent = `${dateInput ? dateInput.value || 'Tomorrow' : 'Tomorrow'} at ${timeInput ? timeInput.value || '10:00 AM' : '10:00 AM'}`;
      if (sumTotal) sumTotal.textContent = `$${finalTotal.toFixed(2)}`;
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          currentStep++;
          showWizardStep(currentStep);
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          showWizardStep(currentStep);
        }
      });
    }

    if (btnSubmit) {
      btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Confirming...';
        btnSubmit.disabled = true;

        setTimeout(() => {
          btnSubmit.innerHTML = 'Book Appointment';
          btnSubmit.disabled = false;
          
          const modalBody = bookingModal.querySelector('.modal-body');
          if (modalBody) {
            modalBody.innerHTML = `
              <div class="text-center py-5">
                <div class="mb-4 d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px; border-radius: 50%; background: var(--success-light); color: var(--success); font-size: 2.5rem;">
                  <i class="fa-solid fa-circle-check"></i>
                </div>
                <h3 class="mb-2">Session Booked Successfully!</h3>
                <p class="text-muted mb-4">Confirmation Reference: <strong class="text-primary">#LUM-${Math.floor(100000 + Math.random() * 900000)}</strong></p>
                <p class="small text-secondary mb-4">We have sent the confirmation details and calendar invite to your email. Our studio is prepped for your session.</p>
                <button type="button" class="btn btn-primary-gradient px-4" data-bs-dismiss="modal">Done</button>
              </div>
            `;
            const modalFooter = bookingModal.querySelector('.modal-footer');
            if (modalFooter) modalFooter.style.display = 'none';
          }
          showToast('Booking Confirmed', 'Your studio session is scheduled!', 'success');
        }, 1200);
      });
    }
  }

  /* ==========================================================================
     7. PORTFOLIO FILTER & LIVE SEARCH
     ========================================================================== */
  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-nav .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item-col');
  const portfolioSearchInput = document.getElementById('portfolioSearchInput');

  function filterPortfolio() {
    const activeBtn = document.querySelector('.portfolio-filter-nav .filter-btn.active');
    const selectedFilter = activeBtn ? activeBtn.dataset.filter : 'all';
    const searchQuery = portfolioSearchInput ? portfolioSearchInput.value.toLowerCase().trim() : '';

    portfolioItems.forEach(item => {
      const category = item.dataset.category || '';
      const title = item.querySelector('.portfolio-title')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('.portfolio-desc')?.textContent.toLowerCase() || '';

      const matchesFilter = selectedFilter === 'all' || category.includes(selectedFilter);
      const matchesSearch = searchQuery === '' || title.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        item.style.display = 'block';
        item.style.animation = 'dropdownFade 0.4s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  }

  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portfolioFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPortfolio();
    });
  });

  if (portfolioSearchInput) {
    portfolioSearchInput.addEventListener('input', filterPortfolio);
  }

  /* ==========================================================================
     8. FORM VALIDATION ENGINE & TOAST NOTIFICATIONS
     ========================================================================== */
  const forms = document.querySelectorAll('.needs-validation-custom');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const submitBtn = form.querySelector('button[type="submit"]');

      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            input.classList.add('is-invalid');
            isValid = false;
          } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          }
        }
      });

      const passwordInput = form.querySelector('#regPassword');
      const confirmInput = form.querySelector('#regConfirmPassword');
      if (passwordInput && confirmInput) {
        if (passwordInput.value !== confirmInput.value) {
          confirmInput.classList.add('is-invalid');
          isValid = false;
        }
      }

      if (isValid) {
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
          submitBtn.disabled = true;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
          form.reset();
          form.querySelectorAll('.is-valid, .is-invalid').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
          showToast('Success!', 'Your submission was received successfully.', 'success');
        }, 1200);
      } else {
        showToast('Validation Error', 'Please check highlighted fields and try again.', 'danger');
      }
    });
  });

  // Password Strength Indicator
  const regPassword = document.getElementById('regPassword');
  const strengthBar = document.getElementById('passwordStrengthBar');
  if (regPassword && strengthBar) {
    regPassword.addEventListener('input', () => {
      const val = regPassword.value;
      let score = 0;
      if (val.length >= 6) score += 25;
      if (/[A-Z]/.test(val)) score += 25;
      if (/[0-9]/.test(val)) score += 25;
      if (/[^A-Za-z0-9]/.test(val)) score += 25;

      strengthBar.style.width = `${score}%`;
      if (score <= 25) strengthBar.style.backgroundColor = 'var(--danger)';
      else if (score <= 50) strengthBar.style.backgroundColor = 'var(--warning)';
      else if (score <= 75) strengthBar.style.backgroundColor = 'var(--info)';
      else strengthBar.style.backgroundColor = 'var(--success)';
    });
  }

  // Toast Function
  window.showToast = function(title, message, type = 'primary') {
    let toastContainer = document.querySelector('.toast-container-global');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3 toast-container-global';
      toastContainer.style.zIndex = '1100';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const iconClass = type === 'success' ? 'fa-circle-check text-success' : 
                      type === 'danger' ? 'fa-circle-exclamation text-danger' : 
                      type === 'warning' ? 'fa-triangle-exclamation text-warning' : 'fa-circle-info text-primary';

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center border-0 glass-card shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-3">
            <i class="fa-solid ${iconClass} fs-4"></i>
            <div>
              <div class="fw-bold text-primary">${title}</div>
              <div class="small text-secondary">${message}</div>
            </div>
          </div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && window.bootstrap.Toast) {
      const bsToast = new window.bootstrap.Toast(toastEl, { delay: 4000 });
      bsToast.show();
      toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    } else {
      setTimeout(() => toastEl.remove(), 4000);
    }
  };

  /* ==========================================================================
     9. ANIMATED NUMBER COUNTERS
     ========================================================================== */
  const counterElements = document.querySelectorAll('.stat-counter-number');
  let countersStarted = false;

  function runCounters() {
    counterElements.forEach(el => {
      const target = parseFloat(el.dataset.target || el.textContent);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = progress * target;

        el.textContent = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  const counterSection = document.querySelector('.stats-counter-section');
  if (counterSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          runCounters();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(counterSection);
  }

  /* ==========================================================================
     10. COUNTDOWN TIMER (COMING SOON PAGE)
     ========================================================================== */
  const countdownContainer = document.getElementById('countdownTimer');
  if (countdownContainer) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    function updateTimer() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) return;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const dEl = document.getElementById('countDays');
      const hEl = document.getElementById('countHours');
      const mEl = document.getElementById('countMinutes');
      const sEl = document.getElementById('countSeconds');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();
  }

  /* ==========================================================================
     11. INIT SWIPER CAROUSELS
     ========================================================================== */
  if (typeof Swiper !== 'undefined') {
    try {
      if (document.querySelector('.testimonials-swiper')) {
        new Swiper('.testimonials-swiper', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 4500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.testimonials-pagination',
            clickable: true,
          },
          breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }
        });
      }

      if (document.querySelector('.portfolio-swiper')) {
        new Swiper('.portfolio-swiper', {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          autoplay: {
            delay: 4000,
          },
          pagination: {
            el: '.portfolio-pagination',
            clickable: true,
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1400: { slidesPerView: 4 }
          }
        });
      }
    } catch (e) {
      console.warn('Swiper init:', e);
    }
  }
});
