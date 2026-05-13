@echo off
echo ============================
echo  PHLEX Backend Build Script
echo ============================

echo.
echo [1/3] Compiling Flex file...
C:\msys64\usr\bin\flex.exe phlex.l
IF ERRORLEVEL 1 (
    echo ERROR: flex failed.
    exit /b 1
)

echo [2/3] Compiling C file...
C:\msys64\mingw64\bin\gcc.exe -o phlex.exe lex.yy.c
IF ERRORLEVEL 1 (
    echo ERROR: gcc failed.
    exit /b 1
)

echo [3/3] Installing Python dependencies...
pip install -r requirements.txt

echo.
echo Build complete.
echo.
echo Run the backend with: python app.py
echo.
