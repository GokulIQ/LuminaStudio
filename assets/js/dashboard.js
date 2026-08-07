
/**
 * LuminaStudio - Dashboard JavaScript Engine
 * Master Chart.js analytics, dynamic theme listener, and table search/filter.
 */

(function() {
  'use strict';

  // This page also loads main.js and auth.js, so avoid global declarations.
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

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let revenueChartInstance = null;
  let categoryChartInstance = null;

  // 1. Mobile Sidebar Toggle
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');

  if (sidebarToggleBtn && dashboardSidebar) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dashboardSidebar.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        if (!dashboardSidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
          dashboardSidebar.classList.remove('show');
        }
      }
    });
  }

  // 1.5 Dynamic Current User & Bookings Renderer
  function loadCurrentUserData() {
    const currentUser = JSON.parse(safeGetItem('lumina_current_user') || 'null');
    if (currentUser) {
      const userNameEls = document.querySelectorAll('.dashboard-user-name, #dashUserName');
      const userEmailEls = document.querySelectorAll('.dashboard-user-email, #dashUserEmail');
      const userAvatarEls = document.querySelectorAll('.dashboard-user-avatar, #dashUserAvatar');

      userNameEls.forEach(el => { el.textContent = currentUser.name; });
      userEmailEls.forEach(el => { el.textContent = currentUser.email; });
      if (currentUser.avatar) {
        userAvatarEls.forEach(el => { el.src = currentUser.avatar; });
      }
    }

    // Render bookings from localStorage if table exists
    const clientBookingsTable = document.getElementById('clientBookingsTableBody');
    if (clientBookingsTable) {
      const bookings = JSON.parse(safeGetItem('lumina_bookings') || '[]');
      if (bookings.length > 0) {
        clientBookingsTable.innerHTML = bookings.slice(0, 6).map(b => {
          let badgeClass = 'bg-secondary';
          if (b.status === 'Completed') badgeClass = 'bg-success';
          if (b.status === 'Retouching') badgeClass = 'bg-warning text-dark';
          if (b.status === 'Confirmed') badgeClass = 'bg-primary';
          if (b.status === 'Scheduled') badgeClass = 'bg-info text-dark';

          return `
            <tr>
              <td><span class="fw-bold font-monospace text-primary">${b.id}</span></td>
              <td>
                <div class="fw-semibold">${b.service}</div>
                <small class="text-muted"><i class="fa-regular fa-calendar me-1"></i>${b.date} • ${b.time}</small>
              </td>
              <td>${b.studio}</td>
              <td><span class="fw-bold text-primary">$${b.price}</span></td>
              <td><span class="badge ${badgeClass} px-2 py-1">${b.status}</span></td>
              <td>
                <a href="gallery.html" class="btn btn-sm btn-glass"><i class="fa-solid fa-images me-1"></i> Proofs</a>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  loadCurrentUserData();

  // 2. Chart.js Initialization Engine
  function initDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark' || 
                   document.documentElement.getAttribute('data-theme') === 'dark';
    
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    // Revenue & Bookings Line Chart
    const revenueCanvas = document.getElementById('revenueAnalyticsChart') || document.getElementById('revenueChart');
    if (revenueCanvas) {
      if (revenueChartInstance) {
        revenueChartInstance.destroy();
      }

      const ctx = revenueCanvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 240);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.45)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

      const gradient2 = ctx.createLinearGradient(0, 0, 0, 240);
      gradient2.addColorStop(0, 'rgba(236, 72, 153, 0.35)');
      gradient2.addColorStop(1, 'rgba(236, 72, 153, 0.0)');

      revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Total Studio Revenue ($)',
              data: [8400, 9200, 11500, 10800, 14200, 16800, 15400, 18900, 21400, 23500, 26800, 29400],
              borderColor: '#6366f1',
              backgroundColor: gradient,
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointBackgroundColor: '#6366f1',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 7
            },
            {
              label: 'Biometric Passport Pass ($)',
              data: [4200, 4600, 5800, 5200, 6800, 7900, 7200, 8900, 9800, 11200, 12400, 14100],
              borderColor: '#ec4899',
              backgroundColor: gradient2,
              fill: true,
              borderDash: [5, 5],
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: textColor,
                font: { family: 'Plus Jakarta Sans', weight: '600', size: 12 },
                usePointStyle: true,
                boxWidth: 8
              }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              titleFont: { family: 'Outfit', size: 13, weight: '700' },
              bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
              padding: 12,
              cornerRadius: 10,
              displayColors: true
            }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }
            },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: textColor,
                font: { family: 'Plus Jakarta Sans', size: 11 },
                callback: function(value) { return '$' + (value / 1000) + 'k'; }
              }
            }
          }
        }
      });
    }

    // Category Distribution Doughnut Chart
    const categoryCanvas = document.getElementById('categoryBreakdownChart') || document.getElementById('categoryDistributionChart');
    if (categoryCanvas) {
      if (categoryChartInstance) {
        categoryChartInstance.destroy();
      }

      const ctx = categoryCanvas.getContext('2d');
      categoryChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Passport & Visa', 'Executive Headshots', 'Weddings & Events', 'Commercial Lookbook'],
          datasets: [{
            data: [45, 25, 18, 12],
            backgroundColor: ['#6366f1', '#ec4899', '#06b6d4', '#f59e0b'],
            borderColor: isDark ? '#0f172a' : '#ffffff',
            borderWidth: 2,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: textColor,
                padding: 14,
                boxWidth: 10,
                font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              titleFont: { family: 'Outfit', size: 13, weight: '700' },
              bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
              padding: 10,
              cornerRadius: 8
            }
          },
          cutout: '72%'
        }
      });
    }
  }

  // Expose theme updater globally
  window.updateDashboardChartsTheme = function(theme) {
    initDashboardCharts();
  };

  initDashboardCharts();

  // 3. Table Search & Status Filter
  const tableSearchInput = document.getElementById('dashboardSearchInput') || document.getElementById('tableSearchInput');
  const statusFilterSelect = document.getElementById('dashboardStatusFilter') || document.getElementById('statusFilterSelect');
  const tableRows = document.querySelectorAll('#dashboardTable tbody tr, .dashboard-data-table tbody tr');

  function filterDashboardTable() {
    const query = tableSearchInput ? tableSearchInput.value.toLowerCase().trim() : '';
    const status = statusFilterSelect ? statusFilterSelect.value.toLowerCase() : 'all';

    tableRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const statusBadge = row.querySelector('.badge')?.textContent.toLowerCase() || '';

      const matchesSearch = query === '' || text.includes(query);
      const matchesStatus = status === 'all' || statusBadge.includes(status);

      if (matchesSearch && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (tableSearchInput) {
    tableSearchInput.addEventListener('input', filterDashboardTable);
  }

  if (statusFilterSelect) {
    statusFilterSelect.addEventListener('change', filterDashboardTable);
  }
});

})();
