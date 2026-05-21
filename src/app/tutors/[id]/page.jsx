"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

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
        setError("");

        const res = await fetch(`${API_URL}/tutors/${id}`, {
          method: "GET",
          credentials: "include", // 🔥 IMPORTANT FOR JWT COOKIE
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        // ❌ Unauthorized → backend JWT fail হলে এখানে আসবে
        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error(data?.message || "Tutor not found");
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
  }, [id, API_URL, router]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error || !tutor) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold text-xl mb-3">
          {error || "Tutor not found"}
        </p>

        <button
          onClick={() => router.push("/tutors")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* IMAGE */}
        <div className="relative h-80 w-full">
          <Image
            src={tutor.photoURL}
            alt={tutor.name}
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-4">

          <h1 className="text-3xl font-bold">
            {tutor.name}
          </h1>

          <p className="text-gray-600">
            {tutor.subject}
          </p>

          <p className="text-2xl font-bold text-blue-600">
            ৳ {tutor.fee}
          </p>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
            Book Session
          </button>

        </div>

      </div>
    </section>
  );
}