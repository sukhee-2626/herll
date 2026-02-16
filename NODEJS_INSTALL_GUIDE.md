# 📦 Node.js Installation Guide for Windows

## Quick Install (5-10 minutes)

### Step 1: Download Node.js

1. Open your browser
2. Go to: **https://nodejs.org/**
3. You'll see two download buttons:
   - **LTS (Long Term Support)** - Recommended ✅
   - Current (Latest features)
4. Click the **LTS** button to download

### Step 2: Run the Installer

1. Open the downloaded file (e.g., `node-v20.x.x-x64.msi`)
2. Click **Next** on the welcome screen
3. Accept the license agreement
4. Choose installation location (default is fine: `C:\Program Files\nodejs\`)
5. **Important:** Make sure these are checked:
   - ✅ Node.js runtime
   - ✅ npm package manager
   - ✅ Add to PATH
6. Click **Next** through remaining screens
7. Click **Install**
8. Wait for installation to complete (2-3 minutes)
9. Click **Finish**

### Step 3: Verify Installation

1. **Close any open PowerShell/Terminal windows**
2. Open a **new** PowerShell window
3. Run these commands:

```powershell
node --version
# Should show: v20.x.x (or similar)

npm --version
# Should show: 10.x.x (or similar)
```

If you see version numbers, **you're all set!** ✅

### Step 4: Run Your Project

```powershell
# Navigate to your project
cd c:\Users\HP\happy\qlystra-technologies

# Install dependencies
npm install

# Start the server
npm start
```

Your website will be running at: **http://localhost:3000**

---

## Troubleshooting

### "npm is not recognized"

**Solution:**
1. Restart your computer
2. Open a new PowerShell window
3. Try again

If still not working:
1. Search for "Environment Variables" in Windows
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Under "System variables", find "Path"
5. Click "Edit"
6. Make sure these paths exist:
   - `C:\Program Files\nodejs\`
   - `C:\Users\HP\AppData\Roaming\npm`
7. Click OK on all windows
8. Restart PowerShell

### Installation Fails

**Solution:**
1. Run the installer as Administrator:
   - Right-click the installer
   - Choose "Run as administrator"
2. Disable antivirus temporarily
3. Try again

### npm install Errors

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# If still failing, try:
npm install --legacy-peer-deps
```

---

## What Gets Installed?

- **Node.js:** JavaScript runtime (lets you run JavaScript on your computer)
- **npm:** Package manager (installs libraries and dependencies)
- **npx:** Package runner (runs packages without installing them)

**Total Size:** ~50-70 MB

---

## Alternative: Using Chocolatey (Advanced)

If you have Chocolatey package manager:

```powershell
# Run PowerShell as Administrator
choco install nodejs-lts -y
```

---

## After Installation

Once Node.js is installed, you can:

1. ✅ Run the full Qlystra Technologies server
2. ✅ Use all backend features (auth, database, APIs)
3. ✅ Install any npm packages
4. ✅ Run development tools

---

## Quick Test

Create a test file to verify Node.js works:

```powershell
# Create test file
echo "console.log('Node.js is working!');" > test.js

# Run it
node test.js

# Should output: Node.js is working!

# Clean up
del test.js
```

---

## Need Help?

If you encounter any issues:
1. Check the error message
2. Search for the error on Google
3. Ask me for help!

**Common Download Links:**
- Official Site: https://nodejs.org/
- Direct LTS Download: https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

---

**Ready to install?** Just download from https://nodejs.org/ and follow the steps above!
