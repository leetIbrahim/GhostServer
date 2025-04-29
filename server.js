const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, "public")));

// Dummy sensitive admin data
const adminData = {
  users: [
    { id: 1, username: "admin", email: "admin@ctf.local", role: "Administrator" },
    { id: 2, username: "testuser", email: "test@example.com", role: "User" },
    { id: 3, username: "dev", email: "dev@ctf.local", role: "Developer" },
    { id: 4, username: "guest", email: "guest@example.com", role: "Guest" },
    { id: 5, username: "support", email: "support@ctf.local", role: "Support" },
  ],
  system_logs: [
    "2025-04-29 03:00:01 - User admin logged in from 192.168.1.100",
    "2025-04-29 03:05:22 - Configuration updated by dev",
    "2025-04-29 03:10:45 - Failed login attempt for user: root",
    "2025-04-29 03:15:11 - Service restarted successfully",
  ],
  flag: "CTF{Fl4g_H0stH34d3rVuln3r4b1l1ty}",
};

app.get("/", (req, res) => {
  const targetHost = req.headers["x-forwarded-host"] || req.headers.host;

  console.log(
    `Received request. Host: ${req.headers.host}, X-Forwarded-Host: ${req.headers["x-forwarded-host"]}, Effective Host for check: ${targetHost}`
  );

  if (targetHost === "admin.ctf.local") {
    // Serve Admin Panel
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Admin Panel</title>
          <link rel="stylesheet" href="/style.css">
      </head>
      <body>
          <header>
              <h1>Admin Panel</h1>
          </header>
          <div class="container admin-panel">
              <h2>Sensitive Information</h2>

              <h3>Users:</h3>
              <ul>
                ${adminData.users.map(user =>
                  `<li>ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Role: ${user.role}</li>`
                ).join('')}
              </ul>

              <h3>System Logs:</h3>
              <ul>
                ${adminData.system_logs.map(log =>
                  `<li>${log}</li>`
                ).join('')}
              </ul>

              <h3>Flag:</h3>
              <code>${adminData.flag}</code>
          </div>
      </body>
      </html>
    `);
  } else {
    // Serve Public Page
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Welcome</title>
          <link rel="stylesheet" href="/style.css">
      </head>
      <body>
          <header>
              <h1>Welcome to Our Site!</h1>
          </header>
          <div class="container">
              <div class="content">
                  <h2>Hello Visitor!</h2>
                  <p>This is the public landing page. Enjoy your stay!</p>
                  <p class="hint">Looking for something else? Maybe check the source...</p>
              </div>
          </div>
      </body>
      </html>
    `);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
