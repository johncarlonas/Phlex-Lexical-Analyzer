# SECURITY PROTOCOLS
1. Execution Safety: The Flask backend MUST ONLY pass the temporary file to the compiled `./pylex` executable. NEVER run `eval()`, `exec()`, or attempt to actually execute the user's Python code within the backend.
2. CORS: Restrict CORS to `localhost` or the specific frontend production URL.
3. Input Sanitization: Ensure the temporary file created by the backend is safely overwritten or deleted after every single request to avoid disk space leaks.