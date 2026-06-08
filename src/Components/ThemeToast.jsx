"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

export default function ThemeToast() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setDarkMode(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    window.addEventListener("storage", updateTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? "#020617" : "#ffffff",
            color: darkMode ? "#ffffff" : "#0f172a",
            border: darkMode ? "1px solid rgba(59,130,246,0.35)" : "1px solid rgba(37,99,235,0.18)",
            borderRadius: "16px",
            boxShadow: darkMode ? "0 20px 45px rgba(59,130,246,0.16)" : "0 20px 45px rgba(15,23,42,0.10)",
            fontWeight: "600",
          },
        }}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName={() =>
          "relative flex p-4 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer shadow-2xl border border-gray-200/50 dark:border-zinc-800 bg-white dark:bg-black text-gray-900 dark:text-white"
        }
        bodyClassName={() => "flex items-center text-sm font-bold text-gray-900 dark:text-white"}
      />
    </>
  );
}
