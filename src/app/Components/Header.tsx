"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  deleteAccessToken,
  getAccessTokenFromCookies,
  getLanguageFromCookies,
  setAccessTokenToCookies,
  setLanguageToCookies,
} from "@/actions/actions";
import Link from "next/link";
interface Props {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve token from cookies on component mount
    const fetchToken = async () => {
      const savedToken = await getAccessTokenFromCookies();
      if (savedToken) {
        setToken(savedToken);
      }
    };

    fetchToken();
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleTokenChange = (
    e: ChangeEvent<HTMLInputElement>,
    setToken: Props["setToken"]
  ) => {
    setToken(e.target.value);
  };

  const handleTokenSubmit = async () => {
    if (token) {
      await setAccessTokenToCookies(token);
    }
    handleModalClose();
  };

  return (
    <div className="bg-[#7E33E0]">
      <div className="container mx-auto">
        <div className="flex justify-between py-2">
          <div className="flex gap-10">
            {/* Existing elements */}
            <Link href="/">Home</Link>
            <button onClick={handleModalOpen} className="text-white">
              Token
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Token</h2>
            <input
              type="text"
              value={token}
              onChange={handleTokenChange}
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={handleTokenSubmit}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
            <button
              onClick={handleModalClose}
              className="ml-2 bg-gray-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
