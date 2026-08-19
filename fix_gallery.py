import os

with open('gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('class="glass-card p-3 h-100 overflow-hidden group-hover-lift"', 'class="glass-card p-3 h-100 overflow-hidden group-hover-lift d-flex flex-column"')
content = content.replace('<div class="p-2">', '<div class="p-2 d-flex flex-column flex-grow-1">')
content = content.replace('<div class="d-flex justify-content-between align-items-center">', '<div class="d-flex justify-content-between align-items-center mt-auto">')

with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated gallery.html")
