@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\srws.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\srws.js" %*
)
