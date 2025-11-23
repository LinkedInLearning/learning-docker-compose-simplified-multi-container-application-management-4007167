const express = require('express');
const { createClient } = require('redis');

const app = express();
const PORT = 3000;

// Valkey client configuration (using Redis client since Valkey is Redis-compatible)
const valkeyClient = createClient({
  socket: {
    host: process.env.VALKEY_HOST || 'valkey',
    port: process.env.VALKEY_PORT || 6379
  }
});

// Connect to Valkey
valkeyClient.connect().then(() => {
  console.log('Connected to Valkey successfully');
}).catch((err) => {
  console.error('Failed to connect to Valkey:', err);
});

// Handle connection errors
valkeyClient.on('error', (err) => {
  console.error('Valkey Client Error:', err);
});

// Serve static files (CSS)
app.use(express.static('public'));

// Main route - counter page
app.get('/', async (req, res) => {
  try {
    // Increment the page visit counter
    const count = await valkeyClient.incr('page_counter');
    
    // Get client IP for display
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
    
    // HTML response
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page Counter with Valkey</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="container">
            <h1>🎯 Page Counter</h1>
            <div class="counter-display">
                <div class="counter-number">${count}</div>
                <div class="counter-label">Page Refreshes</div>
            </div>
            <div class="info">
                <p><strong>Your IP:</strong> ${clientIP}</p>
                <p><strong>Powered by:</strong> Valkey + Node.js + Docker Compose</p>
                <p><strong>Last visit:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div class="actions">
                <button onclick="location.reload()" class="refresh-btn">🔄 Refresh Page</button>
                <a href="/reset" class="reset-btn">🔄 Reset Counter</a>
                <a href="/stats" class="stats-btn">📊 View Stats</a>
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`
      <h1>Error</h1>
      <p>Could not connect to Valkey: ${error.message}</p>
      <a href="/">Try Again</a>
    `);
  }
});

// Reset counter route
app.get('/reset', async (req, res) => {
  try {
    await valkeyClient.del('page_counter');
    res.redirect('/');
  } catch (error) {
    console.error('Reset Error:', error);
    res.status(500).send('Error resetting counter');
  }
});

// Stats route
app.get('/stats', async (req, res) => {
  try {
    const count = await valkeyClient.get('page_counter') || 0;
    const valkeyInfo = await valkeyClient.info();
    
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Stats - Page Counter</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="container">
            <h1>📊 Statistics</h1>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Page Views</h3>
                    <div class="stat-number">${count}</div>
                </div>
                <div class="stat-card">
                    <h3>Valkey Status</h3>
                    <div class="stat-status">✅ Connected</div>
                </div>
            </div>
            <div class="info">
                <h3>Valkey Information</h3>
                <pre class="valkey-info">${valkeyInfo}</pre>
            </div>
            <div class="actions">
                <a href="/" class="back-btn">← Back to Counter</a>
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Stats Error:', error);
    res.status(500).send('Error getting stats');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Page Counter app running on http://localhost:${PORT}`);
  console.log(`🔗 Valkey host: ${process.env.VALKEY_HOST || 'valkey'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await valkeyClient.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await valkeyClient.disconnect();
  process.exit(0);
});
