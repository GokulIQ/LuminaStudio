const fs = require('fs');
let content = fs.readFileSync('about.html', 'utf8');

let top = content.split('<footer class="site-footer">')[0];

let newFooter = `<footer class="site-footer bg-light py-4 text-center">
    <div class="container">
      <p class="text-muted mb-0 small">&copy; 2026 LuminaStudio. All Rights Reserved.</p>
    </div>
  </footer>

  <!-- Search Modal -->
  <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content glass-card border-0" style="background: var(--bg-surface-glass); backdrop-filter: blur(28px);">
        <div class="modal-body p-4">
          <form action="services.html" class="position-relative">
            <input type="text" class="form-control form-control-lg form-control-glass rounded-pill pe-5" placeholder="Search services (e.g. Passport, Wedding)..." autofocus>
            <button type="submit" class="btn position-absolute top-50 end-0 translate-middle-y me-2 text-primary border-0 bg-transparent">
              <i class="fa-solid fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Global Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="assets/js/main.js"></script>
  <script src="assets/js/auth.js"></script>
</body>
</html>`;

fs.writeFileSync('about.html', top + newFooter, 'utf8');
console.log('Fixed footer');
