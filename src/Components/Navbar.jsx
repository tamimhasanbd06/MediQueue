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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const theme = localStorage.getItem("theme");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (theme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setOpen(false);
    router.push("/login");
  };

  const isActive = (path) =>
    pathname === path
      ? "text-blue-500 font-semibold"
      : "text-gray-600 hover:text-blue-500";

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            MediQueue
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm">

            <Link href="/" className={isActive("/")}>Home</Link>
            <Link href="/tutors" className={isActive("/tutors")}>Tutors</Link>

            {user && (
              <>
                <Link href="/add-tutor" className={isActive("/add-tutor")}>
                  Add Tutor
                </Link>
                <Link href="/my-tutors" className={isActive("/my-tutors")}>
                  My Tutors
                </Link>
                <Link href="/booked-sessions" className={isActive("/booked-sessions")}>
                  Sessions
                </Link>
              </>
            )}

            {/* Dark Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 border rounded text-sm dark:text-white"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {!user ? (
              <>
                <Link href="/login" className="px-4 py-1 border rounded">
                  Login
                </Link>

                <Link href="/register" className="px-4 py-1 bg-blue-600 text-white rounded">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="w-9 h-9 rounded-full border overflow-hidden"
              >
                <img
                  src={user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-full h-full object-cover"
                />
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-gray-700 dark:text-white"
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
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      {/* SIDE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 z-50 shadow-xl border-l dark:border-gray-700"
          >

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2 className="text-blue-600 font-bold">MediQueue</h2>
              <button onClick={() => setOpen(false)} className="text-xl">
                ✕
              </button>
            </div>

            {/* Profile */}
            {user && (
              <div className="p-4 flex items-center gap-3 border-b dark:border-gray-700">
                <img
                  src={user?.photo}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <button
                    onClick={logout}
                    className="text-sm text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col p-4 gap-4 text-sm">

              <Link onClick={() => setOpen(false)} href="/">Home</Link>
              <Link onClick={() => setOpen(false)} href="/tutors">Tutors</Link>

              {user && (
                <>
                  <Link onClick={() => setOpen(false)} href="/add-tutor">
                    Add Tutor
                  </Link>
                  <Link onClick={() => setOpen(false)} href="/my-tutors">
                    My Tutors
                  </Link>
                  <Link onClick={() => setOpen(false)} href="/booked-sessions">
                    Sessions
                  </Link>
                </>
              )}

              {!user && (
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login" className="border text-center py-2 rounded">
                    Login
                  </Link>

                  <Link href="/register" className="bg-blue-600 text-white text-center py-2 rounded">
                    Register
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