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
    icon: <FaUserGraduate className="text-3xl sm:text-4xl text-blue-500 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />,
    title: "Verified Expert Tutors",
    description:
      "Learn from highly qualified and carefully verified tutors across multiple subjects.",
  },
  {
    id: 2,
    icon: <FaCalendarCheck className="text-3xl sm:text-4xl text-blue-500 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />,
    title: "Easy Session Booking",
    description:
      "Book sessions quickly with smart scheduling and zero time conflicts.",
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-3xl sm:text-4xl text-blue-500 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />,
    title: "Secure System",
    description:
      "JWT protected authentication and safe booking management for users.",
  },
  {
    id: 4,
    icon: <FaLaptopHouse className="text-3xl sm:text-4xl text-blue-500 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />,
    title: "Flexible Learning",
    description:
      "Choose online, offline, or hybrid learning based on your convenience.",
  },
];

export default function WhyChooseMediQueue() {
  return (
    <section className="w-full bg-linear-to-b from-white to-blue-50/50 dark:from-slate-950 dark:to-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <p className="text-blue-500 uppercase tracking-[3px] text-xs sm:text-sm font-bold mb-3">
            Why Choose MediQueue
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Smarter Learning for Modern Students
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A simple, secure and efficient platform for booking tutors and managing learning sessions.
          </p>
        </div>

        {/* CARDS CONTAINER */}
        {/* grid-cols-1 -> Mobile: 1 card per line
          sm:grid-cols-2 -> Tablet: 2 cards per line
          lg:grid-cols-4 -> Desktop: 4 cards per line 
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-between
              transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/[0.04] hover:border-blue-500/50 dark:hover:border-blue-400/50"
            >
              <div className="flex flex-col items-center w-full">
                {/* ICON CONTAINER */}
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-slate-800 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* ACTION BUTTON */}
              <Link
                href="/tutors"
                className="mt-auto w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold tracking-wide hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xs"
              >
                Explore Tutors
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-12 sm:mt-20">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 font-bold tracking-wide text-sm sm:text-base
            hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 active:scale-95 shadow-md shadow-blue-500/[0.02]"
          >
            Join MediQueue Today
          </Link>
        </div>

      </div>
    </section>
  );
}