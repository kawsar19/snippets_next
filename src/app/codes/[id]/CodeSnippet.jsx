// src/CodeSnippet.js
import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ rawUrl, language }) => {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(rawUrl)
      .then((response) => response.text())
      .then((data) => setCode(data))
      .catch((error) => console.error("Error fetching code:", error));
  }, [rawUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative  p-4 bg-gray-900 text-white rounded-lg shadow-lg max-w-full overflow-auto h-96 w-full">
      <button
        onClick={handleCopy}
        className=" sticky  top-2 ms-auto  right-2 bottom-2  bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded flex items-center gap-2"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={atomDark}
        customStyle={{ backgroundColor: "transparent" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
