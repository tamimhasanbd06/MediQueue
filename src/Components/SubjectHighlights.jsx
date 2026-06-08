"use client";

import Link from "next/link";
import { FaCalculator, FaAtom, FaFlask, FaLanguage, FaLaptopCode, FaBookOpen } from "react-icons/fa";

const subjects = [
  {
    id: 1,
    icon: <FaCalculator className="text-2xl text-blue-500" />,
    name: "Mathematics",
    text: "Algebra, geometry, calculus and exam preparation.",
  },
  {
    id: 2,
    icon: <FaAtom className="text-2xl text-blue-500" />,
    name: "Physics",
    text: "Concept-based learning with problem solving support.",
  },
  {
    id: 3,
    icon: <FaFlask className="text-2xl text-blue-500" />,
    name: "Chemistry",
    text: "Organic, inorganic and practical theory guidance.",
  },
  {
    id: 4,
    icon: <FaLanguage className="text-2xl text-blue-500" />,
    name: "English",
    text: "Grammar, writing, speaking and academic English.",
  },
  {
    id: 5,
    icon: <FaLaptopCode className="text-2xl text-blue-500" />,
    name: "Programming",
    text: "Web development, coding logic and project practice.",
  },
  {
    id: 6,
    icon: <FaBookOpen className="text-2xl text-blue-500" />,
    name: "Academic Care",
    text: "Regular school, college and admission learning support.",
  },
];

export default function SubjectHighlights() {
  return (
    <section className="w-full bg-linear-to-b from-blue-50/60 to-white dark:from-[#020817] dark:to-[#030712] py-16 sm:py-24 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-blue-500 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
              Popular Subjects
            </p>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              Learn The Subjects That Matter Most
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              MediQueue helps students connect with tutors for core academic subjects and skill-focused learning.
            </p>
          </div>

          <Link
            href="/tutors"
            className="w-fit px-7 py-3 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-500 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View Tutors
          </Link>
        </div>

        {/* SUBJECTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/40"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                  {subject.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {subject.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {subject.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
