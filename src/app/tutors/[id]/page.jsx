"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function TutorDetailsPage() {
  const { id } = useParams();
  // console.log(id,"id")
  const router = useRouter();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API_URL) {
          throw new Error("API URL missing");
        }

        const res = await fetch(`${API_URL}/tutors/${id}`);

        const data = await res.json();
        console.log(data,"data")

        if (!res.ok) {
          throw new Error(data?.error || "Tutor not found");
        }

        setTutor(data);
      } catch (err) {
        setError(err.message);
        setTutor(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id, API_URL]);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error || !tutor) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-red-500 mb-2">
          Tutor Not Found
        </h1>
        <p className="text-gray-600 mb-5">{error}</p>

        <button
          onClick={() => router.push("/tutors")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-gray-50 to-white py-10 px-4 md:px-10">

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">

        {/* IMAGE SECTION */}
        <div className="relative w-full h-72 md:h-[420px]">

          <Image
            src={tutor.photoURL}
            alt={tutor.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* BACK BUTTON */}
          <button
            onClick={() => router.back()}
            className="absolute top-5 left-5 bg-white/80 hover:bg-white px-4 py-2 rounded-xl font-semibold"
          >
            ← Back
          </button>

          {/* TITLE */}
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl md:text-4xl font-black">
              {tutor.name}
            </h1>
            <p className="text-blue-300 font-semibold">
              {tutor.subject}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10">

          {/* PRICE + BUTTON */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

            <div>
              <p className="text-gray-500">Session Fee</p>
              <h2 className="text-4xl font-black text-blue-600">
                ৳ {tutor.fee || 0}
              </h2>
            </div>

            <button className="px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition">
              Book Session
            </button>

          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Info label="Subject" value={tutor.subject} />
            <Info label="Hourly Fee" value={tutor.hourlyFee} />
            <Info label="Experience" value={tutor.experience} />
            <Info label="Institution" value={tutor.institution} />
            <Info label="Location" value={tutor.location} />
            <Info label="Teaching Mode" value={tutor.teachingMode} />
            <Info label="Available Days" value={tutor.availableDays} />
            <Info label="Available Time" value={tutor.availableTime} />
            <Info label="Course Duration" value={tutor.courseDuration} />
            <Info label="Start Month" value={tutor.courseStartMonth} />
            <Info label="End Month" value={tutor.courseEndMonth} />
            <Info label="Total Seats" value={tutor.totalSeats} />
            <Info label="Max Students" value={tutor.maxStudents} />
            <Info label="Expertise" value={tutor.expertise} />

          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================
   INFO COMPONENT
========================= */
function Info({ label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">
        {value || "N/A"}
      </p>
    </div>
  );
}