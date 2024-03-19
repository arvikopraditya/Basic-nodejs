const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = path.join(__dirname, 'basichtml');

const server = http.createServer((req, res) => {
  let filePath = '';

  switch (req.url) {
    case '/':
      filePath = path.join(PUBLIC_DIR, 'index.html');
      break;
    case '/about':
      filePath = path.join(PUBLIC_DIR, 'about.html');
      break;
    case '/contact-me':
      filePath = path.join(PUBLIC_DIR, 'contact-me.html');
      break;
    default:
      filePath = path.join(PUBLIC_DIR, '404.html');
      break;
  }

  // Read the file corresponding to the requested URL
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If there's an error reading the file, return a 404 response
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
      return;
    }

    // Otherwise, send the file content with the appropriate content type
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});