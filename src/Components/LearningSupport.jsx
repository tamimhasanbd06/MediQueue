"use client";

import { FaShieldAlt, FaClock, FaUserCheck, FaClipboardList } from "react-icons/fa";

const supportItems = [
  {
    id: 1,
    icon: <FaUserCheck className="text-2xl text-blue-500" />,
    title: "Verified Tutor Profiles",
    description:
      "Students can review clear tutor information before making a booking decision.",
  },
  {
    id: 2,
    icon: <FaClock className="text-2xl text-blue-500" />,
    title: "Flexible Session Timing",
    description:
      "Learners can choose a tutor according to schedule, subject and session availability.",
  },
  {
    id: 3,
    icon: <FaClipboardList className="text-2xl text-blue-500" />,
    title: "Organized Bookings",
    description:
      "Booked sessions stay easy to manage, review and cancel from one place.",
  },
  {
    id: 4,
    icon: <FaShieldAlt className="text-2xl text-blue-500" />,
    title: "Protected Experience",
    description:
      "Authentication and protected pages help keep the learning workflow safe.",
  },
];

export default function LearningSupport() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-16 bg-white dark:bg-[#030712] overflow-hidden">
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT */}
        <div>
          <p className="text-blue-500 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
            Learning Support
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Built To Support Students And Tutors Together
          </h2>

          <p className="mt-5 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            MediQueue keeps the learning journey clean, simple and useful for both learners and educators without adding unnecessary complexity.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-blue-600 text-white p-5 shadow-xl shadow-blue-500/20">
              <h3 className="text-3xl font-black">24/7</h3>
              <p className="text-sm text-blue-100 mt-1">Platform Access</p>
            </div>

            <div className="rounded-2xl bg-gray-900 dark:bg-slate-900 text-white p-5 border border-gray-800">
              <h3 className="text-3xl font-black">Easy</h3>
              <p className="text-sm text-gray-300 mt-1">Tutor Booking</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {supportItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/40"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
