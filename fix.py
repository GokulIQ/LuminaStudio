import os
import glob
import re

html_files = glob.glob('*.html')
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Issue 15: Fix services dropdown
    content = re.sub(
        r'<a class=\"nav-link dropdown-toggle([^>]*?)\" href=\"#\" role=\"button\" data-bs-toggle=\"dropdown\"([^>]*?)>\s*Services\s*</a>',
        r'<a class=\"nav-link\" href=\"services.html\">Services</a>',
        content
    )

    # Issue 17: Remove duplicate login buttons in mobile menu
    content = re.sub(
        r'\s*<a href=\"login.html\" id=\"luminaHeaderLoginBtn\" class=\"btn btn-sm btn-glass d-none d-sm-inline-flex align-items-center gap-2\">\s*<i class=\"fa-solid fa-right-to-bracket\"></i>\s*<span>Login</span>\s*</a>\s*</a>',
        '',
        content
    )
    # Actually wait, the HTML had an unclosed tag or stray </a> in my grep result?
    content = re.sub(
        r'\s*<a href=\"login.html\" id=\"luminaHeaderLoginBtn\" class=\"btn btn-sm btn-glass d-none d-sm-inline-flex align-items-center gap-2\">\s*<i class=\"fa-solid fa-right-to-bracket\"></i>\s*<span>Login</span>\s*</a>',
        '',
        content
    )

    # Issue 16: Move hamburger to extreme right. Maybe they want it to be order-1 or something?
    # Or maybe the Header Actions isn't flex-end?
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
