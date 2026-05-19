"use client";

import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FILTER STATES
  ========================= */
  const [searchText, setSearchText] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* =========================
     FETCH TUTORS
  ========================= */
  const fetchTutors = async () => {
    try {
      setLoading(true);

      if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is missing");
      }

      const res = await fetch(`${API_URL}/tutors`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tutors");
      }

      const data = await res.json();

      setTutors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Tutor Fetch Error:", error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  /* =========================
     FILTER DATA
  ========================= */
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchesSearch =
        tutor?.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesSubject =
        tutor?.subject
          ?.toLowerCase()
          .includes(subjectText.toLowerCase());

      const matchesStartDate = startDate
        ? tutor?.courseStartMonth
            ?.toLowerCase()
            .includes(startDate.toLowerCase())
        : true;

      const matchesEndDate = endDate
        ? tutor?.courseEndMonth
            ?.toLowerCase()
            .includes(endDate.toLowerCase())
        : true;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [tutors, searchText, subjectText, startDate, endDate]);

  /* =========================
     RESET FILTERS
  ========================= */
  const handleReset = () => {
    setSearchText("");
    setSubjectText("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      {/* =========================
          METADATA
      ========================= */}
      <Head>
        <title>Tutors | MediQueue</title>

        <meta
          name="description"
          content="Find professional tutors, filter by subject and course duration, and book sessions easily."
        />

        <meta
          name="keywords"
          content="Tutors, MediQueue, Online Tutors, Education, Learning"
        />

        <meta name="author" content="MediQueue" />
      </Head>

      <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-blue-50 py-16 px-4 md:px-8">

        {/* =========================
            HEADER
        ========================= */}
        <div className="max-w-7xl mx-auto text-center mb-16">

          <p className="uppercase tracking-[6px] text-blue-600 font-semibold mb-4">
            MediQueue Tutors
          </p>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Find Your Perfect Tutor
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Explore professional tutors and discover the perfect learning
            experience for your goals.
          </p>

        </div>

        {/* =========================
            FILTER SECTION
        ========================= */}
        <div className="max-w-7xl mx-auto mb-14">

          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 md:p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

              {/* TUTOR NAME */}
              <input
                type="text"
                placeholder="Search tutor..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* SUBJECT */}
              <input
                type="text"
                placeholder="Search subject..."
                value={subjectText}
                onChange={(e) => setSubjectText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* START DATE */}
              <input
                type="text"
                placeholder="Start month..."
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* END DATE */}
              <input
                type="text"
                placeholder="End month..."
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* RESET */}
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300"
              >
                Reset All
              </button>

            </div>

          </div>

        </div>

        {/* =========================
            LOADING
        ========================= */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
        ) : filteredTutors.length === 0 ? (
          <div className="text-center py-28">

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Tutors Found
            </h2>

            <p className="text-gray-600">
              Try changing your search or filter options.
            </p>

          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredTutors.map((tutor) => (
              <div
                key={tutor?._id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col group"
              >

                {/* IMAGE */}
                <Link href={`/tutors/${tutor?._id}`}>

                  <div className="relative h-72 overflow-hidden cursor-pointer">

                    <Image
                      src={
                        tutor?.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={tutor?.name || "Tutor"}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* SUBJECT BADGE */}
                    <div className="absolute top-4 left-4">

                      <span className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg">
                        {tutor?.subject || "No Subject"}
                      </span>

                    </div>

                  </div>

                </Link>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">

                  {/* NAME */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {tutor?.name || "Unknown Tutor"}
                  </h2>

                  {/* PRICE */}
                  <div className="mb-5">

                    <p className="text-sm text-gray-500 mb-1">
                      Session Fee
                    </p>

                    <h3 className="text-4xl font-black text-blue-600">
                      ৳ {tutor?.fee || 0}
                    </h3>

                  </div>

                  {/* DETAILS */}
                  <div className="space-y-3 mb-6">

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-500">
                        Subject
                      </span>

                      <span className="font-medium text-gray-900">
                        {tutor?.subject || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-500">
                        Start Month
                      </span>

                      <span className="font-medium text-gray-900">
                        {tutor?.courseStartMonth || "N/A"}
                      </span>

                    </div>

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-500">
                        End Month
                      </span>

                      <span className="font-medium text-gray-900">
                        {tutor?.courseEndMonth || "N/A"}
                      </span>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <button className="mt-auto w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition duration-300">
                    Book Session
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>
    </>
  );
}