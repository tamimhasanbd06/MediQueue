"use client";

import Link from "next/link";
import { FaSearch, FaCalendarCheck, FaChalkboardTeacher, FaChartLine } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Find The Right Tutor",
    description:
      "Browse expert tutors by subject, fee, schedule and available seats.",
  },
  {
    id: 2,
    icon: <FaCalendarCheck className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Book A Session",
    description:
      "Reserve your preferred session quickly with a smooth booking flow.",
  },
  {
    id: 3,
    icon: <FaChalkboardTeacher className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Start Learning",
    description:
      "Join guided lessons and learn with a tutor who matches your goal.",
  },
  {
    id: 4,
    icon: <FaChartLine className="text-2xl sm:text-3xl text-blue-500" />,
    title: "Track Progress",
    description:
      "Manage booked sessions and keep your learning journey organized.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden bg-white dark:bg-[#030712]">
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-blue-500 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
            Simple Process
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            How MediQueue Works
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            From tutor discovery to session management, everything is designed to feel easy and reliable.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/40"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-all duration-300">
                {step.icon}
              </div>

              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mb-4">
                {step.id}
              </span>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tutors"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm sm:text-base hover:bg-blue-700 transition-all duration-300 active:scale-95"
          >
            Start Exploring
          </Link>
        </div>

      </div>
    </section>
  );
}
