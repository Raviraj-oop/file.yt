const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all routes to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT_HTTP = process.env.PORT_HTTP || 80;
const PORT_HTTPS = process.env.PORT_HTTPS || 443;

// Read SSL certificates
const options = {
  key: fs.readFileSync('/home/ubuntu/selfsigned.key'),
  cert: fs.readFileSync('/home/ubuntu/selfsigned.crt')
};

// Create HTTP server and HTTPS server
http.createServer(app).listen(PORT_HTTP, () => {
  console.log(`HTTP Server is running on port ${PORT_HTTP}`);
});

https.createServer(options, app).listen(PORT_HTTPS, () => {
  console.log(`HTTPS Server is running on port ${PORT_HTTPS}`);
});
