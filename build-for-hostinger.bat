@echo off
echo ==========================================
echo Building React App for Hostinger Deployment
echo ==========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Copy production environment file
echo Setting up production environment...
copy /Y .env.production .env
echo.

REM Build the React app
echo Building React app...
call npm run build
echo.

REM Copy combined .htaccess to dist folder
echo Copying combined .htaccess for React + Laravel routing...
copy /Y ..\.htaccess.production dist\.htaccess
echo.

echo ==========================================
echo Build Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Go to the 'dist' folder
echo 2. Upload ALL contents to your Hostinger public_html folder
echo 3. Make sure to upload the .htaccess file as well
echo.
echo Location: react-frontend\dist\
echo.
pause
