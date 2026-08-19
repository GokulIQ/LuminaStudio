import re
import glob

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract the Services dropdown from index.html
match = re.search(r'(<!-- Mega Menu: Services -->.*?</li>)', index_html, re.DOTALL)
if match:
    services_dropdown = match.group(1)
    
    # We also need to mark the Services dropdown as active for these pages
    # The extracted dropdown has: <a class="nav-link dropdown-toggle" href="services.html" ...
    # We should make it: <a class="nav-link dropdown-toggle active" href="services.html" ...
    
    active_services_dropdown = services_dropdown.replace(
        '<a class="nav-link dropdown-toggle" href="services.html"',
        '<a class="nav-link dropdown-toggle active" href="services.html"'
    )

    for file in glob.glob('service-*.html') + ['services.html']:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace either active or inactive flat link
        new_content = re.sub(
            r'<li class="nav-item">\s*<a class="nav-link(?: active)?" href="services\.html">Services</a>\s*</li>',
            active_services_dropdown,
            content
        )
        
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print('Updated', file)
else:
    print('Could not find Services dropdown in index.html')
