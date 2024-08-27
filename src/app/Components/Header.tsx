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
      <div className="h-16 bg-red-300 ">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed illum esse
        eligendi harum nesciunt quas sapiente placeat saepe quibusdam molestiae
        necessitatibus dolorem itaque temporibus animi maiores architecto
        possimus, dolore adipisci?
      </div>
    </>
  );
};

export default Header;
