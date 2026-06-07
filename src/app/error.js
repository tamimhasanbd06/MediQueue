"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    document.title = "MediQueue | Error";
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F2] dark:bg-black px-4 text-center transition-all duration-500">
      <div className="max-w-lg rounded-3xl bg-white dark:bg-zinc-950 border border-blue-500/20 p-8 shadow-xl">
        <h1 className="text-4xl font-black text-red-500 mb-3">Something Went Wrong</h1>
        <p className="text-gray-500 dark:text-zinc-400 mb-6">
          We could not load this page correctly. Please try again.
        </p>
        <button onClick={reset} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-300">
          Try Again
        </button>
      </div>
    </div>
  );
}
