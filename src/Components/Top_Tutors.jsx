"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchTutors = async () => {
    try {
      setLoading(true);

      if (!API_URL) {
        throw new Error("API URL missing");
      }

      const res = await fetch(`${API_URL}/tutors`, {
        cache: "no-store",
      });

      const data = await res.json();

      setTutors(Array.isArray(data) ? data.slice(0, 6) : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">

      {/* TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900">
          Featured Tutors
        </h1>
        <p className="text-gray-600 mt-3">
          Only top 6 tutors are shown here
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {tutors.map((tutor) => (
            <div
              key={tutor?._id}
              className="bg-white rounded-3xl shadow-lg border hover:shadow-2xl transition overflow-hidden flex flex-col"
            >

              {/* IMAGE */}
              <Link href={`/tutors/${tutor?._id}`}>
                <div className="relative h-72">

                  <Image
                    src={
                      tutor?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={tutor?.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-4 py-2 text-xs rounded-full">
                      {tutor?.subject}
                    </span>
                  </div>

                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">

                {/* NAME */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {tutor?.name}
                </h2>

                {/* FEE */}
                <h3 className="text-3xl font-black text-blue-600 mb-4">
                  ৳ {tutor?.fee}
                </h3>

                {/* SUBJECT */}
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Subject: </span>
                  {tutor?.subject}
                </div>

                {/* COURSE DATE */}
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Start: </span>
                  {tutor?.courseStartMonth}
                </div>

                <div className="text-sm text-gray-600 mb-5">
                  <span className="font-semibold">End: </span>
                  {tutor?.courseEndMonth}
                </div>

                {/* BUTTON */}
                <button className="mt-auto w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition">
                  Book Session
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}