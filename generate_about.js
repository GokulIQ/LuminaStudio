const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// Replace title
index = index.replace('<title>LuminaStudio | Premium Photo Studio & Certified Passport Photos</title>', '<title>About Us | LuminaStudio Photography</title>');

// Keep header and footer, replace main content
let top = index.split('<!-- ==========================================================================\n       HERO SECTION')[0];
let bottom = index.split('<!-- ==========================================================================\n       FOOTER')[1];

let aboutMain = `  <!-- ==========================================================================
       HERO SECTION
       ========================================================================== -->
  <main>
    <section class="hero-section text-center pt-5 pb-5">
      <div class="container">
        <h1 class="display-4 fw-bold">About <span class="accent">Us</span></h1>
        <p class="lead text-muted">Over 15 years of master portraiture.</p>
      </div>
    </section>
  </main>
  <!-- ==========================================================================
       FOOTER`;

fs.writeFileSync('about.html', top + aboutMain + bottom, 'utf8');
console.log('about.html generated!');
