import React from 'react';
import './Docs.css';

const Docs = () => {
  const elements = [
    { type: 'Keywords', examples: 'def, if, else, return, print, etc.', regex: '[a-z]+' },
    { type: 'Identifiers', examples: 'hello_world, my_var, x, y', regex: '[a-zA-Z_][a-zA-Z0-9_]*' },
    { type: 'Literals (Integer)', examples: '42, 100, 0', regex: '[0-9]+' },
    { type: 'Literals (Float)', examples: '3.14, 0.001, 2.0', regex: '[0-9]+"."[0-9]+' },
    { type: 'Operators', examples: '+, -, *, /, =, ==, >, <', regex: '[\\+\\-\\*\\/\\=\\>\\<]' },
    { type: 'Symbols', examples: ':, (, ), [, ], #', regex: '[:\\(\\)\\[\\]\\#]' },
    { type: 'Strings', examples: '"hello", \'world\'', regex: '\"[^\"]*\"' },
    { type: 'Comments', examples: '# This is a comment', regex: '#.*' },
    { type: 'Error', examples: 'Any invalid character', regex: '.' },
  ];

  return (
    <div className="docs-container">
      <header className="docs-header">
        <h1>Lexical Elements</h1>
        <p>Comprehensive list of supported Python tokens and their corresponding regex rules in Flex.</p>
      </header>

      <div className="table-container">
        <table className="docs-table">
          <thead>
            <tr>
              <th>ELEMENT TYPE</th>
              <th>EXAMPLES</th>
              <th>REGEX RULE (FLEX)</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((el, i) => (
              <tr key={i}>
                <td className="type-col">{el.type}</td>
                <td className="example-col"><code>{el.examples}</code></td>
                <td className="regex-col"><code>{el.regex}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Docs;
