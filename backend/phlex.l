%{
#include <stdio.h>
#include <string.h>

int line_num = 1;

void print_token(const char* type, const char* value) {
    printf("%d|%s|%s\n", line_num, type, value);
}
%}

DIGIT       [0-9]
LETTER      [a-zA-Z_]
ALNUM       [a-zA-Z0-9_]
INT         {DIGIT}+
FLOAT       {DIGIT}+"."{DIGIT}+
STRING_D    \"([^\"\\\n]|\\.)*\"
STRING_S    \'([^\'\\\n]|\\.)*\'
COMMENT     #[^\n]*
IDENTIFIER  {LETTER}{ALNUM}*
WHITESPACE  [ \t\r]+
INDENT      ^[ \t]+

%%

"def"       { print_token("KEYWORD", yytext); }
"if"        { print_token("KEYWORD", yytext); }
"else"      { print_token("KEYWORD", yytext); }
"elif"      { print_token("KEYWORD", yytext); }
"for"       { print_token("KEYWORD", yytext); }
"while"     { print_token("KEYWORD", yytext); }
"return"    { print_token("KEYWORD", yytext); }
"import"    { print_token("KEYWORD", yytext); }
"from"      { print_token("KEYWORD", yytext); }
"class"     { print_token("KEYWORD", yytext); }
"pass"      { print_token("KEYWORD", yytext); }
"break"     { print_token("KEYWORD", yytext); }
"continue"  { print_token("KEYWORD", yytext); }
"True"      { print_token("KEYWORD", yytext); }
"False"     { print_token("KEYWORD", yytext); }
"None"      { print_token("KEYWORD", yytext); }
"and"       { print_token("KEYWORD", yytext); }
"or"        { print_token("KEYWORD", yytext); }
"not"       { print_token("KEYWORD", yytext); }
"in"        { print_token("KEYWORD", yytext); }
"is"        { print_token("KEYWORD", yytext); }
"lambda"    { print_token("KEYWORD", yytext); }
"try"       { print_token("KEYWORD", yytext); }
"except"    { print_token("KEYWORD", yytext); }
"finally"   { print_token("KEYWORD", yytext); }
"with"      { print_token("KEYWORD", yytext); }
"as"        { print_token("KEYWORD", yytext); }
"yield"     { print_token("KEYWORD", yytext); }
"del"       { print_token("KEYWORD", yytext); }
"global"    { print_token("KEYWORD", yytext); }
"nonlocal"  { print_token("KEYWORD", yytext); }
"assert"    { print_token("KEYWORD", yytext); }
"raise"     { print_token("KEYWORD", yytext); }
"print"     { print_token("KEYWORD", yytext); }
"input"     { print_token("KEYWORD", yytext); }
"len"       { print_token("KEYWORD", yytext); }
"range"     { print_token("KEYWORD", yytext); }
"type"      { print_token("KEYWORD", yytext); }
"int"       { print_token("KEYWORD", yytext); }
"float"     { print_token("KEYWORD", yytext); }
"str"       { print_token("KEYWORD", yytext); }
"list"      { print_token("KEYWORD", yytext); }
"dict"      { print_token("KEYWORD", yytext); }
"set"       { print_token("KEYWORD", yytext); }
"tuple"     { print_token("KEYWORD", yytext); }

{FLOAT}             { print_token("FLOAT", yytext); }
{INT}               { print_token("INTEGER", yytext); }
{STRING_D}          { print_token("STRING", yytext); }
{STRING_S}          { print_token("STRING", yytext); }
{COMMENT}           { print_token("COMMENT", yytext); }
{IDENTIFIER}        { print_token("IDENTIFIER", yytext); }

"=="        { print_token("OPERATOR", yytext); }
"!="        { print_token("OPERATOR", yytext); }
"<="        { print_token("OPERATOR", yytext); }
">="        { print_token("OPERATOR", yytext); }
"+="        { print_token("OPERATOR", yytext); }
"-="        { print_token("OPERATOR", yytext); }
"*="        { print_token("OPERATOR", yytext); }
"/="        { print_token("OPERATOR", yytext); }
"**"        { print_token("OPERATOR", yytext); }
"//"        { print_token("OPERATOR", yytext); }
"+"         { print_token("OPERATOR", yytext); }
"-"         { print_token("OPERATOR", yytext); }
"*"         { print_token("OPERATOR", yytext); }
"/"         { print_token("OPERATOR", yytext); }
"%"         { print_token("OPERATOR", yytext); }
"="         { print_token("OPERATOR", yytext); }
"<"         { print_token("OPERATOR", yytext); }
">"         { print_token("OPERATOR", yytext); }
"&"         { print_token("OPERATOR", yytext); }
"|"         { print_token("OPERATOR", yytext); }
"^"         { print_token("OPERATOR", yytext); }
"~"         { print_token("OPERATOR", yytext); }

"("         { print_token("SYMBOL", yytext); }
")"         { print_token("SYMBOL", yytext); }
"["         { print_token("SYMBOL", yytext); }
"]"         { print_token("SYMBOL", yytext); }
"{"         { print_token("SYMBOL", yytext); }
"}"         { print_token("SYMBOL", yytext); }
":"         { print_token("SYMBOL", yytext); }
";"         { print_token("SYMBOL", yytext); }
","         { print_token("SYMBOL", yytext); }
"."         { print_token("SYMBOL", yytext); }
"@"         { print_token("SYMBOL", yytext); }
"->"        { print_token("SYMBOL", yytext); }

"\n"        { line_num++; }
{WHITESPACE} { /* skip */ }

.           { print_token("ERROR", yytext); }

%%

int yywrap(void) { return 1; }

int main(int argc, char** argv) {
    if (argc > 1) {
        FILE* file = fopen(argv[1], "r");
        if (!file) {
            fprintf(stderr, "Could not open %s\n", argv[1]);
            return 1;
        }
        yyin = file;
    }
    yylex();
    return 0;
}
