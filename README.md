# 🏴 GhostServer — CTF Challenge

## Challenge Category
**Web Exploitation**

## Challenge Description
In real-world web hosting environments, companies often run multiple websites or internal services on the same server using a technique called **virtual hosting**.  
Instead of assigning different servers to different websites, they rely on the `Host` header inside HTTP requests to decide which website to serve.

For example, a server might serve `www.company.com` publicly while also internally serving `admin.company.local` or `dev.company.local` for employees and developers.  
Normally, these internal systems are protected behind firewalls or private DNS records.

However, if a server **trusts the Host header without proper validation**, an attacker can manually forge the `Host` header and gain access to hidden internal services — leading to unauthorized access, sensitive data exposure, or even full system compromise.

This CTF challenge simulates that misconfiguration.

## Scenario
Players visit a normal public landing page with no visible vulnerabilities.  
However, hidden inside the system is an **admin panel** that is not directly accessible or linked anywhere.  
Players must realize that the server behavior changes based on the `Host` header value.

By modifying the `Host` header manually to `admin.ctf.local`, players can trick the server into revealing the **hidden admin panel**, where they can find:
- Dummy user account information
- Internal system logs
- The CTF flag

## How to Solve
- Intercept the HTTP request using a tool like **Burp Suite**, **Postman**, or **curl**.
- Modify the `Host` header to:  
  ```
  admin.ctf.local
  ```
- Send the modified request.
- Access the hidden admin panel and retrieve the flag:  
  ```
  CTF{Fl4g_H0stH34d3rVuln3r4b1l1ty}
  ```

## Technical Stack
- Node.js (Express.js)
- HTML/CSS
- Local hosting on `localhost:3000`
- Manual Host header manipulation

## Educational Objective
This challenge demonstrates the risks of trusting client-controlled headers without validation.  
Players will learn about:
- Virtual Hosting misconfigurations
- Host header attacks
- Best practices for protecting web applications against header manipulation

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/GhostServer-CTF.git
   cd GhostServer-ctf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   node server.js
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

5. (Optional) Add this to your `/etc/hosts` file for easier testing:
   ```
   127.0.0.1    admin.ctf.local
   ```

## Flag
```
CTF{Fl4g_H0stH34d3rVuln3r4b1l1ty}
```


## License
This CTF challenge is open for educational use.

