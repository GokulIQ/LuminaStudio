import glob
import re

def remove_client_portal(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to remove the <a href="login.html" ...> ... </a> block for Client Portal
    # It looks like:
    pattern = r'<a href="login\.html" class="mega-service-item text-decoration-none text-reset mt-2">\s*<div class="mega-service-icon" style="background: var\(--gradient-accent\);"><i class="fa-solid fa-right-to-bracket"></i></div>\s*<div>\s*<div class="fw-bold text-primary">Client Portal</div>\s*<small class="text-muted">Login or register to manage your photo sessions\.</small>\s*</div>\s*</a>'
    
    new_content = re.sub(pattern, '', content)
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file_path}')

for file in glob.glob('*.html'):
    remove_client_portal(file)

with open('update_pages_menu.js', 'r', encoding='utf-8') as f:
    js_content = f.read()
js_content = re.sub(pattern, '', js_content)
with open('update_pages_menu.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
print('Updated update_pages_menu.js')
