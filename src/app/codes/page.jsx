"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getAccessTokenFromCookies } from "@/actions/actions";

export default function Home() {
  const [gists, setGists] = useState([]);

  useEffect(() => {
    const fetchGists = async () => {
      const token = await getAccessTokenFromCookies();

      if (!token) {
        return;
      }
      try {
        const response = await axios.get("https://api.github.com/gists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGists(response.data);
      } catch (error) {
        console.error("Error fetching gists:", error);
      }
    };

    fetchGists();
  }, []);
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">GitHub Gists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gists.map((gist) => (
            <Link
              href={`/codes/${gist.id}`}
              key={gist.id}
              className="bg-white p-4 rounded shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">
                {gist.description || "No Description"}
              </h2>
              <ul>
                {Object.keys(gist.files).map((file) => (
                  <li key={file} className="mb-1  flex justify-between">
                    <a
                      href={gist.files[file].raw_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {gist.files[file].filename}
                    </a>
                    <span className="bg-green-500 rounded p-1  text-white ms-1">
                      {gist.files[file].language}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 mt-2">
                Created at: {new Date(gist.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
