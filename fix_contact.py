import re

with open('contact.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Uncomment the login CTA in contact.html
text = text.replace('<!-- <div id="luminaHeaderAuthSlot" class="d-inline-flex align-items-center">', '<div id="luminaHeaderAuthSlot" class="d-inline-flex align-items-center">')
text = text.replace('<span>Login</span>\n            </a>\n          </div> -->', '<span>Login</span>\n            </a>\n          </div>')

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(text)
print("Uncommented Login CTA in contact.html")
