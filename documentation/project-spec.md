# APP: FlexiPython Lexical Analyzer
# ELEVATOR PITCH: A web UI that takes Python source code, feeds it to a C-based Flex analyzer, and outputs the categorized lexical tokens (keywords, identifiers, literals, etc.).

# CORE USER FLOW & STRUCTURE
STRICT RULE: The app has ONLY 2 pages.
1. Home Page (/): Contains the Hero section and the main 50/50 split Analyzer section (Input on left, Flex output on right).
2. Documentation Page (/docs): Displays a strict, well-formatted table of the supported Python lexical elements, regex rules, and descriptions.

# ARCHITECTURE
The user types in the React frontend -> clicks "Analyze" -> React sends JSON to Flask backend -> Flask writes code to a temp file -> Flask executes the compiled C Flex program on that file -> Flask captures stdout -> Flask returns JSON to React -> React displays tokens in the UI.