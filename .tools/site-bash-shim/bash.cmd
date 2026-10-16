@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:\Users\them4f\Desktop\Elmadagfoto\.tools\site-bash-shim\package-site-wrapper.ps1" -Project "%~2" -Archive "%~3"
exit /b %ERRORLEVEL%
