"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/tutors`, {
          cache: "no-store",
        });

        const data = await res.json();
        setTutors(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [API_URL]);

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-white to-blue-50">

      {/* HEADER */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
          Featured Tutors
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Top 6 expert tutors available for booking
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {tutors.map((tutor) => (
            <div
              key={tutor?._id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >

              {/* IMAGE */}
              <Link href={`/tutors/${tutor?._id}`}>
                <div className="relative h-56 sm:h-64 overflow-hidden">

                  <Image
                    src={
                      tutor?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={tutor?.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* SUBJECT BADGE */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full shadow">
                      {tutor?.subject}
                    </span>
                  </div>

                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">

                {/* NAME */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {tutor?.name}
                </h3>

                {/* PRICE */}
                <p className="text-xl sm:text-2xl font-black text-blue-600 mt-1">
                  ৳ {tutor?.fee}
                </p>

                {/* DETAILS */}
                <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-600">

                  <p>
                    <span className="font-semibold text-gray-800">
                      Subject:
                    </span>{" "}
                    {tutor?.subject}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800">
                      Start:
                    </span>{" "}
                    {tutor?.courseStartMonth}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800">
                      End:
                    </span>{" "}
                    {tutor?.courseEndMonth}
                  </p>

                </div>

                {/* BUTTON */}
                <Link
                  href={`/tutors/${tutor?._id}`}
                  className="mt-5 w-full text-center py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 active:scale-95"
                >
                  Book Session
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}
    </section>
  );
}