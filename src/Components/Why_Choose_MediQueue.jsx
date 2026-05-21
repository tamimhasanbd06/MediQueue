"use client";

import Link from "next/link";
import {
  FaUserGraduate,
  FaCalendarCheck,
  FaShieldAlt,
  FaLaptopHouse,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaUserGraduate className="text-3xl sm:text-4xl text-blue-500" />,
    title: "Verified Expert Tutors",
    description:
      "Learn from highly qualified and carefully verified tutors across multiple subjects.",
  },
  {
    id: 2,
    icon: <FaCalendarCheck className="text-3xl sm:text-4xl text-blue-500" />,
    title: "Easy Session Booking",
    description:
      "Book sessions quickly with smart scheduling and zero time conflicts.",
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-3xl sm:text-4xl text-blue-500" />,
    title: "Secure System",
    description:
      "JWT protected authentication and safe booking management for users.",
  },
  {
    id: 4,
    icon: <FaLaptopHouse className="text-3xl sm:text-4xl text-blue-500" />,
    title: "Flexible Learning",
    description:
      "Choose online, offline, or hybrid learning based on your convenience.",
  },
];

export default function WhyChooseMediQueue() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900 py-14 sm:py-20 px-4 sm:px-6 lg:px-16">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">

          <p className="text-blue-500 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
            Why Choose MediQueue
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Smarter Learning for Modern Students
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            A simple, secure and efficient platform for booking tutors and managing learning sessions.
          </p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center
              transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400"
            >

              {/* ICON */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* BUTTON */}
              <Link
                href="/tutors"
                className="mt-auto w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition active:scale-95"
              >
                Explore Tutors
              </Link>

            </div>
          ))}

        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-12 sm:mt-16">

          <Link
            href="/register"
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-xl border border-blue-600 text-blue-600 font-semibold
            hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
          >
            Join MediQueue Today
          </Link>

        </div>

      </div>
    </section>
  );
}