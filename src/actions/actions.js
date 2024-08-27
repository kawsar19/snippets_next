"use server";

import { cookies } from "next/headers";

export const getAccessTokenFromCookies = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return accessToken?.value;
};

// this is used in sign-in page
export const setAccessTokenToCookies = async (accessToken) => {
  const cookieStore = cookies();

  const getAccessToken = cookieStore.get("accessToken");

  if (!getAccessToken) {
    const thirtyDays = 60 * 60 * 24 * 7;
    // set cookie
    cookieStore.set("accessToken", accessToken, {
      maxAge: thirtyDays,
      httpOnly: true,
      path: "/",
    });
  }
};
export const getLanguageFromCookies = async () => {
  const cookieStore = cookies();
  const language = cookieStore.get("language");

  return language?.value || "en";
};

export const setLanguageToCookies = async (language) => {
  const cookieStore = cookies();

  const getLanguage = cookieStore.get("language");

  if (!getLanguage || getLanguage.value !== language) {
    const thirtyDays = 60 * 60 * 24 * 7;
    // set cookie
    cookieStore.set("language", language, {
      maxAge: thirtyDays,
      httpOnly: true,
      path: "/",
    });
  }
};

export const deleteAccessToken = async () => {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  // redirect("/");
};
