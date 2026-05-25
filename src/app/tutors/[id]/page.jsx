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
  FaCalendarAlt,
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);

        const token =
          localStorage.getItem("token") ||
          (await saveAuthToken());

        if (!token) {
          router.push("/login");
          return;
        }

        const authRes = await fetch(`${API_URL}/auth/check`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authRes.status === 401) {
          router.push("/login");
          return;
        }

        const res = await fetch(`${API_URL}/tutors/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setTutor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold text-xl">{error}</p>
        <button
          onClick={() => router.push("/tutors")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-100 py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HERO */}
        <div className="relative">
          <Image
            src={tutor.photoURL}
            alt={tutor.name}
            width={1200}
            height={500}
            className="w-full h-90 object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30" />

          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold">{tutor.name}</h1>
            <p className="text-lg text-blue-200 flex items-center gap-2 mt-1">
              <FaBookOpen /> {tutor.subject}
            </p>
          </div>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-3 p-6 border-b">
          <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
            <FaMapMarkerAlt /> {tutor.location}
          </span>

          <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            <FaUniversity /> {tutor.institution}
          </span>

          <span className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">
            <FaChalkboardTeacher /> {tutor.teachingMode}
          </span>

          <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
            <FaUsers /> {tutor.experience}
          </span>
        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-3 gap-6 p-6">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">

            {/* INFO CARD */}
            <div className="bg-gray-50 border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Tutor Details</h2>

              <div className="grid grid-cols-2 gap-5 text-gray-700">

                <p className="flex items-center gap-2">
                  <FaBookOpen /> <b>Subject:</b> {tutor.subject}
                </p>

                <p className="flex items-center gap-2">
                  <FaBookOpen /> <b>Expertise:</b> {tutor.expertise}
                </p>

                <p className="flex items-center gap-2">
                  <FaCalendarAlt /> <b>Days:</b> {tutor.availableDays}
                </p>

                <p className="flex items-center gap-2">
                  <FaClock /> <b>Time:</b> {tutor.availableTime}
                </p>

                <p className="flex items-center gap-2">
                  <FaCalendarAlt /> <b>Duration:</b> {tutor.courseDuration}
                </p>

                <p className="flex items-center gap-2">
                  <FaCalendarAlt /> <b>Session:</b>{" "}
                  {tutor.courseStartMonth} - {tutor.courseEndMonth}
                </p>

              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4">

              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
                <FaMoneyBillWave className="mx-auto text-blue-600 text-xl" />
                <p className="text-gray-500 mt-2">Hourly Fee</p>
                <h3 className="text-2xl font-bold">৳{tutor.hourlyFee}</h3>
              </div>

              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
                <FaUsers className="mx-auto text-green-600 text-xl" />
                <p className="text-gray-500 mt-2">Seats</p>
                <h3 className="text-2xl font-bold">{tutor.totalSeats}</h3>
              </div>

              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
                <FaUsers className="mx-auto text-purple-600 text-xl" />
                <p className="text-gray-500 mt-2">Max Students</p>
                <h3 className="text-2xl font-bold">{tutor.maxStudents}</h3>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* PRICE CARD */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl text-center">
              <FaMoneyBillWave className="mx-auto text-2xl mb-2" />
              <p className="text-sm">Course Fee</p>
              <h2 className="text-4xl font-bold">৳{tutor.fee}</h2>
            </div>

            {/* QUICK INFO */}
            <div className="bg-gray-50 border rounded-2xl p-5 space-y-2 text-sm">
              <h3 className="font-bold text-lg mb-2">Quick Info</h3>

              <p>📍 {tutor.location}</p>
              <p>🏫 {tutor.institution}</p>
              <p>💻 {tutor.teachingMode}</p>
            </div>

            {/* CTA */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg">
              Book Session
            </button>

            <button
              onClick={() => router.push("/tutors")}
              className="w-full border py-3 rounded-2xl font-semibold hover:bg-gray-100"
            >
              Go Back
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}