"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // LOAD USER + THEME
  useEffect(() => {
    setMounted(true);

    const storedUser = localStorage.getItem("user");
    const theme = localStorage.getItem("theme");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (theme === "dark") {
      setDark(true);
    }
  }, []);

  // THEME TOGGLE
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("dark", dark);

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setOpen(false);

    router.push("/login");
  };

  // ACTIVE LINK STYLE
  const isActive = (path) =>
    pathname === path
      ? "text-blue-600 dark:text-blue-400 font-semibold"
      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition";

  if (!mounted) return null;

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">

          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400"
          >
            MediQueue
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">

            <Link href="/" className={isActive("/")}>
              Home
            </Link>

            <Link href="/tutors" className={isActive("/tutors")}>
              Tutors
            </Link>

            {user && (
              <>
                <Link
                  href="/add-tutor"
                  className={isActive("/add-tutor")}
                >
                  Add Tutor
                </Link>

                <Link
                  href="/my-tutors"
                  className={isActive("/my-tutors")}
                >
                  My Tutors
                </Link>

                <Link
                  href="/booked-sessions"
                  className={isActive("/booked-sessions")}
                >
                  Sessions
                </Link>
              </>
            )}

            {/* THEME TOGGLE */}
            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-sm dark:text-white hover:scale-105 active:scale-95 transition"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* AUTH BUTTONS */}
            {!user ? (
              <div className="flex items-center gap-3">

                <Link
                  href="/login"
                  className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 active:scale-95"
                >
                  Sign Up
                </Link>

              </div>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500 hover:scale-105 transition"
              >
                <img
                  src={
                    user?.photo ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-3xl text-gray-700 dark:text-white"
          >
            ☰
          </button>

        </div>
      </nav>

      {/* BACKDROP */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-gray-900 z-50 shadow-2xl border-l border-gray-200 dark:border-gray-700"
          >

            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">

              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                MediQueue
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-700 dark:text-white"
              >
                ✕
              </button>

            </div>

            {/* USER INFO */}
            {user && (
              <div className="p-5 flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">

                <img
                  src={
                    user?.photo ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User"
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />

                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user?.name}
                  </p>

                  <button
                    onClick={logout}
                    className="text-sm text-red-500 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>

              </div>
            )}

            {/* MOBILE LINKS */}
            <div className="flex flex-col p-5 gap-4 text-base font-medium">

              <Link
                onClick={() => setOpen(false)}
                href="/"
                className={isActive("/")}
              >
                Home
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/tutors"
                className={isActive("/tutors")}
              >
                Tutors
              </Link>

              {user && (
                <>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/add-tutor"
                    className={isActive("/add-tutor")}
                  >
                    Add Tutor
                  </Link>

                  <Link
                    onClick={() => setOpen(false)}
                    href="/my-tutors"
                    className={isActive("/my-tutors")}
                  >
                    My Tutors
                  </Link>

                  <Link
                    onClick={() => setOpen(false)}
                    href="/booked-sessions"
                    className={isActive("/booked-sessions")}
                  >
                    Sessions
                  </Link>
                </>
              )}

              {/* MOBILE THEME BUTTON */}
              <button
                onClick={() => setDark(!dark)}
                className="mt-3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-white transition"
              >
                {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {/* AUTH */}
              {!user && (
                <div className="flex flex-col gap-3 mt-5">

                  <Link
                    onClick={() => setOpen(false)}
                    href="/login"
                    className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-center dark:text-white"
                  >
                    Login
                  </Link>

                  <Link
                    onClick={() => setOpen(false)}
                    href="/signup"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold shadow-lg shadow-blue-500/20 transition"
                  >
                    Sign Up
                  </Link>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}