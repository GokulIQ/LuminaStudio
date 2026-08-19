import re

with open('assets/js/auth.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the else block for authSlot.innerHTML
pattern = r'\} else \{\s*authSlot\.innerHTML = `\s*<a href="register\.html".*?</a>\s*`;\s*\}'

replacement = """} else {
      const isContactPage = window.location.pathname.includes('contact.html');
      if (isContactPage) {
        authSlot.innerHTML = `
         <a href="login.html" class="btn btn-sm btn-glass d-none d-lg-inline-flex align-items-center gap-2" style="border-radius: var(--radius-full); padding: 0.4rem 0.95rem; font-weight: 600; font-size: 0.84rem;">
          <i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Login</span>
         </a>
        `;
      } else {
        authSlot.innerHTML = `
         <a href="register.html" class="btn btn-sm btn-primary-gradient btn-shimmer d-none d-lg-inline-flex align-items-center gap-2" style="border-radius: var(--radius-full); padding: 0.4rem 0.95rem; font-weight: 600; font-size: 0.84rem;">
          <i class="fa-solid fa-user-plus"></i> <span>Sign Up</span>
         </a>
        `;
      }
    }"""

text = re.sub(pattern, replacement, text, flags=re.DOTALL)

with open('assets/js/auth.js', 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated auth.js")
