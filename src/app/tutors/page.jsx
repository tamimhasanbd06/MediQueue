"use client";

import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* FETCH */
  const fetchTutors = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/tutors`, {
        cache: "no-store",
      });

      const data = await res.json();
      setTutors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  /* FILTER */
  const filtered = useMemo(() => {
    return tutors.filter((t) => {
      return (
        t?.name?.toLowerCase().includes(searchText.toLowerCase()) &&
        t?.subject?.toLowerCase().includes(subjectText.toLowerCase()) &&
        t?.courseStartMonth?.toLowerCase().includes(startMonth.toLowerCase()) &&
        t?.courseEndMonth?.toLowerCase().includes(endMonth.toLowerCase())
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
        <meta name="description" content="Find best tutors easily" />
      </Head>

      <section className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50 px-4 md:px-10 py-14">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            Find Your Perfect Tutor
          </h1>
          <p className="text-gray-600 mt-3">
            Search, filter and book your learning session
          </p>
        </div>

        {/* FILTER */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <input
              placeholder="Tutor name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="p-3 rounded-xl border bg-white"
            />

            <input
              placeholder="Subject"
              value={subjectText}
              onChange={(e) => setSubjectText(e.target.value)}
              className="p-3 rounded-xl border bg-white"
            />

            <input
              placeholder="Start month"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="p-3 rounded-xl border bg-white"
            />

            <input
              placeholder="End month"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="p-3 rounded-xl border bg-white"
            />

            <button
              onClick={resetAll}
              className="bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
            >
              Reset
            </button>

          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filtered.map((tutor) => (
              <Link key={tutor?._id} href={`/tutors/${tutor?._id}`}>

                <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer">

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
                  <div className="p-5 space-y-2">

                    <h2 className="text-xl font-bold">{tutor?.name}</h2>

                    <p className="text-blue-600 font-black text-2xl">
                      ৳ {tutor?.fee}
                    </p>

                    <p className="text-sm text-gray-600">
                      {tutor?.subject}
                    </p>

                    <p className="text-sm text-gray-500">
                      {tutor?.courseStartMonth} - {tutor?.courseEndMonth}
                    </p>

                    <button className="w-full mt-3 bg-blue-600 text-white py-3 rounded-xl font-bold">
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