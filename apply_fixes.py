import glob
import re

def main():
    html_files = glob.glob('*.html')
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 2. Duplicate login buttons.
        content = re.sub(
            r'<a href="login.html" id="luminaHeaderLoginBtn" class="btn btn-sm btn-glass d-none d-sm-inline-flex align-items-center gap-2">\s*<i class="fa-solid fa-right-to-bracket"></i>\s*<span>Login</span>\s*</a>',
            '',
            content
        )
        
        # 3. Services dropdown toggle
        # The dropdown needs dropdown-hover class or some fix.
        content = content.replace(
            '<li class="nav-item dropdown position-static">',
            '<li class="nav-item dropdown position-static dropdown-hover">'
        )
        
        # 4. Brand name "LuminaSaaS" to "LuminaStudio" in home-2.html
        if filepath == 'home-2.html':
            content = content.replace('Lumina<span class="accent">SaaS</span>', 'Lumina<span class="accent">Studio</span>')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    print("Fixes applied.")

if __name__ == '__main__':
    main()
