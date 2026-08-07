const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract the footer from index.html
const startTag = '<footer class="site-footer">';
const endTag = '</footer>';

const startIndex = indexHtml.indexOf(startTag);
const endIndex = indexHtml.indexOf(endTag, startIndex) + endTag.length;

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find footer in index.html");
  process.exit(1);
}

const fullFooter = indexHtml.substring(startIndex, endIndex);
console.log("Footer extracted, length:", fullFooter.length);

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (let file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Try to find existing footer in the current file
  // Using regex to match any <footer class="site-footer"...>...</footer>
  // since some files might have <footer class="site-footer bg-light py-4 text-center">
  const footerRegex = /<footer class="site-footer[^>]*>[\s\S]*?<\/footer>/;
  
  if (footerRegex.test(content)) {
    const updatedContent = content.replace(footerRegex, fullFooter);
    if (content !== updatedContent) {
      fs.writeFileSync(file, updatedContent, 'utf8');
      console.log('Updated footer in ' + file);
    }
  } else {
    // If no footer found, log it
    console.log('No matching footer found in ' + file);
  }
}
