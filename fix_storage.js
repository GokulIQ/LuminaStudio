const fs = require('fs');

const filesToUpdate = [
  'assets/js/main.js',
  'assets/js/auth.js',
  'assets/js/admin.js',
  'assets/js/dashboard.js'
];

function wrapStorage(content) {
  let output = content.replace(/localStorage\.getItem\((.*?)\)/g, "safeGetItem($1)");
  output = output.replace(/localStorage\.setItem\((.*?)\)/g, "safeSetItem($1)");
  output = output.replace(/localStorage\.removeItem\((.*?)\)/g, "safeRemoveItem($1)");
  return output;
}

const safeStorageCode = `
// Safe Storage Wrapper to prevent 'file:' protocol security errors
const memoryStorage = {};
function safeGetItem(key) {
  try { return window.localStorage.getItem(key); }
  catch(e) { return memoryStorage[key] || null; }
}
function safeSetItem(key, value) {
  try { window.localStorage.setItem(key, value); }
  catch(e) { memoryStorage[key] = String(value); }
}
function safeRemoveItem(key) {
  try { window.localStorage.removeItem(key); }
  catch(e) { delete memoryStorage[key]; }
}

`;

for (let file of filesToUpdate) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = wrapStorage(content);
    if (!content.includes('safeGetItem')) {
       // it already updated or something
       continue;
    }
    fs.writeFileSync(file, safeStorageCode + content, 'utf8');
    console.log('Updated ' + file);
  }
}

