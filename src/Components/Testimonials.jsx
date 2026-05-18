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
      "The booking system is super easy and smooth. I can schedule classes anytime without hassle.",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    subject: "English",
    image: "https://i.pravatar.cc/150?img=8",
    review:
      "I love how quickly I found a tutor. The platform feels very professional and secure.",
  },
];

export default function SuccessStories() {
  return (
    <section className="w-full bg-white dark:bg-gray-950 py-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-500 uppercase tracking-[3px] font-semibold text-sm mb-4">
            Success Stories
          </p>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            What Our Students Say
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Real experiences from students who improved their learning journey
            using MediQueue tutor booking system.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition duration-500"
            >
              {/* QUOTE ICON */}
              <FaQuoteLeft className="text-blue-500 text-3xl mb-6" />

              {/* REVIEW */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {item.review}
              </p>

              {/* STAR RATING */}
              <div className="flex gap-1 text-yellow-400 mb-6">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              {/* USER INFO */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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