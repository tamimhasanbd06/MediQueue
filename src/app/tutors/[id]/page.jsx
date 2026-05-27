"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { saveAuthToken } from "@/lib/auth-client";

import {
  FaMapMarkerAlt,
  FaUniversity,
  FaChalkboardTeacher,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMounted(true);
  }, []);

  // USE NAVBAR / GLOBAL DARK MODE
  const darkMode =
    mounted &&
    document.documentElement.classList.contains("dark");

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);

        let token = localStorage.getItem("token");

        if (!token) {
          token = await saveAuthToken();
        }

        if (!token) {
          return router.push("/login");
        }

        const res = await fetch(`${API_URL}/tutors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          return router.push("/login");
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Tutor not found");
        }

        setTutor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTutor();
    }
  }, [id, API_URL, router]);

  // LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-[#020817] transition-all duration-500">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ERROR
  if (!tutor || error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020817] text-center px-4 transition-all duration-500">
        <h1 className="text-3xl font-black text-red-500 mb-3">
          No Tutor Found
        </h1>

        <p className="text-gray-600 dark:text-blue-300">
          {error || "No tutors available on your requirements."}
        </p>

        <button
          onClick={() => router.push("/tutors")}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105"
        >
          Back To Tutors
        </button>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen transition-all duration-500 p-4 md:p-8
        bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#020817] dark:to-blue-950
      `}
    >
      <div
        className={`
          max-w-7xl mx-auto rounded-3xl overflow-hidden border
          shadow-2xl transition-all duration-500
          border-gray-200 bg-white
          dark:border-blue-600/30 dark:bg-black/40
        `}
      >
        {/* HERO */}
        <div className="relative h-[260px] md:h-[420px]">
          <Image
            src={tutor.photoURL}
            alt={tutor.name}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-sm font-bold mb-4">
              {tutor.subject}
            </span>

            <h1 className="text-3xl md:text-5xl font-black">
              {tutor.name}
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-8">
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card
              icon={<FaBookOpen />}
              label="Subject"
              value={tutor.subject}
            />

            <Card
              icon={<FaChalkboardTeacher />}
              label="Experience"
              value={tutor.experience}
            />

            <Card
              icon={<FaClock />}
              label="Available Time"
              value={tutor.availableTime}
            />

            <Card
              icon={<FaClock />}
              label="Available Days"
              value={tutor.availableDays}
            />

            <Card
              icon={<FaUniversity />}
              label="Institution"
              value={tutor.institution}
            />

            <Card
              icon={<FaMapMarkerAlt />}
              label="Location"
              value={tutor.location}
            />

            <Card
              icon={<FaMoneyBillWave />}
              label="Hourly Fee"
              value={`৳${tutor.hourlyFee}`}
            />

            <Card
              icon={<FaUsers />}
              label="Total Seats"
              value={tutor.totalSeats}
            />

            <Card
              icon={<FaUsers />}
              label="Max Students"
              value={tutor.maxStudents}
            />

            <Card
              icon={<FaClock />}
              label="Course Duration"
              value={tutor.courseDuration}
            />

            <Card
              icon={<FaClock />}
              label="Course Period"
              value={`${tutor.courseStartMonth} - ${tutor.courseEndMonth}`}
            />

            <Card
              icon={<FaMoneyBillWave />}
              label="Full Fee"
              value={`৳${tutor.fee}`}
            />
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <button
              className="
                flex-1 py-4 rounded-2xl
                bg-blue-600 hover:bg-blue-700
                text-white font-bold text-lg
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              Book Session
            </button>

            <button
              onClick={() => router.push("/tutors")}
              className="
                flex-1 py-4 rounded-2xl
                border-2 border-blue-500
                text-blue-600 dark:text-blue-400
                font-bold text-lg
                hover:bg-blue-50
                dark:hover:bg-blue-900/20
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ icon, label, value }) {
  return (
    <div
      className="
        p-5 rounded-2xl border
        flex items-center gap-4
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-xl

        bg-white border-gray-200
        dark:bg-[#0B1120]/80
        dark:border-blue-900/40
      "
    >
      {/* ICON */}
      <div
        className="
          min-w-[55px] h-[55px]
          rounded-2xl
          flex items-center justify-center
          text-xl

          bg-blue-100 text-blue-600
          dark:bg-blue-900/30
          dark:text-blue-400
        "
      >
        {icon}
      </div>

      {/* TEXT */}
      <div>
        {/* LABEL */}
        <p className="text-sm font-semibold text-blue-500 dark:text-blue-400">
          {label}
        </p>

        {/* VALUE */}
        <h3
          className="
            text-lg font-bold break-words
            text-gray-900
            dark:text-blue-300
          "
        >
          {value || "Not Available"}
        </h3>
      </div>
    </div>
  );
}