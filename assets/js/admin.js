
/**
 * LuminaStudio - Admin Dashboard Controller
 * Pure Frontend Vanilla JavaScript (ES6)
 */

(function() {
  'use strict';

  // Keep storage helpers local: main.js and auth.js are loaded on this page.
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

  let bookingsChartInstance = null;
  let revenueChartInstance = null;

  // 1. Chart Utilities
  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    return {
      textColor: isDark ? '#94a3b8' : '#64748b',
      gridColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
      primary: '#6366f1',
      primaryGlow: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.15)',
      accent: '#06b6d4',
      amber: '#f59e0b',
      emerald: '#10b981',
      rose: '#f43f5e'
    };
  }

  function initAdminCharts() {
    const theme = getThemeColors();

    // Chart 1: Monthly Studio Bookings & Growth
    const bookingsCanvas = document.getElementById('adminBookingsChart');
    if (bookingsCanvas && window.Chart) {
      if (bookingsChartInstance) bookingsChartInstance.destroy();

      bookingsChartInstance = new Chart(bookingsCanvas, {
        type: 'bar',
        data: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          datasets: [
            {
              label: 'Total Sessions Booked',
              data: [42, 58, 65, 84, 98, 124],
              backgroundColor: theme.primary,
              borderRadius: 6,
              barPercentage: 0.55
            },
            {
              label: 'Passport Digital Codes Generated',
              data: [85, 110, 135, 160, 190, 245],
              backgroundColor: theme.accent,
              borderRadius: 6,
              barPercentage: 0.55
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { color: theme.textColor, font: { family: 'Plus Jakarta Sans', size: 12 } }
            }
          },
          scales: {
            x: {
              grid: { color: theme.gridColor },
              ticks: { color: theme.textColor, font: { family: 'Plus Jakarta Sans' } }
            },
            y: {
              grid: { color: theme.gridColor },
              ticks: { color: theme.textColor, font: { family: 'Plus Jakarta Sans' } }
            }
          }
        }
      });
    }

    // Chart 2: Revenue Breakdown by Category
    const revenueCanvas = document.getElementById('adminRevenueCategoryChart');
    if (revenueCanvas && window.Chart) {
      if (revenueChartInstance) revenueChartInstance.destroy();

      revenueChartInstance = new Chart(revenueCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Executive Portraits', 'Biometric Passport & Visa', 'Commercial Lookbooks', 'Weddings & Events'],
          datasets: [{
            data: [42, 28, 20, 10],
            backgroundColor: [theme.primary, theme.accent, theme.amber, theme.emerald],
            borderWidth: 0,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: theme.textColor, padding: 16, font: { family: 'Plus Jakarta Sans', size: 11 } }
            }
          }
        }
      });
    }
  }

  // 2. Render Users Table
  function renderUsersTable(filterQuery = '') {
    const tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;

    const users = JSON.parse(safeGetItem('lumina_users') || '[]');
    const filtered = users.filter(u => 
      u.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(filterQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(filterQuery.toLowerCase())
    );

    document.getElementById('totalUsersCountBadge').textContent = `${users.length} Registered`;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No users found matching "${filterQuery}"</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(u => `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-2">
            <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}" class="rounded-circle" style="width: 36px; height: 36px; object-fit: cover;" alt="${u.name}">
            <div>
              <div class="fw-bold text-primary">${u.name}</div>
              <small class="text-muted">${u.id}</small>
            </div>
          </div>
        </td>
        <td><span class="small">${u.email}</span></td>
        <td><span class="badge ${u.role === 'admin' ? 'bg-warning text-dark' : 'bg-primary-gradient'} px-2 py-1">${u.role.toUpperCase()}</span></td>
        <td><span class="small text-muted">${u.phone || 'N/A'}</span></td>
        <td><span class="badge bg-success-subtle text-success border border-success border-opacity-25">${u.status || 'Active'}</span></td>
        <td>
          <div class="dropdown">
            <button class="btn btn-sm btn-glass" type="button" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <ul class="dropdown-menu dropdown-menu-glass">
              <li><a class="dropdown-item" href="javascript:void(0)" onclick="window.LuminaAdmin.viewUser('${u.id}')"><i class="fa-solid fa-eye me-2"></i> View Profile</a></li>
              <li><a class="dropdown-item" href="javascript:void(0)" onclick="window.LuminaAdmin.toggleUserStatus('${u.id}')"><i class="fa-solid fa-user-gear me-2"></i> Toggle Status</a></li>
              <li><hr class="dropdown-divider border-secondary border-opacity-10"></li>
              <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="window.LuminaAdmin.deleteUser('${u.id}')"><i class="fa-solid fa-trash-can me-2"></i> Remove User</a></li>
            </ul>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // 3. Render Bookings / Orders Table
  function renderBookingsTable(statusFilter = 'all', searchQuery = '') {
    const tbody = document.getElementById('adminBookingsTableBody');
    if (!tbody) return;

    const bookings = JSON.parse(safeGetItem('lumina_bookings') || '[]');
    let filtered = bookings.filter(b => {
      const matchesStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.service.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    document.getElementById('totalBookingsBadge').textContent = `${bookings.length} Total`;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No orders or bookings found</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(b => {
      let badgeClass = 'bg-secondary';
      if (b.status === 'Completed') badgeClass = 'bg-success';
      if (b.status === 'Retouching') badgeClass = 'bg-warning text-dark';
      if (b.status === 'Confirmed') badgeClass = 'bg-primary';
      if (b.status === 'Scheduled') badgeClass = 'bg-info text-dark';
      if (b.status === 'Pending') badgeClass = 'bg-secondary';

      return `
        <tr>
          <td><span class="fw-bold font-monospace text-primary">${b.id}</span></td>
          <td>
            <div class="fw-bold">${b.clientName}</div>
            <small class="text-muted">${b.clientEmail}</small>
          </td>
          <td>
            <div class="small fw-semibold">${b.service}</div>
            <small class="text-muted"><i class="fa-regular fa-calendar me-1"></i>${b.date} • ${b.time}</small>
          </td>
          <td><span class="fw-bold text-primary">$${b.price}</span></td>
          <td>
            <select class="form-select form-select-sm form-control-glass py-1" style="width: 130px;" onchange="window.LuminaAdmin.updateBookingStatus('${b.id}', this.value)">
              <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Scheduled" ${b.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
              <option value="Retouching" ${b.status === 'Retouching' ? 'selected' : ''}>Retouching</option>
              <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <span class="badge ${badgeClass} px-2 py-1">${b.status}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-glass" onclick="window.LuminaAdmin.viewInvoice('${b.id}')" title="View Booking Details">
              <i class="fa-solid fa-receipt text-primary"></i>
            </button>
            <button class="btn btn-sm btn-glass text-danger ms-1" onclick="window.LuminaAdmin.deleteBooking('${b.id}')" title="Delete Booking">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // 4. Render Messages Inbox
  function renderMessagesInbox() {
    const container = document.getElementById('adminMessagesList');
    if (!container) return;

    const messages = JSON.parse(safeGetItem('lumina_messages') || '[]');
    const unreadCount = messages.filter(m => m.status === 'Unread').length;
    
    const countBadge = document.getElementById('adminUnreadMsgBadge');
    if (countBadge) countBadge.textContent = `${unreadCount} Unread`;

    if (messages.length === 0) {
      container.innerHTML = `<div class="text-center py-5 text-muted"><i class="fa-regular fa-envelope-open fs-1 mb-2"></i><p>Inbox is empty. Inquiries submitted via Contact form will appear here.</p></div>`;
      return;
    }

    container.innerHTML = messages.map(m => `
      <div class="glass-card p-3 mb-3 position-relative ${m.status === 'Unread' ? 'border-primary border-opacity-50' : ''}" style="transition: all 0.2s ease;">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <span class="badge ${m.status === 'Unread' ? 'bg-primary' : 'bg-secondary'} me-2">${m.status}</span>
            <span class="fw-bold text-primary">${m.name}</span>
            <span class="text-muted small ms-2">&lt;${m.email}&gt;</span>
            <span class="text-muted small ms-2">• ${m.phone}</span>
          </div>
          <small class="text-muted"><i class="fa-regular fa-clock me-1"></i>${m.date}</small>
        </div>
        <h6 class="fw-bold mb-1">${m.subject}</h6>
        <p class="small text-secondary mb-3">${m.message}</p>
        <div class="d-flex justify-content-end gap-2">
          ${m.status === 'Unread' ? `<button class="btn btn-sm btn-glass" onclick="window.LuminaAdmin.markMessageRead('${m.id}')"><i class="fa-solid fa-check me-1"></i> Mark Read</button>` : ''}
          <button class="btn btn-sm btn-primary-gradient" onclick="window.LuminaAdmin.replyModal('${m.id}', '${m.email}', '${m.name}')"><i class="fa-solid fa-reply me-1"></i> Reply</button>
          <button class="btn btn-sm btn-glass text-danger" onclick="window.LuminaAdmin.deleteMessage('${m.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `).join('');
  }

  // 5. Admin Actions API
  window.LuminaAdmin = {
    updateBookingStatus: (bookingId, newStatus) => {
      const bookings = JSON.parse(safeGetItem('lumina_bookings') || '[]');
      const target = bookings.find(b => b.id === bookingId);
      if (target) {
        target.status = newStatus;
        safeSetItem('lumina_bookings', JSON.stringify(bookings));
        renderBookingsTable();
        if (window.LuminaAuth) window.LuminaAuth.showToast(`Booking #${bookingId} updated to ${newStatus}`, 'success');
      }
    },

    deleteBooking: (bookingId) => {
      if (!confirm(`Are you sure you want to delete Booking #${bookingId}?`)) return;
      let bookings = JSON.parse(safeGetItem('lumina_bookings') || '[]');
      bookings = bookings.filter(b => b.id !== bookingId);
      safeSetItem('lumina_bookings', JSON.stringify(bookings));
      renderBookingsTable();
      if (window.LuminaAuth) window.LuminaAuth.showToast(`Booking #${bookingId} deleted.`, 'success');
    },

    refreshOrders: () => {
      renderBookingsTable();
      if (window.LuminaAuth) window.LuminaAuth.showToast('Orders and bookings refreshed.', 'info');
    },

    toggleUserStatus: (userId) => {
      const users = JSON.parse(safeGetItem('lumina_users') || '[]');
      const u = users.find(x => x.id === userId);
      if (u) {
        u.status = u.status === 'Active' ? 'Suspended' : 'Active';
        safeSetItem('lumina_users', JSON.stringify(users));
        renderUsersTable();
        if (window.LuminaAuth) window.LuminaAuth.showToast(`User ${u.name} status is now ${u.status}.`, 'success');
      }
    },

    deleteUser: (userId) => {
      if (!confirm(`Are you sure you want to delete user ${userId}?`)) return;
      let users = JSON.parse(safeGetItem('lumina_users') || '[]');
      users = users.filter(u => u.id !== userId);
      safeSetItem('lumina_users', JSON.stringify(users));
      renderUsersTable();
      if (window.LuminaAuth) window.LuminaAuth.showToast(`User removed from system.`, 'success');
    },

    viewUser: (userId) => {
      const users = JSON.parse(safeGetItem('lumina_users') || '[]');
      const u = users.find(x => x.id === userId);
      if (u) {
        const modalBody = document.getElementById('adminUserProfileModalBody');
        if (modalBody) {
          modalBody.innerHTML = `
            <div class="text-center mb-4">
              <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" class="rounded-circle shadow-sm border border-secondary border-opacity-25 p-1" style="width: 100px; height: 100px; object-fit: cover;" alt="${u.name}">
              <h5 class="fw-bold mt-3 mb-1 text-primary">${u.name}</h5>
              <span class="badge ${u.role === 'admin' ? 'bg-warning text-dark' : 'bg-primary-gradient'} px-3 py-2">${u.role.toUpperCase()}</span>
            </div>
            <div class="glass-card p-3 mb-3">
              <div class="row g-2">
                <div class="col-6"><small class="text-muted d-block fw-bold mb-1">User ID</small><div class="font-monospace small">${u.id}</div></div>
                <div class="col-6"><small class="text-muted d-block fw-bold mb-1">Status</small><div>${u.status === 'Active' ? '<span class="text-success fw-bold"><i class="fa-solid fa-circle-check me-1"></i>Active</span>' : '<span class="text-danger fw-bold"><i class="fa-solid fa-circle-xmark me-1"></i>Suspended</span>'}</div></div>
                <div class="col-12 mt-3"><small class="text-muted d-block fw-bold mb-1">Email Address</small><div><a href="mailto:${u.email}" class="text-decoration-none">${u.email}</a></div></div>
                <div class="col-12 mt-3"><small class="text-muted d-block fw-bold mb-1">Phone Number</small><div>${u.phone || 'N/A'}</div></div>
                <div class="col-12 mt-3"><small class="text-muted d-block fw-bold mb-1">Member Since</small><div>${u.joined}</div></div>
              </div>
            </div>
          `;
          const modal = new bootstrap.Modal(document.getElementById('adminUserProfileModal'));
          modal.show();
        }
      }
    },

    markMessageRead: (msgId) => {
      const messages = JSON.parse(safeGetItem('lumina_messages') || '[]');
      const msg = messages.find(m => m.id === msgId);
      if (msg) {
        msg.status = 'Read';
        safeSetItem('lumina_messages', JSON.stringify(messages));
        renderMessagesInbox();
      }
    },

    markAllMessagesRead: () => {
      let messages = JSON.parse(safeGetItem('lumina_messages') || '[]');
      messages = messages.map(m => ({...m, status: 'Read'}));
      safeSetItem('lumina_messages', JSON.stringify(messages));
      renderMessagesInbox();
      if (window.LuminaAuth) window.LuminaAuth.showToast('All messages marked as read.', 'success');
    },

    deleteMessage: (msgId) => {
      let messages = JSON.parse(safeGetItem('lumina_messages') || '[]');
      messages = messages.filter(m => m.id !== msgId);
      safeSetItem('lumina_messages', JSON.stringify(messages));
      renderMessagesInbox();
      if (window.LuminaAuth) window.LuminaAuth.showToast('Message deleted.', 'success');
    },

    replyModal: (msgId, email, name) => {
      const recipientInput = document.getElementById('replyRecipient');
      const msgIdInput = document.getElementById('replyMsgId');
      const replyContent = document.getElementById('replyContent');
      
      if (recipientInput && msgIdInput && replyContent) {
        recipientInput.value = `${name} <${email}>`;
        msgIdInput.value = msgId;
        replyContent.value = `Hello ${name},\n\nThank you for reaching out to LuminaStudio.\n\n`;
        
        const modal = new bootstrap.Modal(document.getElementById('adminReplyMessageModal'));
        modal.show();
      }
    },

    viewInvoice: (bookingId) => {
      const bookings = JSON.parse(safeGetItem('lumina_bookings') || '[]');
      const b = bookings.find(x => x.id === bookingId);
      if (b) {
        const modalBody = document.getElementById('adminOrderInvoiceModalBody');
        if (modalBody) {
          modalBody.innerHTML = `
            <div class="row mb-4">
              <div class="col-sm-6">
                <h5 class="fw-bold text-primary mb-1">LuminaStudio Pro</h5>
                <small class="text-muted">1280 Creative Ave, Suite 400<br>New York, NY 10001</small>
              </div>
              <div class="col-sm-6 text-sm-end mt-3 mt-sm-0">
                <h6 class="fw-bold mb-1">INVOICE <span class="text-primary font-monospace">#${b.id}</span></h6>
                <small class="text-muted">Date: ${b.date}</small>
              </div>
            </div>
            <div class="glass-card p-3 mb-4">
              <div class="row">
                <div class="col-6">
                  <small class="fw-bold text-muted d-block mb-1">BILL TO:</small>
                  <div class="fw-bold text-primary">${b.clientName}</div>
                  <div class="small">${b.clientEmail}</div>
                </div>
                <div class="col-6 text-end">
                  <small class="fw-bold text-muted d-block mb-1">STATUS:</small>
                  <span class="badge bg-primary-gradient px-3 py-2">${b.status.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-glass table-sm">
                <thead>
                  <tr>
                    <th>DESCRIPTION</th>
                    <th class="text-center">QTY</th>
                    <th class="text-end">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="py-3">
                      <div class="fw-bold">${b.service}</div>
                      <small class="text-muted">Scheduled for ${b.time} at ${b.studio}</small>
                    </td>
                    <td class="py-3 text-center align-middle">1</td>
                    <td class="py-3 text-end align-middle fw-bold">$${b.price}.00</td>
                  </tr>
                </tbody>
                <tfoot class="border-top border-secondary border-opacity-25">
                  <tr>
                    <td colspan="2" class="text-end py-2 text-muted small">Subtotal:</td>
                    <td class="text-end py-2 fw-bold">$${b.price}.00</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-end py-2 text-muted small">Tax (0%):</td>
                    <td class="text-end py-2 fw-bold">$0.00</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="text-end py-3 text-primary h6 fw-bold">TOTAL DUE:</td>
                    <td class="text-end py-3 text-primary h6 fw-bold">$${b.price}.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          `;
          const modal = new bootstrap.Modal(document.getElementById('adminOrderInvoiceModal'));
          modal.show();
        }
      }
    },

    switchTab: (tabId) => {
      const btn = document.querySelector(`button[data-bs-target="#${tabId}"]`);
      if (btn && window.bootstrap) {
        const tab = new bootstrap.Tab(btn);
        tab.show();
      }
    }
  };

  // Event Listeners for Filters & Search
  document.addEventListener('DOMContentLoaded', () => {
    // Sync UI with currently authenticated Admin User
    const currentUser = JSON.parse(safeGetItem('lumina_current_user'));
    if (currentUser && currentUser.role === 'admin') {
      const elNavName = document.getElementById('adminNavName');
      const elDropName = document.getElementById('adminDropdownName');
      const elDropEmail = document.getElementById('adminDropdownEmail');
      const elGreetName = document.getElementById('adminGreetingName');

      if (elNavName) elNavName.textContent = currentUser.name;
      if (elDropName) elDropName.textContent = currentUser.name;
      if (elDropEmail) elDropEmail.textContent = currentUser.email;
      if (elGreetName) elGreetName.textContent = currentUser.name;
    }

    // Admin Logout Button Handler
    document.querySelectorAll('.lumina-admin-logout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        safeRemoveItem('lumina_current_user');
        if (window.LuminaAuth) window.LuminaAuth.showToast('Logged out successfully. Redirecting...', 'info');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 400);
      });
    });

    initAdminCharts();
    renderUsersTable();
    renderBookingsTable();
    renderMessagesInbox();

    // User Search Input
    const userSearchInput = document.getElementById('adminUserSearch');
    const userRoleFilter = document.getElementById('adminUserRoleFilter');
    if (userSearchInput || userRoleFilter) {
      const applyUserFilters = () => {
        const query = userSearchInput?.value || '';
        const roleQuery = userRoleFilter?.value !== 'all' ? userRoleFilter.value : '';
        const users = JSON.parse(safeGetItem('lumina_users') || '[]');
        const filtered = users.filter(u => {
          const matchesSearch = u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
          const matchesRole = roleQuery ? u.role.toLowerCase() === roleQuery.toLowerCase() : true;
          return matchesSearch && matchesRole;
        });
        
        // Re-render manually or update the function slightly to support dual filters
        const tbody = document.getElementById('adminUsersTableBody');
        if (tbody) {
          if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-muted">No users found</td></tr>`;
          } else {
            tbody.innerHTML = filtered.map(u => `
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}" class="rounded-circle shadow-sm" style="width: 42px; height: 42px; object-fit: cover;" alt="${u.name}">
                    <div>
                      <div class="fw-bold text-primary">${u.name}</div>
                      <small class="text-muted font-monospace">${u.id}</small>
                    </div>
                  </div>
                </td>
                <td><a href="mailto:${u.email}" class="small text-decoration-none">${u.email}</a></td>
                <td><span class="badge ${u.role === 'admin' ? 'bg-warning text-dark' : 'bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25'} px-3 py-1 shadow-sm">${u.role.toUpperCase()}</span></td>
                <td><span class="small text-muted">${u.phone || 'N/A'}</span></td>
                <td><span class="badge ${u.status === 'Active' ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'} border-opacity-25 px-2 py-1">${u.status || 'Active'}</span></td>
                <td class="text-end">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-glass px-2" type="button" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-glass shadow-lg">
                      <li><a class="dropdown-item py-2" href="javascript:void(0)" onclick="window.LuminaAdmin.viewUser('${u.id}')"><i class="fa-solid fa-eye me-2 text-primary"></i> View Profile</a></li>
                      <li><a class="dropdown-item py-2" href="javascript:void(0)" onclick="window.LuminaAdmin.toggleUserStatus('${u.id}')"><i class="fa-solid fa-user-shield me-2 text-info"></i> Toggle Status</a></li>
                      <li><hr class="dropdown-divider border-secondary border-opacity-10"></li>
                      <li><a class="dropdown-item py-2 text-danger" href="javascript:void(0)" onclick="window.LuminaAdmin.deleteUser('${u.id}')"><i class="fa-solid fa-trash-can me-2"></i> Remove User</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            `).join('');
          }
        }
      };
      
      userSearchInput?.addEventListener('input', applyUserFilters);
      userRoleFilter?.addEventListener('change', applyUserFilters);
      
      // Override default render function slightly to use our new styling
      const originalRender = renderUsersTable;
      renderUsersTable = (query) => { originalRender(query); applyUserFilters(); };
      applyUserFilters();
    }

    // Booking Search & Status Filter
    const bookingSearchInput = document.getElementById('adminBookingSearch');
    const bookingStatusFilter = document.getElementById('adminBookingStatusFilter');

    if (bookingSearchInput || bookingStatusFilter) {
      const applyBookingFilters = () => {
        const query = bookingSearchInput?.value || '';
        const status = bookingStatusFilter?.value || 'all';
        renderBookingsTable(status, query);
      };
      bookingSearchInput?.addEventListener('input', applyBookingFilters);
      bookingStatusFilter?.addEventListener('change', applyBookingFilters);
    }
    
    // Message Search
    const msgSearchInput = document.getElementById('adminMsgSearch');
    if (msgSearchInput) {
      msgSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('#adminMessagesList .admin-msg-card');
        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? 'block' : 'none';
        });
      });
    }

    // Add New User Form
    const addUserForm = document.getElementById('adminAddUserForm');
    if (addUserForm) {
      addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('newUserName').value.trim();
        const email = document.getElementById('newUserEmail').value.trim().toLowerCase();
        const role = document.getElementById('newUserRole').value;
        const phone = document.getElementById('newUserPhone').value.trim();

        if (!name || !email) return;

        const users = JSON.parse(safeGetItem('lumina_users') || '[]');
        users.push({
          id: 'USR-' + Math.floor(100 + Math.random() * 900),
          name: name,
          email: email,
          password: 'password123',
          role: role,
          phone: phone,
          status: 'Active',
          joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
        });

        safeSetItem('lumina_users', JSON.stringify(users));
        renderUsersTable();
        addUserForm.reset();

        const modalEl = document.getElementById('adminAddUserModal');
        if (modalEl && window.bootstrap) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }

        if (window.LuminaAuth) window.LuminaAuth.showToast(`User ${name} created successfully!`, 'success');
      });
    }
    
    // Reply Message Form
    const replyForm = document.getElementById('adminReplyForm');
    if (replyForm) {
      replyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msgId = document.getElementById('replyMsgId').value;
        const recipient = document.getElementById('replyRecipient').value;
        
        window.LuminaAdmin.markMessageRead(msgId);
        
        const modalEl = document.getElementById('adminReplyMessageModal');
        if (modalEl && window.bootstrap) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }
        
        if (window.LuminaAuth) window.LuminaAuth.showToast(`Reply sent successfully to ${recipient}!`, 'success');
      });
    }

    // Recalculate charts on theme change
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(initAdminCharts, 100);
      });
    });
  });

})();
