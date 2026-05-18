"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-extrabold text-blue-500 mb-4">
              MediQueue
            </h2>

            <p className="text-sm leading-7 text-gray-400">
              Simplifying tutor booking for students through secure scheduling,
              organized sessions, and seamless learning experiences.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Learning Services
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tutors" className="hover:text-blue-500 transition">
                  Browse Tutors
                </Link>
              </li>

              <li>
                <Link href="/add-tutor" className="hover:text-blue-500 transition">
                  Become a Tutor
                </Link>
              </li>

              <li>
                <Link href="/booked-sessions" className="hover:text-blue-500 transition">
                  Booked Sessions
                </Link>
              </li>

              <li>
                <Link href="/my-tutors" className="hover:text-blue-500 transition">
                  Manage Tutors
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-blue-500 transition">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/login" className="hover:text-blue-500 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-blue-500 transition">
                  Register
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-blue-500 transition">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-blue-500 transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:text-blue-500 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Info
            </h3>

            <ul className="space-y-4 text-sm">

              <li className="flex items-start gap-3">
                <FaEnvelope className="text-blue-500 mt-1" />
                <span>support@mediqueue.com</span>
              </li>

              <li className="flex items-start gap-3">
                <FaPhone className="text-blue-500 mt-1" />
                <span>+880 1883-650010</span>
              </li>

              <li className="flex items-start gap-3">
                <FaLocationDot className="text-blue-500 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>

            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} MediQueue. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/terms" className="hover:text-blue-500 transition">
                Terms
              </Link>

              <Link href="/privacy-policy" className="hover:text-blue-500 transition">
                Privacy
              </Link>

              <Link href="/cookies" className="hover:text-blue-500 transition">
                Cookies
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}