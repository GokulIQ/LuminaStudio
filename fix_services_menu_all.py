import re
import glob

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract the Services dropdown from index.html
match = re.search(r'(<!-- Mega Menu: Services -->.*?</li>)', index_html, re.DOTALL)
if match:
    services_dropdown = match.group(1)
    
    active_services_dropdown = services_dropdown.replace(
        '<a class="nav-link dropdown-toggle" href="services.html"',
        '<a class="nav-link dropdown-toggle active" href="services.html"'
    )

    for file in glob.glob('*.html'):
        if file == 'index.html':
            continue
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace either active or inactive flat link
        new_content = re.sub(
            r'<li class="nav-item">\s*<a class="nav-link(?: active)?" href="services\.html">Services</a>\s*</li>',
            active_services_dropdown if 'active' in content.partition('href="services.html"')[0][-20:] else services_dropdown,
            content
        )
        
        # Or if it's a flat link
        new_content = re.sub(
            r'<li class="nav-item">\s*<a class="nav-link(?: active)?" href="services\.html">Services</a>\s*</li>',
            active_services_dropdown, # Just replace with active for simplicity if it was active
            new_content
        )
        
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print('Updated', file)
