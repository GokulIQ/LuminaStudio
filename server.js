import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from root directory
app.use(express.static(__dirname));

// Clean URL routing (e.g. /about -> about.html)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.includes('.')) {
    const htmlFile = path.join(__dirname, `${req.path}.html`);
    if (fs.existsSync(htmlFile)) {
      return res.sendFile(htmlFile);
    }
  }
  next();
});

// Fallback route handler for missing pages
app.use((req, res) => {
  const file404 = path.join(__dirname, '404.html');
  if (fs.existsSync(file404)) {
    res.status(404).sendFile(file404);
  } else {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LuminaStudio server listening on http://0.0.0.0:${PORT}`);
});
