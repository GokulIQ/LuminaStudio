const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldScript = `      try {
        var saved = localStorage.getItem('lumina_theme');`;
        
const newScript = `      try {
        var saved = window.location.protocol === 'file:' ? null : localStorage.getItem('lumina_theme');`;

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(oldScript)) {
    content = content.replace(oldScript, newScript);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
}
