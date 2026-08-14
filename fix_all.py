import os
import glob

html_files = glob.glob('*.html')
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Services dropdown toggle area -> make it clickable
    content = content.replace(
        '<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\n                Services\n              </a>',
        '<a class="nav-link dropdown-toggle" href="services.html" role="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="window.location.href=\'services.html\'">\n                Services\n              </a>'
    )
    # 2. Fix navbar vertical alignment (brand-logo)
    content = content.replace(
        'class="brand-logo text-decoration-none flex-shrink-0"',
        'class="brand-logo text-decoration-none flex-shrink-0 d-flex align-items-center gap-2"'
    )
    # 3. Move hamburger menu to right (ms-auto)
    content = content.replace(
        '<!-- Header Actions -->\n        <div class="d-flex align-items-center gap-2 flex-nowrap flex-shrink-0">',
        '<!-- Header Actions -->\n        <div class="d-flex align-items-center gap-2 flex-nowrap flex-shrink-0 ms-auto">'
    )
    # 4. Remove duplicate login buttons in mobile menu
    # The duplicate is right before the commented out booking button.
    duplicate_str = '''         <a href="login.html" id="luminaHeaderLoginBtn" class="btn btn-sm btn-glass d-none d-sm-inline-flex align-items-center gap-2">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Login</span>
          </a>'''
    if duplicate_str in content:
        content = content.replace(duplicate_str, '')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixes applied.")
