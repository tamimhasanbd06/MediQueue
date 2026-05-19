"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // FETCH DATA
  useEffect(() => {
    fetchTutors();
  }, [searchText, startDate, endDate]);

  const fetchTutors = async () => {
    setLoading(true);

    try {
      const query = new URLSearchParams();

      if (searchText) {
        query.append("search", searchText);
      }

      if (startDate) {
        query.append("startDate", startDate);
      }

      if (endDate) {
        query.append("endDate", endDate);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors?${query.toString()}`,
        {
          cache: "no-store",
        }
      );

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

  // RESET FILTERS
  const handleReset = () => {
    setSearchText("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-blue-50 py-16 px-4 md:px-8">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-16">

        <p className="uppercase tracking-[6px] text-blue-600 font-semibold mb-4">
          MediQueue Tutors
        </p>

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          Find Your Perfect Tutor
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          Discover professional tutors, compare expertise,
          filter by course schedule, and book your learning
          sessions with ease.
        </p>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-7xl mx-auto mb-14">

        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 md:p-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            {/* SEARCH */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tutor / Course Name
              </label>

              <input
                type="text"
                placeholder="Search tutor or subject..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* START DATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* END DATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* RESET */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300"
              >
                Reset Filters
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center py-32">

          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        </div>
      ) : tutors?.length === 0 ? (

        /* EMPTY STATE */
        <div className="text-center py-28">

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Tutors Found
          </h2>

          <p className="text-gray-600">
            Try changing your search or filter options.
          </p>

        </div>

      ) : (

        /* TUTORS GRID */
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {tutors?.map((tutor) => (

            <div
              key={tutor?._id}
              className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
            >

              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">

                <Image
                  src={
                    tutor?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={tutor?.name || "Tutor"}
                  fill
                  sizes="100vw"
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute bottom-4 left-4">

                  <span className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg">
                    {tutor?.subject || "No Subject"}
                  </span>

                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">

                {/* NAME */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {tutor?.name || "Unknown Tutor"}
                </h2>

                {/* INSTITUTION */}
                <p className="text-gray-500 mb-5">
                  {tutor?.institution || "No Institution"}
                </p>

                {/* DETAILS */}
                <div className="space-y-3 mb-6">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Experience
                    </span>

                    <span className="text-gray-900 font-medium">
                      {tutor?.experience || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Teaching Mode
                    </span>

                    <span className="text-blue-600 font-medium">
                      {tutor?.teachingMode || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Available Time
                    </span>

                    <span className="text-gray-900 font-medium">
                      {tutor?.availableTime || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Total Seats
                    </span>

                    <span className="text-gray-900 font-medium">
                      {tutor?.totalSeats || 0}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Course Duration
                    </span>

                    <span className="text-gray-900 font-medium">
                      {tutor?.courseDuration || "N/A"}
                    </span>
                  </div>

                </div>

                {/* EXPERTISE */}
                <div className="mb-6">

                  <p className="text-gray-500 text-sm mb-2">
                    Expertise
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {tutor?.expertise || "No Expertise Added"}
                  </p>

                </div>

                {/* FOOTER */}
                <div className="mt-auto">

                  <div className="flex justify-between items-center mb-5">

                    <div>
                      <p className="text-gray-500 text-sm">
                        Session Fee
                      </p>

                      <h3 className="text-3xl font-black text-blue-600">
                        ৳ {tutor?.fee || 0}
                      </h3>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500 text-sm">
                        Location
                      </p>

                      <p className="text-gray-900 text-sm font-medium">
                        {tutor?.location || "Unknown"}
                      </p>
                    </div>

                  </div>

                  {/* BUTTON */}
                  <Link href={`/tutors/${tutor?._id}`}>

                    <button className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-blue-200">

                      Book Session

                    </button>

                  </Link>

                </div>
              </div>
            </div>

          ))}
        </div>
      )}
    </section>
  );
}