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
    <section
      className="
        relative 
        py-12 
        sm:py-16 
        px-4 
        overflow-hidden 
        transition-all 
        duration-500

        bg-linear-to-b 
        from-white 
        via-blue-50 
        to-white

      dark:bg-[radial-gradient(circle_at_top,_#0f3b8f_0%,_#071226_35%,_#020817_70%,_#000814_100%)]
      "
    >

      {/* LIGHT MODE OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.04),transparent,rgba(59,130,246,0.04))] dark:hidden pointer-events-none"></div>

      {/* DARK MODE OVERLAY */}
      <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,rgba(37,99,235,0.08),transparent,rgba(37,99,235,0.08))] pointer-events-none"></div>

      {/* HEADER */}
      <div className="relative text-center mb-10 sm:mb-14 z-10">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-600">
          Featured Tutors
        </h2>

        <p className="text-sm sm:text-base text-blue-500 mt-2">
          Top 6 expert tutors available for booking
        </p>

      </div>

      {/* LOADING */}
      {loading ? (
        <div className="relative flex justify-center py-20 z-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 z-10">

          {tutors.map((tutor) => (
            <div
              key={tutor?._id}
              className="
                group
                rounded-2xl
                overflow-hidden
                flex
                flex-col
                transition-all
                duration-300
                backdrop-blur-sm

                bg-white
                border
                border-blue-100
                shadow-lg
                shadow-blue-100/50

                hover:shadow-2xl
                hover:shadow-blue-200/60

                dark:bg-[#0b1120]/90
                dark:border-blue-900/40
                dark:shadow-[0_0_25px_rgba(37,99,235,0.12)]
                dark:hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]
              "
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

                    <span className="bg-blue-600 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg shadow-blue-500/30">
                      {tutor?.subject}
                    </span>

                  </div>

                </div>

              </Link>

              {/* CONTENT */}
              <div className="p-4 sm:p-6 flex flex-col grow">

                {/* NAME */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {tutor?.name}
                </h3>

                {/* PRICE */}
                <p className="text-xl sm:text-2xl font-black text-blue-600 mt-1">
                  ৳ {tutor?.fee}
                </p>

                {/* DETAILS */}
                <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">

                  <p>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      Subject:
                    </span>{" "}
                    {tutor?.subject}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      Start:
                    </span>{" "}
                    {tutor?.courseStartMonth}
                  </p>

                  <p>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      End:
                    </span>{" "}
                    {tutor?.courseEndMonth}
                  </p>

                </div>

                {/* BUTTON */}
                <Link
                  href={`/tutors/${tutor?._id}`}
                  className="
                    mt-5
                    w-full
                    text-center
                    py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                    font-semibold
                    hover:bg-blue-700
                    shadow-lg
                    shadow-blue-500/20
                    hover:shadow-blue-500/40
                    transition-all
                    duration-300
                    active:scale-95
                  "
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