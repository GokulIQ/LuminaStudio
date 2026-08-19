import re

with open('services.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('<i class="fa-regular fa-calendar-check" fa-solid fa-arrow-right ms-1"></i>', '<i class="fa-solid fa-arrow-right ms-1"></i>')

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed malformed icons in services.html")
