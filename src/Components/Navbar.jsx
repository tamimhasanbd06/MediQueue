"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiSun,
  FiMoon,
  FiChevronDown,
} from "react-icons/fi";

import {
  authClient,
  saveAuthToken,
  clearAuthToken,
} from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const profileRef = useRef(null);

  // =========================
  // THEME SETUP
  // =========================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  // =========================
  // JWT TOKEN SYNC
  // =========================
  useEffect(() => {
    if (user) {
      saveAuthToken();
      return;
    }
    clearAuthToken();
  }, [user?.id]);

  const validImage = typeof user?.image === "string" && user.image.startsWith("http");

  // Click Outside to Close Menus
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          clearAuthToken();
          setMobileMenuOpen(false);
          setProfileMenuOpen(false);
          router.push("/login");
        },
      },
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  if (isPending) return null;

  // Navigation Setup
  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Tutors", href: "/tutors" },
  ];

  const privateLinks = [
    { name: "Add Tutor", href: "/add-tutor" },
    { name: "My Tutors", href: "/my-tutors" },
    { name: "Booked Sessions", href: "/booked-sessions" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* LOGO BRANDING */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 group-hover:shadow-blue-500/40">
                <span className="text-lg font-black text-white">M</span>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 transition-colors dark:text-white">
                  MediQueue
                </h1>
                <p className="text-[11px] font-medium tracking-wide text-slate-400 dark:text-slate-500 uppercase">
                  Tutor Booking
                </p>
              </div>
            </Link>

            {/* DESKTOP MAIN NAVIGATION */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {publicLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative py-2 text-[14px] font-semibold transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                        active ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {link.name}
                      {active && (
                        <motion.span
                          layoutId="desktopNavUnderline"
                          className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-blue-600 dark:bg-blue-400"
                        />
                      )}
                    </Link>
                  );
                })}

                {user &&
                  privateLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`relative py-2 text-[14px] font-semibold transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                          active ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {link.name}
                        {active && (
                          <motion.span
                            layoutId="desktopNavUnderline"
                            className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-blue-600 dark:bg-blue-400"
                          />
                        )}
                      </Link>
                    );
                  })}
                  
                {user && (
                  <Link
                    href="/profile"
                    className={`relative py-2 text-[14px] font-semibold transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                      pathname === "/profile" ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    Profile
                    {pathname === "/profile" && (
                      <motion.span
                        layoutId="desktopNavUnderline"
                        className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-blue-600 dark:bg-blue-400"
                      />
                    )}
                  </Link>
                )}
              </div>

              {/* INTEGRATED RIGHT ACTIONS */}
              <div className="flex items-center gap-4 border-l border-slate-200 pl-6 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
                </button>

                {!user ? (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="group flex items-center gap-2 rounded-xl p-1 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                      <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-blue-500/80 transition-all group-hover:ring-blue-500">
                        {validImage ? (
                          <Image
                            src={user.image}
                            alt="Avatar"
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white text-sm">
                            {getInitials(user?.name)}
                          </div>
                        )}
                      </div>
                      <FiChevronDown className={`text-slate-500 transition-transform duration-300 ${profileMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {profileMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.96 }}
                          transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                          className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950"
                        >
                          <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Signed in as</p>
                            <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                          </div>
                          <div className="space-y-1 pt-2">
                            <Link
                              href="/profile"
                              onClick={() => setProfileMenuOpen(false)}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                            >
                              <FiUser className="text-slate-400" /> My Profile
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                            >
                              <FiLogOut /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE INTERFACE TRIGGER */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden dark:border-slate-800 dark:text-slate-300"
            >
              <FiMenu className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE FULL DRAWER INTERFACE */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col bg-white p-6 shadow-2xl dark:bg-slate-950"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  MediQueue
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleThemeToggle}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300"
                  >
                    {theme === "dark" ? <FiSun /> : <FiMoon />}
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 dark:text-slate-300"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Mobile User Profile Summary Section */}
              {user && (
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/50">
                  <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-blue-500">
                    {validImage ? (
                      <Image src={user.image} alt="Avatar" width={80} height={80} className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-600 font-bold text-white text-sm">
                        {getInitials(user.name)}
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                    <p className="truncate text-xs text-slate-400 dark:text-slate-500">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Mobile Link Directory (Beautiful Pill Shaped Rounded Buttons) */}
              <div className="mt-6 flex flex-col gap-2 overflow-y-auto pr-1">
                {publicLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-2xl px-5 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 transform active:scale-98 ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60 dark:hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {user && (
                  <>
                    <div className="my-2 h-px bg-slate-100 dark:bg-slate-800" />
                    {privateLinks.map((link) => {
                      const active = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`rounded-2xl px-5 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 transform active:scale-98 ${
                            active
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60 dark:hover:text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                    
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 transform active:scale-98 ${
                        pathname === "/profile"
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60 dark:hover:text-white"
                      }`}
                    >
                      <FiUser className={pathname === "/profile" ? "text-white" : "text-slate-400"} /> 
                      Profile Account
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Access Controllers Footers */}
              <div className="mt-auto pt-6">
                {!user ? (
                  <div className="flex flex-col gap-2.5">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 text-sm font-bold tracking-wide text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold tracking-wide text-white shadow-md shadow-blue-500/10 active:scale-98"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex w-full h-12 items-center justify-center gap-2 rounded-2xl bg-rose-50 text-sm font-bold tracking-wide text-rose-600 transition-colors hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-950/40 active:scale-98"
                  >
                    <FiLogOut /> Log Out
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}