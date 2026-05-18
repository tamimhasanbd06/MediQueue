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
    icon: <FaUserGraduate className="text-4xl text-blue-500" />,
    title: "Verified Expert Tutors",
    description:
      "Learn from highly qualified and carefully verified tutors across multiple academic subjects.",
  },
  {
    id: 2,
    icon: <FaCalendarCheck className="text-4xl text-blue-500" />,
    title: "Easy Session Booking",
    description:
      "Book your preferred tutor sessions quickly with organized scheduling and zero time conflicts.",
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-4xl text-blue-500" />,
    title: "Secure Digital System",
    description:
      "Enjoy JWT-protected authentication, safe booking management, and reliable session tracking.",
  },
  {
    id: 4,
    icon: <FaLaptopHouse className="text-4xl text-blue-500" />,
    title: "Flexible Learning Modes",
    description:
      "Choose between online, offline, or hybrid tutoring options based on your convenience.",
  },
];

export default function WhyChooseMediQueue() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-950 py-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-500 uppercase tracking-[3px] font-semibold text-sm mb-4">
            Why Choose MediQueue
          </p>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Smarter Tutor Booking for Modern Students
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            MediQueue simplifies your educational journey with expert tutors,
            seamless scheduling, secure digital booking, and flexible learning
            experiences tailored to your success.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition duration-500 flex flex-col items-center text-center"
            >
              {/* ICON */}
              <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-500">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* CTA */}
              <Link
                href="/tutors"
                className="mt-auto inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
              >
                Explore Tutors
              </Link>
            </div>
          ))}

        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-16">
          <Link
            href="/register"
            className="inline-block px-10 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition duration-300"
          >
            Join MediQueue Today
          </Link>
        </div>

      </div>
    </section>
  );
}