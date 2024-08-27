// src/app/cheetsheet/page.tsx
import Link from "next/link";
import React from "react";

const CheetSheet = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">CheatSheet</h1>
      <ul className="list-disc pl-5 space-y-4 text-lg">
        <li>
          <Link
            href="/cheetsheet/html"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            HTML
          </Link>
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            CSS
          </a>
        </li>
        <li>
          <Link
            href="/cheetsheet/javascript"
            className="text-blue-600 hover:underline"
          >
            JavaScript
          </Link>
        </li>
        <li>
          <Link
            href="/cheetsheet/git"
            className="text-blue-600 hover:underline"
          >
            GitHub
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CheetSheet;
