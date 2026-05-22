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
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [
    profileDropdownOpen,
    setProfileDropdownOpen,
  ] = useState(false);

  const dropdownRef = useRef(null);

  // =========================
  // SAFE IMAGE CHECK
  // =========================

  const validImage =
    typeof user?.image === "string" &&
    user.image.startsWith("http");

  // =========================
  // CLOSE DROPDOWN
  // =========================

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setMobileMenuOpen(false);
          setProfileDropdownOpen(false);

          router.push("/login");
        },
      },
    });
  };

  // =========================
  // ACTIVE LINK
  // =========================

  const navLinkClass = (path) => {
    const active = pathname === path;

    return `
      relative
      text-[15px]
      font-medium
      transition-all
      duration-300
      hover:text-blue-500
      hover:scale-105
      ${
        active
          ? "text-blue-600"
          : "text-gray-700"
      }
    `;
  };

  // =========================
  // USER INITIALS
  // =========================

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // =========================
  // LOADING
  // =========================

  if (isPending) return null;

  // =========================
  // NAV LINKS
  // =========================

  const links = [
    {
      name: "Home",
      href: "/",
      private: false,
    },
    {
      name: "Tutors",
      href: "/tutors",
      private: false,
    },
    {
      name: "Add Tutor",
      href: "/add-tutor",
      private: true,
    },
    {
      name: "My Tutors",
      href: "/my-tutors",
      private: true,
    },
    {
      name: "Booked Sessions",
      href: "/booked-sessions",
      private: true,
    },
  ];

  return (
    <>
      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-19.5 flex items-center justify-between">

            {/* ========================= */}
            {/* LOGO */}
            {/* ========================= */}

            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                <span className="text-white font-black text-lg">
                  M
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-gray-900">
                  MediQueue
                </h1>

                <p className="text-xs text-gray-500 -mt-1">
                  Tutor Booking Platform
                </p>
              </div>
            </Link>

            {/* ========================= */}
            {/* DESKTOP MENU */}
            {/* ========================= */}

            <div className="hidden lg:flex items-center gap-8">

              {/* NAVIGATION */}

              <div className="flex items-center gap-7">
                {links.map((link) => {
                  if (
                    link.private &&
                    !user
                  )
                    return null;

                  const active =
                    pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={navLinkClass(
                        link.href
                      )}
                    >
                      {link.name}

                      <span
                        className={`absolute left-0 -bottom-1.75 h-[2.5px] rounded-full bg-blue-500 transition-all duration-300 ${
                          active
                            ? "w-full"
                            : "w-0"
                        }`}
                      ></span>
                    </Link>
                  );
                })}
              </div>

              {/* RIGHT SECTION */}

              <div className="flex items-center gap-4">

                {!user ? (
                  <div className="flex items-center gap-3">

                    <Link
                      href="/login"
                      className="px-5 py-2.5 rounded-2xl border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 hover:-translate-y-px"
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      className="px-5 py-2.5 rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div
                    className="relative"
                    ref={dropdownRef}
                  >
                    {/* PROFILE BUTTON */}

                    <motion.button
                      whileTap={{
                        scale: 0.95,
                      }}
                      whileHover={{
                        scale: 1.05,
                      }}
                      onClick={() =>
                        setProfileDropdownOpen(
                          !profileDropdownOpen
                        )
                      }
                      className="relative"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-blue-500 shadow-lg shadow-blue-500/20">

                        {validImage ? (
                          <Image
                            src={user.image}
                            alt="User"
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
                            {getInitials(
                              user?.name
                            )}
                          </div>
                        )}
                      </div>
                    </motion.button>

                    {/* DROPDOWN */}

                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="absolute right-0 mt-4 w-72 rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-2xl"
                        >
                          {/* USER INFO */}

                          <div className="p-5 border-b border-gray-100 bg-linear-to-r from-blue-50 to-white">
                            <div className="flex items-center gap-4">

                              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500">

                                {validImage ? (
                                  <Image
                                    src={
                                      user.image
                                    }
                                    alt="User"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                    {getInitials(
                                      user?.name
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="overflow-hidden">
                                <h3 className="font-bold text-gray-900 truncate">
                                  {user?.name}
                                </h3>

                                <p className="text-sm text-gray-500 truncate">
                                  {user?.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* MENU */}

                          <div className="p-3">

                            <Link
                              href="/profile"
                              onClick={() =>
                                setProfileDropdownOpen(
                                  false
                                )
                              }
                              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-blue-50 transition-all duration-300"
                            >
                              <FiUser />
                              Profile
                            </Link>

                            <button
                              onClick={
                                handleLogout
                              }
                              className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300"
                            >
                              <FiLogOut />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* ========================= */}
            {/* MOBILE MENU BUTTON */}
            {/* ========================= */}

            <button
              onClick={() =>
                setMobileMenuOpen(true)
              }
              className="lg:hidden w-11 h-11 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-700"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* ========================= */}
      {/* BACKDROP */}
      {/* ========================= */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* ========================= */}
      {/* MOBILE DRAWER */}
      {/* ========================= */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-2xl font-black text-blue-600">
                MediQueue
              </h2>

              <button
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="text-3xl text-gray-700"
              >
                <FiX />
              </button>
            </div>

            {/* USER */}

            {user && (
              <div className="p-5 border-b border-gray-200 flex items-center gap-4">

                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500">

                  {validImage ? (
                    <Image
                      src={user.image}
                      alt="User"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {getInitials(
                        user?.name
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {user?.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* LINKS */}

            <div className="flex flex-col gap-2 p-5 grow overflow-y-auto">

              {links.map((link) => {
                if (
                  link.private &&
                  !user
                )
                  return null;

                const active =
                  pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className={`px-4 py-3 rounded-2xl transition-all duration-300 text-[15px] font-medium ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* AUTH */}

              {!user ? (
                <div className="flex flex-col gap-3 mt-6">

                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className="w-full py-3 rounded-2xl border border-gray-300 text-center text-gray-700"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() =>
                      setMobileMenuOpen(
                        false
                      )
                    }
                    className="w-full py-3 rounded-2xl bg-blue-600 text-white text-center shadow-lg shadow-blue-500/30"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300"
                >
                  <FiLogOut />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}