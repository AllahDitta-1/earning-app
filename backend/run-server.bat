@echo off
REM Start PHP built-in server with router from this directory
cd /d "%~dp0"
"C:\php-8.5.4-Win32-vs17-x64\php.exe" -d extension_dir="C:\php-8.5.4-Win32-vs17-x64\ext" -d extension=mysqli -S localhost:8000 "%~dp0router.php"
