
/**
 * LuminaStudio - Authentication, State Management & LocalStorage Engine
 * Pure Frontend Vanilla JavaScript (ES6)
 */

(function() {
  'use strict';

  // Keep these helpers private to this file. main.js has its own helpers,
  // and duplicate top-level declarations prevent this script from loading.
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

  // 1. Initial State & Seed Data for LocalStorage
  const DEFAULT_USERS = [
    {
      id: 'USR-101',
      name: 'Sarah Jenkins',
      email: 'admin@lumina.studio',
      password: 'admin',
      role: 'admin',
      phone: '+1 (555) 019-2834',
      status: 'Active',
      joined: 'Jan 10, 2025',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'USR-102',
      name: 'Alex Morgan',
      email: 'alex@creative.io',
      password: 'password123',
      role: 'customer',
      phone: '+1 (555) 382-9102',
      status: 'Active',
      joined: 'Mar 15, 2025',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'USR-103',
      name: 'Marcus Vance',
      email: 'marcus@vancetech.com',
      password: 'password123',
      role: 'customer',
      phone: '+1 (555) 749-1130',
      status: 'Active',
      joined: 'May 18, 2025',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'USR-104',
      name: 'Elena Rostova',
      email: 'elena.r@fashion.co',
      password: 'password123',
      role: 'customer',
      phone: '+1 (555) 891-2044',
      status: 'Active',
      joined: 'Jun 22, 2025',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
    }
  ];

  const DEFAULT_BOOKINGS = [
    {
      id: 'LUM-89241',
      clientName: 'Alex Morgan',
      clientEmail: 'alex@creative.io',
      service: 'Executive Studio Portrait',
      category: 'Portrait',
      date: 'Oct 24, 2025',
      time: '02:30 PM',
      studio: 'Studio A - Main Stage',
      photographer: 'Marcus Sterling',
      price: 249,
      status: 'Retouching',
      photosCount: 24,
      downloadLink: '#'
    },
    {
      id: 'LUM-78192',
      clientName: 'Marcus Vance',
      clientEmail: 'marcus@vancetech.com',
      service: 'Biometric US Passport (2x2")',
      category: 'Biometric',
      date: 'Oct 18, 2025',
      time: '11:00 AM',
      studio: 'Passport Express Bay',
      photographer: 'Elena Rostova',
      price: 35,
      status: 'Completed',
      photosCount: 6,
      hmpoCode: 'UK-8921-9901-LUM',
      downloadLink: '#'
    },
    {
      id: 'LUM-66514',
      clientName: 'Elena Rostova',
      clientEmail: 'elena.r@fashion.co',
      service: 'Editorial Fashion Lookbook',
      category: 'Commercial',
      date: 'Nov 04, 2025',
      time: '10:00 AM',
      studio: 'Cyclorama Infinity Stage',
      photographer: 'Sarah Jenkins',
      price: 950,
      status: 'Scheduled',
      photosCount: 0,
      downloadLink: '#'
    },
    {
      id: 'LUM-55120',
      clientName: 'David Kim',
      clientEmail: 'david.kim@fintech.org',
      service: 'Corporate Team Headshots',
      category: 'Corporate',
      date: 'Oct 10, 2025',
      time: '03:00 PM',
      studio: 'On-Location Corporate',
      photographer: 'Marcus Sterling',
      price: 650,
      status: 'Completed',
      photosCount: 45,
      downloadLink: '#'
    },
    {
      id: 'LUM-44918',
      clientName: 'Sophia Loren',
      clientEmail: 'sophia@artdesign.net',
      service: 'Schengen Visa Biometric Photo',
      category: 'Biometric',
      date: 'Nov 08, 2025',
      time: '01:15 PM',
      studio: 'Passport Express Bay',
      photographer: 'Elena Rostova',
      price: 40,
      status: 'Pending',
      photosCount: 0,
      downloadLink: '#'
    }
  ];

  const DEFAULT_MESSAGES = [
    {
      id: 'MSG-01',
      name: 'Oliver Thorne',
      email: 'oliver.thorne@acme.com',
      phone: '+1 (555) 234-5678',
      subject: 'Inquiry for 50+ Corporate Headshots',
      message: 'Hello Lumina team! We are looking to book a full day on-site executive portrait session for our executive board in late November. Please send custom pricing.',
      date: 'Oct 20, 2025 - 14:32',
      status: 'Unread'
    },
    {
      id: 'MSG-02',
      name: 'Clara Oswald',
      email: 'clara@travelvisa.co.uk',
      phone: '+44 7700 900077',
      subject: 'UK HMPO Code Verification Question',
      message: 'Hi, do your digital passport codes work for British passport renewal applications directly on the gov.uk portal? Thanks!',
      date: 'Oct 19, 2025 - 09:15',
      status: 'Read'
    },
    {
      id: 'MSG-03',
      name: 'Jonathan Hayes',
      email: 'j.hayes@luxuryliving.com',
      phone: '+1 (555) 998-1122',
      subject: 'Cyclorama Stage Rental for Commercial Ad',
      message: 'Looking to rent Studio B for a 2-day product commercial campaign. Can we bring our own RED camera package and grip crew?',
      date: 'Oct 18, 2025 - 16:45',
      status: 'Read'
    }
  ];

  // Initialize DB in LocalStorage if not present
  function initStorage() {
    if (!safeGetItem('lumina_users')) {
      safeSetItem('lumina_users', JSON.stringify(DEFAULT_USERS));
    }
    if (!safeGetItem('lumina_bookings')) {
      safeSetItem('lumina_bookings', JSON.stringify(DEFAULT_BOOKINGS));
    }
    if (!safeGetItem('lumina_messages')) {
      safeSetItem('lumina_messages', JSON.stringify(DEFAULT_MESSAGES));
    }
  }

  // Toast Notification Helper
  function showToast(message, type = 'success') {
    let container = document.getElementById('lumina-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'lumina-toast-container';
      container.style.cssText = 'position: fixed; top: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; max-width: 360px; pointer-events: none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `glass-card p-3 shadow-lg border-${type === 'success' ? 'success' : 'danger'}`;
    toast.style.cssText = 'pointer-events: auto; animation: slideInToast 0.3s ease-out; display: flex; align-items: center; gap: 12px; backdrop-filter: blur(16px);';
    
    const icon = type === 'success' 
      ? '<i class="fa-solid fa-circle-check text-success fs-5"></i>' 
      : '<i class="fa-solid fa-triangle-exclamation text-danger fs-5"></i>';

    toast.innerHTML = `
      ${icon}
      <div style="flex: 1; font-size: 0.875rem; color: var(--text-primary);">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white" style="font-size: 0.65rem;"></button>
    `;

    container.appendChild(toast);

    toast.querySelector('.btn-close').addEventListener('click', () => {
      toast.remove();
    });

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4500);
  }

  // Add toast animation styles
  if (!document.getElementById('toast-keyframes')) {
    const style = document.createElement('style');
    style.id = 'toast-keyframes';
    style.innerHTML = `
      @keyframes slideInToast {
        from { opacity: 0; transform: translateY(-20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Password Strength Analyzer
  function evaluatePasswordStrength(password) {
    let score = 0;
    if (!password) return { score: 0, text: 'None', color: 'bg-secondary' };
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score: 33, text: 'Weak', color: 'bg-danger' };
    if (score <= 4) return { score: 66, text: 'Good', color: 'bg-warning' };
    return { score: 100, text: 'Strong', color: 'bg-success' };
  }

  // 3. Register Page Handler
  function initRegisterPage() {
    const regForm = document.getElementById('registerForm');
    if (!regForm) return;

    const passInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('regConfirmPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');

    if (passInput && strengthBar && strengthLabel) {
      passInput.addEventListener('input', () => {
        const { score, text, color } = evaluatePasswordStrength(passInput.value);
        strengthBar.style.width = score + '%';
        strengthBar.className = `progress-bar ${color}`;
        strengthLabel.textContent = `Strength: ${text}`;
      });
    }

    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const firstName = document.getElementById('regFirstName')?.value.trim();
      const lastName = document.getElementById('regLastName')?.value.trim();
      const email = document.getElementById('regEmail')?.value.trim().toLowerCase();
      const phone = document.getElementById('regPhone')?.value.trim();
      const password = passInput?.value;
      const confirmPassword = confirmInput?.value;
      const termsCheck = document.getElementById('termsCheck')?.checked;

      // Validation
      if (!firstName || !lastName) {
        showToast('Please enter your full name.', 'danger');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please provide a valid email address.', 'danger');
        return;
      }
      if (!phone) {
        showToast('Please enter your contact phone number.', 'danger');
        return;
      }
      if (!password || password.length < 6) {
        showToast('Password must be at least 6 characters.', 'danger');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match.', 'danger');
        confirmInput?.focus();
        return;
      }
      if (!termsCheck) {
        showToast('You must agree to the Terms & Privacy Policy.', 'danger');
        return;
      }

      // Check duplicate
      const users = JSON.parse(safeGetItem('lumina_users') || '[]');
      if (users.some(u => u.email === email)) {
        showToast('An account with this email already exists. Please log in.', 'danger');
        return;
      }

      // Create new customer user object
      const newUser = {
        id: 'USR-' + Math.floor(100 + Math.random() * 900),
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
        role: 'customer',
        phone: phone,
        status: 'Active',
        joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      };

      users.push(newUser);
      safeSetItem('lumina_users', JSON.stringify(users));
      safeSetItem('lumina_temp_login_email', email);

      showToast('Account created successfully! Redirecting to login...', 'success');

      setTimeout(() => {
        // Registration is complete; take the user to sign in without leaving
        // the completed form in the browser history.
        window.location.replace('login.html?registered=true');
      }, 1200);
    });
  }

// 4. Login Page Handler
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');

    // Prevent main.js generic form validation from handling the login form
    loginForm.classList.remove('needs-validation-custom');

    // ============================================================
    // Unauthorized admin redirect message
    // ============================================================
    const redirectMsg = sessionStorage.getItem('lumina_auth_redirect_msg');

    if (redirectMsg) {
        showToast(redirectMsg, 'danger');
        sessionStorage.removeItem('lumina_auth_redirect_msg');
    }

    // ============================================================
    // Registration redirect
    // ============================================================
    const urlParams = new URLSearchParams(window.location.search);
    const tempEmail = safeGetItem('lumina_temp_login_email');

    if (
        urlParams.get('registered') === 'true' &&
        tempEmail &&
        emailInput
    ) {
        emailInput.value = tempEmail;

        showToast(
            'Registration successful! Please enter your password to sign in.',
            'success'
        );

        safeRemoveItem('lumina_temp_login_email');

        if (passInput) {
            passInput.focus();
        }
    }

    // ============================================================
    // Login Submit
    // ============================================================
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const email = emailInput?.value.trim().toLowerCase() || '';
        const password = passInput?.value || '';

        // Remove previous validation states
        emailInput?.classList.remove('is-invalid');
        passInput?.classList.remove('is-invalid');

        // ========================================================
        // Empty field validation
        // ========================================================
        if (!email || !password) {

            if (!email) {
                emailInput?.classList.add('is-invalid');
            }

            if (!password) {
                passInput?.classList.add('is-invalid');
            }

            showToast(
                'Please enter both email and password.',
                'danger'
            );

            return;
        }

        // ========================================================
        // Get users from LocalStorage
        // ========================================================
        let users = [];

        try {
            users = JSON.parse(
                safeGetItem('lumina_users') || '[]'
            );
        } catch (error) {
            console.error(
                'LuminaStudio: Unable to read users from LocalStorage.',
                error
            );

            showToast(
                'Unable to access account data. Please try again.',
                'danger'
            );

            return;
        }

        // ========================================================
        // Find user
        // ========================================================
        const user = users.find(
            u =>
                u.email &&
                String(u.email).toLowerCase() === email
        );

        // ========================================================
        // Invalid credentials
        // ========================================================
        if (!user || user.password !== password) {

            emailInput?.classList.add('is-invalid');
            passInput?.classList.add('is-invalid');

            showToast(
                'Invalid email or password. Please check your credentials.',
                'danger'
            );

            // Login shake animation
            loginForm.classList.remove('animate-shake');

            // Force browser reflow so animation can restart
            void loginForm.offsetWidth;

            loginForm.classList.add('animate-shake');

            setTimeout(() => {
                loginForm.classList.remove('animate-shake');
            }, 600);

            return;
        }

        // ========================================================
        // Successful Login
        // ========================================================
        safeSetItem(
            'lumina_current_user',
            JSON.stringify(user)
        );

        // Clear validation states
        emailInput?.classList.remove('is-invalid');
        passInput?.classList.remove('is-invalid');

        showToast(
            `Welcome back, ${user.name}!`,
            'success'
        );

        // ========================================================
        // Redirect based on role
        // ========================================================
        setTimeout(() => {

            if (user.role === 'admin') {
                window.location.replace(
                    'admin-dashboard.html'
                );
            } else {
                window.location.replace(
                    'index.html'
                );
            }

        }, 800);
    });
}

  // 5. Contact Form Handler (Persists to localStorage lumina_messages)
  function initContactForm() {
    const contactForm = document.getElementById('contactForm') || document.getElementById('contactInquiryForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const phone = document.getElementById('contactPhone')?.value.trim() || 'N/A';
      const serviceSelect = document.getElementById('contactService');
      const subject = serviceSelect?.value || document.getElementById('contactSubject')?.value.trim() || 'General Studio Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'danger');
        return;
      }

      const messages = JSON.parse(safeGetItem('lumina_messages') || '[]');
      const newMsg = {
        id: 'MSG-' + (messages.length + 1).toString().padStart(2, '0'),
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Unread'
      };

      messages.unshift(newMsg);
      safeSetItem('lumina_messages', JSON.stringify(messages));

      showToast('Thank you! Your inquiry has been sent directly to the Admin messages inbox.', 'success');
      contactForm.reset();
    });
  }

  // 6. Booking Wizard LocalStorage Persistence
  function initBookingPersistence() {
    const confirmBookingBtn = document.getElementById('confirmBookingFinalBtn');
    if (!confirmBookingBtn) return;

    confirmBookingBtn.addEventListener('click', (e) => {
      const currentUser = JSON.parse(safeGetItem('lumina_current_user') || 'null');
      const name = document.getElementById('bookFullName')?.value.trim() || (currentUser ? currentUser.name : 'Alex Morgan');
      const email = document.getElementById('bookEmail')?.value.trim() || (currentUser ? currentUser.email : 'alex@creative.io');
      const service = document.getElementById('bookServiceSelect')?.value || 'Executive Studio Portrait';
      const date = document.getElementById('bookDateInput')?.value || new Date().toISOString().split('T')[0];
      const time = document.getElementById('bookTimeSelect')?.value || '02:00 PM';

      const bookings = JSON.parse(safeGetItem('lumina_bookings') || '[]');
      const refId = 'LUM-' + Math.floor(10000 + Math.random() * 90000);

      const newBooking = {
        id: refId,
        clientName: name,
        clientEmail: email,
        service: service,
        category: service.toLowerCase().includes('passport') ? 'Biometric' : 'Portrait',
        date: date,
        time: time,
        studio: 'Studio A - Main Stage',
        photographer: 'Marcus Sterling',
        price: service.toLowerCase().includes('passport') ? 35 : 249,
        status: 'Confirmed',
        photosCount: 0,
        downloadLink: '#'
      };

      bookings.unshift(newBooking);
      safeSetItem('lumina_bookings', JSON.stringify(bookings));

      // Close modal if open
      const modalEl = document.getElementById('bookingWizardModal');
      if (modalEl && window.bootstrap) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }

      showToast(`Appointment Confirmed! Reference: ${refId}. Saved to Studio Database.`, 'success');
    });
  }

  // 7. Dynamic Header Auth State Management ("Welcome, {username}" / "Login" Button)
  function renderHeaderAuthState() {
    const headerActions = document.querySelector('.site-header .ms-auto');
    if (!headerActions) return;

    let authSlot = document.getElementById('luminaHeaderAuthSlot');
    if (!authSlot) {
      authSlot = document.createElement('div');
      authSlot.id = 'luminaHeaderAuthSlot';
      authSlot.className = 'd-inline-flex align-items-center';

      // Insert right before Book Session button or before mobile menu toggle
      const bookBtn = headerActions.querySelector('[data-bs-target="#bookingWizardModal"]');
      if (bookBtn) {
        headerActions.insertBefore(authSlot, bookBtn);
      } else {
        headerActions.appendChild(authSlot);
      }
    }

    const currentUser = JSON.parse(safeGetItem('lumina_current_user') || 'null');

    if (currentUser) {
      const firstName = currentUser.name.split(' ')[0];
      const roleBadge = currentUser.role === 'admin' ? 'Studio Admin' : 'Client';
      const badgeColor = currentUser.role === 'admin' ? 'bg-primary' : 'bg-success';

      authSlot.innerHTML = `
        <div class="dropdown user-header-dropdown d-inline-block">
          <button class="btn btn-sm btn-glass dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="border-radius: var(--radius-full); padding: 0.35rem 0.85rem;">
            <i class="fa-solid fa-circle-user text-primary" aria-hidden="true" style="font-size: 1.45rem;"></i>
            <span class="d-none d-md-inline" style="font-weight: 600; font-size: 0.84rem;">Welcome, <span class="text-primary">${firstName}</span></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-glass dropdown-menu-end shadow-lg py-2" style="min-width: 220px;">
            <li class="px-3 py-2 border-bottom border-secondary border-opacity-10 mb-1">
              <div class="fw-bold text-truncate" style="font-size: 0.88rem;">${currentUser.name}</div>
              <small class="text-muted text-truncate d-block" style="font-size: 0.75rem;">${currentUser.email}</small>
              <span class="badge ${badgeColor} text-white mt-1" style="font-size: 0.65rem; text-transform: uppercase;">${roleBadge}</span>
            </li>
            ${currentUser.role === 'admin' ? '<li><a class="dropdown-item" href="admin-dashboard.html"><i class="fa-solid fa-chart-pie me-2 text-primary"></i> Admin Dashboard</a></li>' : ''}
            <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#bookingWizardModal"><i class="fa-regular fa-calendar-check me-2 text-primary"></i> Book Studio Session</a></li>
            <li><hr class="dropdown-divider border-secondary border-opacity-10 my-1"></li>
            <li><a class="dropdown-item text-danger lumina-logout-btn" href="#" style="cursor: pointer;"><i class="fa-solid fa-right-from-bracket me-2"></i> Logout</a></li>
          </ul>
        </div>
      `;
    } else {
      const isContactPage = window.location.pathname.includes('contact.html');
      if (isContactPage) {
        authSlot.innerHTML = `
         <a href="login.html" class="btn btn-sm btn-glass d-none d-lg-inline-flex align-items-center gap-2" style="border-radius: var(--radius-full); padding: 0.4rem 0.95rem; font-weight: 600; font-size: 0.84rem;">
          <i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Login</span>
         </a>
        `;
      } else {
        authSlot.innerHTML = `
         <a href="register.html" class="btn btn-sm btn-primary-gradient btn-shimmer d-none d-lg-inline-flex align-items-center gap-2" style="border-radius: var(--radius-full); padding: 0.4rem 0.95rem; font-weight: 600; font-size: 0.84rem;">
          <i class="fa-solid fa-user-plus"></i> <span>Sign Up</span>
         </a>
        `;
      }
    }

// Target ALL login buttons (Desktop header, Mobile menu, and duplicates)
    const loginBtns = document.querySelectorAll('#luminaHeaderLoginBtn, .offcanvas-body a[href="login.html"]');

    loginBtns.forEach(btn => {
      if (currentUser) {
        // 1. Force inline style with !important
        btn.setAttribute('style', 'display: none !important;');
        // 2. Add standard Bootstrap hide class
        btn.classList.add('d-none');
        // 3. CRUCIAL: Remove Bootstrap responsive flex classes that override hidden states
        btn.classList.remove('d-sm-inline-flex', 'd-inline-flex', 'd-flex', 'd-block');
      } else {
        // Restore visibility if the user logs out
        btn.removeAttribute('style');
        // Add back the responsive flex class for the main header button
        if (btn.id === 'luminaHeaderLoginBtn') {
          btn.classList.add('d-none', 'd-sm-inline-flex');
        } else {
          btn.classList.remove('d-none');
        }
      }
    });

    // Attach logout click handlers
    document.querySelectorAll('.lumina-logout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        safeRemoveItem('lumina_current_user');
        showToast('You have been signed out.', 'success');
        renderHeaderAuthState();
        updateMobileOffcanvasAuth();
      });
    });

    updateMobileOffcanvasAuth();
  }

  // Update Mobile Offcanvas Menu Auth Profile & Links
  function updateMobileOffcanvasAuth() {
    const offcanvas = document.getElementById('mobileMenuOffcanvas');
    if (!offcanvas) return;

    let mobileAuthArea = document.getElementById('mobileAuthProfileSlot');
    if (!mobileAuthArea) {
      mobileAuthArea = document.createElement('div');
      mobileAuthArea.id = 'mobileAuthProfileSlot';
      const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
      if (offcanvasBody) {
        offcanvasBody.insertBefore(mobileAuthArea, offcanvasBody.firstChild);
      }
    }

    const currentUser = JSON.parse(safeGetItem('lumina_current_user') || 'null');
    if (currentUser) {
      mobileAuthArea.innerHTML = `
        <div class="glass-card p-3 mb-3 border-primary border-opacity-25 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-circle-user text-primary" aria-hidden="true" style="font-size: 2.4rem;"></i>
            <div>
              <div class="fw-bold" style="font-size: 0.88rem;">Welcome, ${currentUser.name}</div>
              <small class="text-muted" style="font-size: 0.75rem;">${currentUser.email}</small>
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-outline-danger lumina-logout-btn py-1 px-2" title="Sign Out">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      `;
    } else {
      mobileAuthArea.innerHTML = '';
    }

    // Attach logout click handlers inside offcanvas
    mobileAuthArea.querySelectorAll('.lumina-logout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        safeRemoveItem('lumina_current_user');
        showToast('You have been signed out.', 'success');
        renderHeaderAuthState();
      });
    });
  }

  // 8. Initialize Auth Functions on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    initRegisterPage();
    initLoginPage();
    initContactForm();
    initBookingPersistence();
    renderHeaderAuthState();
  });

  // Expose global helpers
  window.LuminaAuth = {
    showToast,
    getUsers: () => JSON.parse(safeGetItem('lumina_users') || '[]'),
    getBookings: () => JSON.parse(safeGetItem('lumina_bookings') || '[]'),
    getMessages: () => JSON.parse(safeGetItem('lumina_messages') || '[]'),
    getCurrentUser: () => JSON.parse(safeGetItem('lumina_current_user') || 'null'),
    renderHeaderAuthState,
    logout: () => {
      safeRemoveItem('lumina_current_user');
      showToast('You have been signed out.', 'success');
      renderHeaderAuthState();
    }
  };

})();
