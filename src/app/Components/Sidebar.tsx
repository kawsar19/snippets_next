"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getAccessTokenFromCookies } from "@/actions/actions";
import { usePathname } from "next/navigation";

// Define types for the Gist and Gist files
interface GistFile {
  filename: string;
  raw_url: string;
  language?: string;
}

interface Gist {
  id: string;
  description?: string;
  files: Record<string, GistFile>;
  created_at: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const [gists, setGists] = useState<Gist[]>([]);

  useEffect(() => {
    const fetchGists = async () => {
      const token = await getAccessTokenFromCookies();

      if (!token) {
        return;
      }
      try {
        const response = await axios.get<Gist[]>(
          "https://api.github.com/gists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGists(response.data);
      } catch (error) {
        console.error("Error fetching gists:", error);
      }
    };

    fetchGists();
  }, []);

  return (
    <div className="w-64 bg-gray-100 shadow-lg p-4 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-2">
        Gists
      </h2>
      <ul className="space-y-2">
        {gists.map((gist) => {
          const isActive = pathname === `/codes/${gist.id}`;
          return (
            <li
              key={gist.id}
              className={`p-3 rounded-md shadow-sm transition-colors duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <Link
                href={`/codes/${gist.id}`}
                className="block text-blue-600 hover:underline"
              >
                {gist.description || "No Description"}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
