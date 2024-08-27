// src/GistDetails.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CodeSnippet from "./CodeSnippet";
import { getAccessTokenFromCookies } from "@/actions/actions";

const GistDetails = ({ id }) => {
  const [gist, setGist] = useState(null);

  useEffect(() => {
    const fetchGistDetails = async () => {
      const token = await getAccessTokenFromCookies();
      if (!token) {
        return;
      }
      try {
        const response = await axios.get(`https://api.github.com/gists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your GitHub token
          },
        });
        setGist(response.data);
      } catch (error) {
        console.error("Error fetching gist details:", error);
      }
    };

    fetchGistDetails();
  }, [id]);

  if (!gist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {gist.description || "No Description"}
      </h1>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Files:</h2>
        {Object.keys(gist.files).map((file) => (
          <div key={file} className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-red-700  bg-red-100 w-max p-1 rounded px-2">
              {gist.files[file].filename}
            </h3>
            <CodeSnippet
              rawUrl={gist.files[file].raw_url}
              language={gist.files[file].language || "javascript"} // Adjust language if needed
            />
          </div>
        ))}
        <p className="text-gray-500 mt-4">
          Created at: {new Date(gist.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default GistDetails;
