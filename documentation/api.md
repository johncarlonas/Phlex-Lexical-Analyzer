# API ROUTES

Endpoint: POST /analyze
- Description: Receives Python source code from the frontend, runs it through the Flex lexer, and returns the formatted output.
- Request Body (JSON): 
  `{ "code": "def hello(): print('world')" }`
- Response Success (200 OK): 
  `{ "output": "KEYWORD: def\nIDENTIFIER: hello\n..." }`
- Response Error (500 Internal Server Error):
  `{ "output": "Error running lexer: [details]" }`