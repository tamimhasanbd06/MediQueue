"use client";

import Link from "next/link";
import { FaArrowRight, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

export default function HomeCallToAction() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-blue-50/50 to-white dark:from-[#0a192f] dark:to-[#020c1b] transition-colors duration-500">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-slate-100 dark:border-slate-800/50 shadow-xl dark:shadow-blue-950/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* CONTENT SECTION */}
          <div>
            <p className="text-blue-600 dark:text-blue-400 uppercase tracking-[3px] text-xs sm:text-sm font-bold mb-3 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]">
              Ready To Learn Better
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] leading-tight">
              Find Your Tutor And Start Your Next Session
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-slate-300/90 leading-relaxed max-w-xl">
              Explore available tutors, book a session and manage your learning journey through a clean and secure platform.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* Primary Button */}
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-white font-bold text-sm border border-blue-100 dark:border-white/20 shadow-sm hover:bg-blue-50 dark:hover:bg-white dark:hover:text-slate-950 transition-all duration-300 active:scale-95 group"
              >
                Browse Tutors 
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-slate-900 dark:bg-transparent text-white dark:text-white font-bold text-sm border border-transparent dark:border-white/20 hover:bg-slate-800 dark:hover:bg-white dark:hover:text-slate-950 transition-all duration-300 active:scale-95"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* CARDS SECTION (Glassmorphism) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Student Card */}
            <div className="group rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md p-6 sm:p-8 shadow-lg shadow-slate-100/50 dark:shadow-none hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-100/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 shadow-inner transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <FaUserGraduate className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                For Students
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300/80 leading-relaxed">
                Find subject experts, check details and book sessions easily.
              </p>
            </div>

            {/* Tutor Card */}
            <div className="group rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md p-6 sm:p-8 shadow-lg shadow-slate-100/50 dark:shadow-none hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-100/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 shadow-inner transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <FaChalkboardTeacher className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                For Tutors
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300/80 leading-relaxed">
                Add tutor profiles and reach students through MediQueue.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}