# Phlex: Python Lexical Analyzer

## Overview
Phlex is a full-stack application designed to tokenize Python source code with extreme precision. It uses a compiled Flex (C) scanner for maximum speed and accuracy, providing a structured view of keywords, identifiers, literals, operators, and more.

## Video Demonstration
[Programming Languages Final Project - Phlex: A Lexical Analyzer for Python](https://youtu.be/jGWccy5SLEg)

## Key Features
- **High-Performance Engine**: Core lexical scanning handled by a compiled C program (Flex).
- **Modern UI**: Clean, brutalist-inspired interface built with React and Vite.
- **Real-time Analysis**: Instant tokenization with line number tracking.
- **Persistence**: Your code and results stay with you as you navigate the app.
- **Error Handling**: Graceful detection and reporting of invalid lexical tokens.
- **Lexical Coverage**:
  - Keywords (def, class, if, etc.)
  - Identifiers (variable/function names)
  - Literals (Strings, Integers, Floats)
  - Operators (Arithmetic, Bitwise, Assignment)
  - Punctuation (Brackets, Colons, etc.)
  - Comments (# style)

## Architecture
1. **Frontend**: React (Vite) - Handles the workspace UI and state.
2. **Backend**: Flask (Python) - Acts as a bridge between the UI and the engine.
3. **Engine**: Flex (C) - The actual scanner that processes source code.

## Quick Start

### 1. Prerequisites
- **Node.js** (for frontend)
- **Python 3.x** (for backend)
- **Flex & GCC** (for compiling the engine)
  - *Recommendation*: Use MSYS2 or GnuWin32 for Windows.

### 2. Setup Backend
```bash
cd backend
.\build.bat     # Automatically compiles the Flex engine and installs Python deps
python app.py   # Starts the Flask server on port 5000
```

### 3. Setup Frontend
```bash
cd phlex
npm install
npm run dev     # Starts the Vite dev server
```

## Usage
1. Open the browser to the Vite URL (usually `localhost:5173`).
2. Paste your Python code into the **INPUT.PY** panel.
3. Click **START LEXICAL ANALYSIS**.
4. View categorized tokens in the **TOKENS.OUT** terminal.
5. Navigate to **Documentation Page** to see the full list of supported lexical rules.

## Project Structure
```text
Phlex/
├── backend/                # Flask API & Flex Source
│   ├── phlex.l             # Flex lexer definition
│   ├── app.py              # Flask backend
│   └── build.bat           # Automation script
└── phlex/                  # React Frontend
    └── src/
        ├── pages/          # Home & Docs views
        └── components/     # Shared UI components

```
