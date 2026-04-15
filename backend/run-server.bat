@echo off
REM Start PHP built-in server with router from this directory
cd /d "%~dp0"
where php >nul 2>nul
if errorlevel 1 (
    echo PHP was not found in PATH.
    echo Install PHP and add it to PATH, then run this script again.
    exit /b 1
)

php -d extension=mysqli -S localhost:8000 "%~dp0router.php"
