@echo off
echo ========================================
echo   Qlystra Technologies - Full Stack
echo   Starting Flask Server...
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [1/3] Checking dependencies...
pip show Flask >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Flask dependencies...
    pip install -r requirements.txt
)

echo.
echo [2/3] Creating data directory...
if not exist "data" mkdir data

echo.
echo [3/3] Starting Flask server...
echo.
echo ========================================
echo   Server will start on:
echo   - Main Site: http://localhost:5000
echo   - Admin Panel: http://localhost:5000/admin/login.html
echo   - API Health: http://localhost:5000/api/health
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
