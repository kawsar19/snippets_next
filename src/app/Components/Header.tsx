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

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState<string>("");

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

  const handleTokenChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setToken(e.target.value);
  };

  const handleTokenSubmit = async () => {
    if (token) {
      await setAccessTokenToCookies(token);
    }
    handleModalClose();
  };

  return (
    <>
      <div className="bg-[#7E33E0] fixed top-0 left-0 w-full shadow-lg z-50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex gap-6 items-center">
            {/* Logo or Title */}
            <h1 className="text-white text-xl font-semibold">MyApp</h1>
            {/* Navigation Links */}
            <nav className="flex gap-6">
              <Link
                href="/"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/codes"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Codes
              </Link>
              <Link
                href="/cheetsheet"
                className="text-white hover:text-gray-200 transition-colors"
              >
                CheetSheet
              </Link>
            </nav>
          </div>
          <button
            onClick={handleModalOpen}
            className="bg-white text-[#7E33E0] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Token
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Set Access Token</h2>
            <input
              type="text"
              value={token}
              onChange={handleTokenChange}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter access token"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleModalClose}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTokenSubmit}
                className="bg-[#7E33E0] text-white px-4 py-2 rounded-lg hover:bg-[#6a29c8] transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
