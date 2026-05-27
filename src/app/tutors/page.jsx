"use client";

import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [subjectText, setSubjectText] = useState("");

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  // GLOBAL DARK MODE
  const [mounted, setMounted] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMounted(true);
  }, []);

  const darkMode =
    mounted &&
    document.documentElement.classList.contains("dark");

  const fetchTutors = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/tutors`);
      const data = await res.json();

      setTutors(Array.isArray(data) ? data : []);
    } catch {
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const filtered = useMemo(() => {
    return tutors.filter((t) => {
      return (
        t?.name?.toLowerCase().includes(searchText.toLowerCase()) &&
        t?.subject?.toLowerCase().includes(subjectText.toLowerCase()) &&
        (startMonth ? t?.courseStartMonth === startMonth : true) &&
        (endMonth ? t?.courseEndMonth === endMonth : true)
      );
    });
  }, [tutors, searchText, subjectText, startMonth, endMonth]);

  const resetAll = () => {
    setSearchText("");
    setSubjectText("");
    setStartMonth("");
    setEndMonth("");
  };

  return (
    <>
      <Head>
        <title>Tutors Page</title>
      </Head>

      {/* MAIN SECTION */}
      <section
        className="
          min-h-screen px-4 md:px-10 py-14
          transition-all duration-500

          bg-gray-50
          dark:bg-gradient-to-br
          dark:from-black
          dark:via-[#020817]
          dark:to-blue-950
        "
      >
        {/* SECTION TITLE */}
        <div className="text-center mb-14">
          <h1
            className="
              text-4xl md:text-6xl
              font-black
              text-blue-600
              mb-4
            "
          >
            Find Your Tutor
          </h1>

          <p
            className="
              text-base md:text-lg
              text-gray-600
              dark:text-blue-300
              max-w-2xl mx-auto
            "
          >
            Search and filter professional tutors easily with premium learning experience
          </p>
        </div>

        {/* FILTER SECTION */}
        <div
          className="
            max-w-7xl mx-auto mb-14
            rounded-3xl p-5 md:p-7
            border transition-all duration-500

            bg-white border-gray-200 shadow-lg
            dark:bg-black/40
            dark:border-blue-500/20
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* NAME */}
            <input
              placeholder="Tutor name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`
                p-3 rounded-2xl border outline-none transition-all duration-300

                ${
                  darkMode
                    ? "bg-[#0B1120]/80 border-blue-900/40 text-blue-300 placeholder:text-blue-400"
                    : "bg-white border-blue-200 text-gray-900"
                }
              `}
            />

            {/* SUBJECT */}
            <input
              placeholder="Subject"
              value={subjectText}
              onChange={(e) => setSubjectText(e.target.value)}
              className={`
                p-3 rounded-2xl border outline-none transition-all duration-300

                ${
                  darkMode
                    ? "bg-[#0B1120]/80 border-blue-900/40 text-blue-300 placeholder:text-blue-400"
                    : "bg-white border-blue-200 text-gray-900"
                }
              `}
            />

            {/* START MONTH */}
            <select
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className={`
                p-3 rounded-2xl border outline-none transition-all duration-300

                ${
                  darkMode
                    ? "bg-[#0B1120]/80 border-blue-900/40 text-blue-300"
                    : "bg-white border-blue-200 text-gray-900"
                }
              `}
            >
              <option value="">Start Month</option>

              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {/* END MONTH */}
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className={`
                p-3 rounded-2xl border outline-none transition-all duration-300

                ${
                  darkMode
                    ? "bg-[#0B1120]/80 border-blue-900/40 text-blue-300"
                    : "bg-white border-blue-200 text-gray-900"
                }
              `}
            >
              <option value="">End Month</option>

              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            {/* RESET BUTTON */}
            <button
              onClick={resetAll}
              className="
                rounded-2xl
                bg-blue-600 hover:bg-blue-700
                text-white font-bold
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              Reset
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          /* NO DATA */
          <div className="text-center py-20">
            <h2 className="text-3xl font-black text-blue-600 mb-3">
              No Tutors Available
            </h2>

            <p className="text-gray-600 dark:text-blue-300">
              No tutors available on your requirements.
            </p>
          </div>
        ) : (
          /* GRID */
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((tutor) => (
              <Link key={tutor?._id} href={`/tutors/${tutor?._id}`}>
                <div
                  className="
                    rounded-3xl overflow-hidden border
                    transition-all duration-500
                    hover:scale-[1.02]
                    hover:shadow-2xl

                    bg-white border-gray-200 shadow-md
                    dark:bg-black/40
                    dark:border-blue-900/40
                  "
                >
                  {/* IMAGE */}
                  <div className="relative h-64">
                    <Image
                      src={tutor?.photoURL}
                      alt={tutor?.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 space-y-3">
                    <h2 className="text-2xl font-black text-blue-600">
                      {tutor?.name}
                    </h2>

                    <p className="text-3xl font-black text-gray-900 dark:text-blue-300">
                      ৳ {tutor?.fee}
                    </p>

                    <p className="text-gray-600 dark:text-blue-300">
                      {tutor?.subject}
                    </p>

                    <p className="text-sm font-medium text-blue-500">
                      {tutor?.courseStartMonth} -{" "}
                      {tutor?.courseEndMonth}
                    </p>

                    <button
                      className="
                        w-full mt-4 py-3 rounded-2xl
                        bg-blue-600 hover:bg-blue-700
                        text-white font-bold
                        transition-all duration-300
                      "
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}