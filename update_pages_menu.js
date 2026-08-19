const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newMenuStr = `<li class="nav-item dropdown position-static">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pages
              </a>
              <div class="dropdown-menu dropdown-menu-glass mega-menu-container start-50 translate-middle-x">
                <div class="row g-3">
                  <div class="col-md-6">
                    <h6 class="fw-bold text-primary mb-3"><i class="fa-solid fa-compass me-2"></i>Discover & Learn</h6>
                    <a href="gallery.html" class="mega-service-item text-decoration-none text-reset">
                      <div class="mega-service-icon"><i class="fa-solid fa-images"></i></div>
                      <div>
                        <div class="fw-bold text-primary">Studio Gallery</div>
                        <small class="text-muted">Explore our award-winning photography portfolio.</small>
                      </div>
                    </a>
                    <a href="testimonials.html" class="mega-service-item text-decoration-none text-reset mt-2">
                      <div class="mega-service-icon"><i class="fa-solid fa-star"></i></div>
                      <div>
                        <div class="fw-bold text-primary">Reviews & Testimonials</div>
                        <small class="text-muted">See what our satisfied clients have to say.</small>
                      </div>
                    </a>
                    <a href="blog.html" class="mega-service-item text-decoration-none text-reset mt-2">
                      <div class="mega-service-icon"><i class="fa-solid fa-newspaper"></i></div>
                      <div>
                        <div class="fw-bold text-primary">Blog & Insights</div>
                        <small class="text-muted">Read our latest studio news, tips, and articles.</small>
                      </div>
                    </a>
                  </div>
                  <div class="col-md-6">
                    <h6 class="fw-bold text-secondary mb-3"><i class="fa-solid fa-layer-group me-2"></i>Utility & Support</h6>
                    <a href="faq.html" class="mega-service-item text-decoration-none text-reset">
                      <div class="mega-service-icon" style="background: var(--gradient-amber);"><i class="fa-solid fa-circle-question"></i></div>
                      <div>
                        <div class="fw-bold text-primary">FAQ Help Center</div>
                        <small class="text-muted">Find quick answers to common studio questions.</small>
                      </div>
                    </a>
                    
                    <a href="404.html" class="mega-service-item text-decoration-none text-reset mt-2">
                      <div class="mega-service-icon" style="background: linear-gradient(135deg, #64748b, #475569);"><i class="fa-solid fa-gear"></i></div>
                      <div>
                        <div class="fw-bold text-primary">System Pages</div>
                        <small class="text-muted">404 Error, Coming Soon, and Maintenance layouts.</small>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </li>`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let regex = /<li class="nav-item dropdown">\s*<a class="nav-link dropdown-toggle[^>]+>\s*Pages\s*<\/a>\s*<ul class="dropdown-menu dropdown-menu-glass">.*?<\/ul>\s*<\/li>/s;
  
  let match = content.match(regex);
  if (match) {
      content = content.replace(regex, newMenuStr);
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
  } else {
    // console.log('Could not find match in', file);
  }
});
