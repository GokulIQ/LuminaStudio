const fs = require('fs');

let content = fs.readFileSync('about.html', 'utf8');

// desktop nav
content = content.replace(
  '<a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\n                Home\n              </a>',
  '<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\n                Home\n              </a>'
);
content = content.replace(
  '<li class="nav-item">\n              <a class="nav-link" href="about.html">About Us</a>\n            </li>',
  '<li class="nav-item">\n              <a class="nav-link active" href="about.html">About Us</a>\n            </li>'
);

// mobile nav
content = content.replace(
  '<li class="nav-item"><a class="nav-link active" href="index.html"><i class="fa-solid fa-house me-2 text-primary"></i> Home 1 - Classic Studio</a></li>',
  '<li class="nav-item"><a class="nav-link" href="index.html"><i class="fa-solid fa-house me-2 text-primary"></i> Home 1 - Classic Studio</a></li>'
);
content = content.replace(
  '<li class="nav-item"><a class="nav-link" href="about.html"><i class="fa-solid fa-users me-2 text-primary"></i> About Us</a></li>',
  '<li class="nav-item"><a class="nav-link active" href="about.html"><i class="fa-solid fa-users me-2 text-primary"></i> About Us</a></li>'
);

fs.writeFileSync('about.html', content, 'utf8');
console.log('Fixed header');
