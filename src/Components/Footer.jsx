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
    <footer className="w-full bg-linear-to-b from-gray-950 to-black text-gray-300 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-500">
              MediQueue
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
              A modern tutor booking platform designed to simplify learning,
              scheduling, and student success with secure systems.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-6">

              {[
                FaFacebookF,
                FaLinkedinIn,
                FaGithub,
                FaXTwitter,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="text-sm" />
                </a>
              ))}

            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Learning Services
            </h3>

            <ul className="space-y-3 text-sm">

              {[
                ["Browse Tutors", "/tutors"],
                ["Become Tutor", "/add-tutor"],
                ["Booked Sessions", "/booked-sessions"],
                ["Manage Tutors", "/my-tutors"],
                ["Home", "/"],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-blue-500 transition duration-300 hover:translate-x-1 inline-block"
                  >
                    {name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-sm">

              {[
                ["Login", "/login"],
                ["Register", "/register"],
                ["FAQ", "/faq"],
                ["Contact", "/contact"],
                ["Privacy Policy", "/privacy-policy"],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-blue-500 transition duration-300 hover:translate-x-1 inline-block"
                  >
                    {name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm text-gray-400">

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-blue-500 mt-1" />
                <span>support@mediqueue.com</span>
              </div>

              <div className="flex items-start gap-3">
                <FaPhone className="text-blue-500 mt-1" />
                <span>+880 1883-650010</span>
              </div>

              <div className="flex items-start gap-3">
                <FaLocationDot className="text-blue-500 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 mt-12 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} MediQueue. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-xs sm:text-sm">

              {["Terms", "Privacy", "Cookies"].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="text-gray-500 hover:text-blue-500 transition"
                >
                  {item}
                </Link>
              ))}

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}