const fs = require('fs');
let content = fs.readFileSync('about.html', 'utf8');

let top = content.split('<main>')[0];
let bottom = content.split('</main>')[1];

let newMain = `<main>
    <!-- Hero Section -->
    <section class="hero-section text-center pt-5 pb-5">
      <div class="container pt-4">
        <div class="d-inline-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 shadow-sm border" style="font-size: 0.9rem; font-weight: 500;">
          <i class="fa-solid fa-gem text-primary me-2"></i> Our Heritage & Passion
        </div>
        <h1 class="display-3 fw-bold mb-4">Crafting Visual Legacies<br>Since 2011</h1>
        <p class="lead text-muted mx-auto" style="max-width: 800px;">
          Where photographic artistry converges with rigorous biometric precision. We celebrate human individuality through master light, authentic expression, and uncompromising optics.
        </p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-5">
      <div class="container pb-5">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 position-relative">
            <div class="position-relative rounded-4 overflow-hidden shadow-lg" style="height: 500px;">
              <img src="https://images.unsplash.com/photo-1554046920-90dcac824b07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Photographer" class="w-100 h-100 object-fit-cover">
            </div>
            <!-- Floating Badge -->
            <div class="position-absolute bottom-0 end-0 me-4 mb-4 glass-card p-3 rounded-4 shadow-lg d-flex align-items-center gap-3" data-aos="fade-up" data-aos-delay="200" style="background: var(--bg-surface-glass); backdrop-filter: blur(20px);">
              <div class="icon-circle bg-warning text-white flex-shrink-0" style="width: 50px; height: 50px;">
                <i class="fa-solid fa-award fs-5"></i>
              </div>
              <div>
                <h6 class="mb-0 fw-bold text-primary">15+ Global Awards</h6>
                <small class="text-muted">Master Portrait Association</small>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="d-inline-flex align-items-center bg-light rounded-pill px-3 py-2 mb-4 border" style="font-size: 0.9rem; font-weight: 500;">
              <i class="fa-solid fa-bullseye text-secondary me-2"></i> Mission & Vision
            </div>
            <h2 class="display-5 fw-bold mb-4">More than a photograph. A statement of identity.</h2>
            <p class="lead text-muted mb-5">
              Founded by veteran master photographers and optical engineers, LuminaStudio was established with a dual conviction: that official government identification photos should look dignified, and that artistic portraits should feel deeply alive.
            </p>
            
            <div class="row g-4">
              <div class="col-md-6">
                <div class="card h-100 border-0 shadow-sm rounded-4 bg-surface">
                  <div class="card-body p-4">
                    <div class="icon-circle bg-primary bg-opacity-10 text-primary mb-3" style="width: 50px; height: 50px;">
                      <i class="fa-solid fa-eye"></i>
                    </div>
                    <h5 class="fw-bold text-primary mb-3">Our Vision</h5>
                    <p class="text-muted mb-0">To set the global benchmark for certified biometric imaging and fine art studio portraiture.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card h-100 border-0 shadow-sm rounded-4 bg-surface">
                  <div class="card-body p-4">
                    <div class="icon-circle bg-secondary bg-opacity-10 text-secondary mb-3" style="width: 50px; height: 50px;">
                      <i class="fa-solid fa-heart"></i>
                    </div>
                    <h5 class="fw-bold text-primary mb-3">Our Mission</h5>
                    <p class="text-muted mb-0">Empowering individuals and leaders with confidence through pristine, enduring imagery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Journey / Milestones -->
    <section class="py-5 bg-light">
      <div class="container py-5">
        <div class="text-center mb-5">
          <div class="d-inline-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 border shadow-sm" style="font-size: 0.9rem; font-weight: 500;">
            <i class="fa-solid fa-route text-primary me-2"></i> Journey
          </div>
          <h2 class="display-5 fw-bold mb-3">Milestones of Excellence</h2>
          <p class="lead text-muted mx-auto" style="max-width: 700px;">Explore how LuminaStudio expanded from a boutique darkroom into a multi-studio flagship.</p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">
            <div class="card h-100 border-0 shadow-sm rounded-4 hover-lift">
              <div class="card-body p-4">
                <span class="badge bg-primary mb-3 fs-6 px-3 py-2 rounded-pill">2011</span>
                <h5 class="fw-bold text-primary mb-3">First Studio Founded</h5>
                <p class="text-muted mb-0">Launched in Manhattan with medium format Hasselblad digital systems and custom Broncolor lighting.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div class="card h-100 border-0 shadow-sm rounded-4 hover-lift">
              <div class="card-body p-4">
                <span class="badge bg-secondary mb-3 fs-6 px-3 py-2 rounded-pill">2016</span>
                <h5 class="fw-bold text-primary mb-3">Biometric Certification</h5>
                <p class="text-muted mb-0">Pioneered ICAO-standard biometric diagnostic algorithms for 100% embassy acceptance.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div class="card h-100 border-0 shadow-sm rounded-4 hover-lift">
              <div class="card-body p-4">
                <span class="badge bg-info text-white mb-3 fs-6 px-3 py-2 rounded-pill" style="background: var(--gradient-primary) !important;">2021</span>
                <h5 class="fw-bold text-primary mb-3">10,000th Client Milestone</h5>
                <p class="text-muted mb-0">Expanded corporate enterprise team shoots for Fortune 500 tech firms and diplomatic missions.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div class="card h-100 border-0 shadow-sm rounded-4 hover-lift">
              <div class="card-body p-4">
                <span class="badge bg-success mb-3 fs-6 px-3 py-2 rounded-pill">2026</span>
                <h5 class="fw-bold text-primary mb-3">AI & High-Definition Lab</h5>
                <p class="text-muted mb-0">Integrated real-time biometric code generation and next-gen retouching cloud portal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Master Artists -->
    <section class="py-5">
      <div class="container py-5">
        <div class="text-center mb-5">
          <div class="d-inline-flex align-items-center bg-white rounded-pill px-3 py-2 mb-4 border shadow-sm" style="font-size: 0.9rem; font-weight: 500;">
            <i class="fa-solid fa-users-viewfinder text-primary me-2"></i> Master Artists
          </div>
          <h2 class="display-5 fw-bold mb-3">Meet Our Lead Photographers</h2>
          <p class="lead text-muted mx-auto" style="max-width: 700px;">Award-winning portrait masters and lighting specialists dedicated to your session.</p>
        </div>

        <div class="row g-4 text-center">
          <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="0">
            <div class="card border-0 bg-transparent h-100">
              <div class="card-body">
                <div class="position-relative mx-auto mb-4" style="width: 140px; height: 140px;">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Elena Vance" class="w-100 h-100 rounded-circle object-fit-cover shadow-sm p-1" style="background: var(--gradient-primary);">
                </div>
                <h5 class="fw-bold text-primary mb-1">Elena Vance</h5>
                <p class="text-muted small mb-3">Creative Director & Lead Portraitist</p>
                <div class="d-flex justify-content-center gap-2">
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-instagram"></i></a>
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div class="card border-0 bg-transparent h-100">
              <div class="card-body">
                <div class="position-relative mx-auto mb-4" style="width: 140px; height: 140px;">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Marcus Sterling" class="w-100 h-100 rounded-circle object-fit-cover shadow-sm p-1" style="background: var(--gradient-accent);">
                </div>
                <h5 class="fw-bold text-primary mb-1">Marcus Sterling</h5>
                <p class="text-muted small mb-3">Head of Biometric & Lighting</p>
                <div class="d-flex justify-content-center gap-2">
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-instagram"></i></a>
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div class="card border-0 bg-transparent h-100">
              <div class="card-body">
                <div class="position-relative mx-auto mb-4" style="width: 140px; height: 140px;">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Sophia Chen" class="w-100 h-100 rounded-circle object-fit-cover shadow-sm p-1" style="background: var(--gradient-amber);">
                </div>
                <h5 class="fw-bold text-primary mb-1">Sophia Chen</h5>
                <p class="text-muted small mb-3">Senior Fashion & Editorial Stylist</p>
                <div class="d-flex justify-content-center gap-2">
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-instagram"></i></a>
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div class="card border-0 bg-transparent h-100">
              <div class="card-body">
                <div class="position-relative mx-auto mb-4" style="width: 140px; height: 140px;">
                  <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="Liam O'Connor" class="w-100 h-100 rounded-circle object-fit-cover shadow-sm p-1" style="background: linear-gradient(135deg, #10b981, #3b82f6);">
                </div>
                <h5 class="fw-bold text-primary mb-1">Liam O'Connor</h5>
                <p class="text-muted small mb-3">Master Retouching & Color Grading</p>
                <div class="d-flex justify-content-center gap-2">
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-instagram"></i></a>
                  <a href="#" class="btn btn-sm btn-light rounded-circle text-muted" style="width: 32px; height: 32px; padding: 0; line-height: 32px;"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 mb-5">
      <div class="container pb-4">
        <div class="bg-surface rounded-5 p-5 text-center shadow-lg border">
          <h2 class="display-5 fw-bold mb-3">Visit Our Flagship Studio</h2>
          <p class="lead text-muted mx-auto mb-4" style="max-width: 600px;">Experience our master lighting setups and enjoy complimentary espresso during your shoot.</p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a href="contact.html" class="btn btn-primary-gradient px-4 py-3 rounded-pill fw-bold">
              <i class="fa-solid fa-location-dot me-2"></i> Get Studio Directions
            </a>
            <a href="services.html" class="btn btn-outline-dark px-4 py-3 rounded-pill fw-bold bg-white">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>

  </main>`;

fs.writeFileSync('about.html', top + newMain + bottom, 'utf8');
console.log('Fixed main section');
