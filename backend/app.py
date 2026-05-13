import os
import subprocess
import tempfile
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

LEXER_EXECUTABLE = os.path.join(os.path.dirname(__file__), "phlex.exe")

def parse_token_line(line):
    """Parse a line formatted as: line_num|TYPE|value"""
    parts = line.split("|", 2)
    if len(parts) == 3:
        try:
            return {
                "line": int(parts[0]),
                "type": parts[1].strip(),
                "value": parts[2].strip()
            }
        except ValueError:
            return None
    return None

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    if not data or "code" not in data:
        return jsonify({"error": "No code provided."}), 400

    code = data["code"]
    tmp_file = None

    try:
        # Write code to a temp file
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".py", delete=False, encoding="utf-8"
        ) as tmp:
            tmp.write(code)
            tmp_file = tmp.name

        # Run the compiled Flex executable
        result = subprocess.run(
            [LEXER_EXECUTABLE, tmp_file],
            capture_output=True,
            text=True,
            timeout=10
        )

        raw_output = result.stdout.strip()

        if not raw_output and result.returncode != 0:
            return jsonify({
                "error": f"Lexer error: {result.stderr.strip() or 'Unknown error'}"
            }), 500

        # Parse the structured output into token objects
        tokens = []
        has_error = False
        for line in raw_output.splitlines():
            token = parse_token_line(line)
            if token:
                if token["type"] == "ERROR":
                    has_error = True
                tokens.append(token)

        return jsonify({
            "tokens": tokens,
            "has_error": has_error,
            "token_count": len(tokens)
        }), 200

    except subprocess.TimeoutExpired:
        return jsonify({"error": "Lexer timed out."}), 500
    except FileNotFoundError:
        return jsonify({
            "error": "Lexer executable not found. Run: flex phlex.l && gcc -o phlex lex.yy.c"
        }), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if tmp_file and os.path.exists(tmp_file):
            os.remove(tmp_file)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
