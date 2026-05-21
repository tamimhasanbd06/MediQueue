"use client";

import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahim Ahmed",
    subject: "Mathematics",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "MediQueue helped me find an amazing math tutor. My grades improved a lot within weeks!",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    subject: "Physics",
    image: "https://i.pravatar.cc/150?img=5",
    review:
      "The booking system is super smooth. I can schedule classes anytime without hassle.",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    subject: "English",
    image: "https://i.pravatar.cc/150?img=8",
    review:
      "I found a tutor very quickly. The platform feels professional and secure.",
  },
  {
    id: 4,
    name: "Ayesha Khan",
    subject: "Chemistry",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Great platform! The tutors are very helpful and the system is very easy to use.",
  },
];

export default function SuccessStories() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900 py-14 sm:py-20 px-4 sm:px-6 lg:px-16">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">

          <p className="text-blue-500 uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
            Success Stories
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            What Students Say About Us
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Real experiences from learners who improved their academic journey using MediQueue.
          </p>

        </div>

        {/* GRID (4 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6
              transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* QUOTE */}
              <FaQuoteLeft className="text-blue-500 text-2xl mb-4" />

              {/* REVIEW */}
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                {item.review}
              </p>

              {/* STARS */}
              <div className="flex gap-1 text-yellow-400 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* USER */}
              <div className="flex items-center gap-3">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.subject}
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