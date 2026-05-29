"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { saveAuthToken } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { FaMapMarkerAlt, FaUniversity, FaChalkboardTeacher, FaClock, FaMoneyBillWave, FaUsers, FaBookOpen,} from "react-icons/fa";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMounted(true);
  }, []);

  const darkMode =
    mounted && document.documentElement.classList.contains("dark");

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

        const bookedRes = await fetch(`${API_URL}/booked-sessions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const bookedData = await bookedRes.json();
        const exists = bookedData.some((item) => item.tutorId === data._id);
        setAlreadyBooked(exists);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTutor();
    }
  }, [id, API_URL, router]);

  const handleBookSession = async () => {
    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/book-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tutorId: tutor._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      toast.success("Session booked successfully");
      setAlreadyBooked(true);

      setTutor((prev) => ({
        ...prev,
        totalSeats: Number(prev.totalSeats || 0) + 1,
      }));
    } catch (err) {
      console.log(err);
      toast.error("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FFF8F2] dark:bg-black transition-all duration-500">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tutor || error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FFF8F2] dark:bg-black text-center px-4 transition-all duration-500">
        <h1 className="text-3xl font-black text-red-500 mb-3">No Tutor Found</h1>
        <p className="text-gray-600 dark:text-blue-400">
          {error || "No tutors available on your requirements."}
        </p>

        <button onClick={() => router.push("/tutors")}
          className=" mt-6 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-600/10" >
          Back To Tutors
        </button>
      </div>
    );
  }

  const bookedStudents = Number(tutor.totalSeats || 0);
  const maxStudents = Number(tutor.maxStudents || 0);
  const remainingSeats = maxStudents - bookedStudents;
  const noSeats = remainingSeats <= 0;

  return (
    <>
      <title>Tutor Details</title>

      <div className="  min-h-screen transition-colors duration-500 p-4 md:p-8 bg-[#FFF8F2] dark:bg-black">
        <div className=" max-w-7xl mx-auto rounded-3xl overflow-hidden border shadow-xl transition-all duration-500 border-blue-500/20 bg-white dark:border-blue-400/20 dark:bg-zinc-950" >

          <div className="relative h-65 md:h-110">
            <Image
              src={tutor.photoURL}
              alt={tutor.name}
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>

            {/* TOP TAGS */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-xl bg-blue-600/90 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                {tutor.subject}
              </span>

              <span
                className={`
                  px-4 py-1.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-sm backdrop-blur-md
                  ${noSeats ? "bg-red-500/90" : "bg-emerald-500/90"}
                `}
              >
                {noSeats ? "No Seats" : `${remainingSeats} Seats Left`}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-xs">
                {tutor.name}
              </h1>

              <p className="text-base md:text-lg text-blue-400 font-medium mt-2 drop-shadow-xs">
                {tutor.institution}
              </p>
            </div>
          </div>

          <div className="p-5 md:p-10">
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* FULL FEE CARD */}
              <div className="p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] bg-white border-blue-500/20 dark:bg-zinc-900/50 dark:border-blue-400/20 shadow-[0_4px_20px_rgba(59,130,246,0.03)]">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                  Full Course Fee
                </p>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                  ৳ {tutor.fee}
                </h2>
              </div>

              <div className="p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] bg-white border-blue-500/20 dark:bg-zinc-900/50 dark:border-blue-400/20 shadow-[0_4px_20px_rgba(59,130,246,0.03)]">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                  Enrolled Students
                </p>
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                  {bookedStudents} <span className="text-lg text-gray-400 font-normal">/ {maxStudents}</span>
                </h2>
              </div>

              <div className="p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] bg-white border-blue-500/20 dark:bg-zinc-900/50 dark:border-blue-400/20 shadow-[0_4px_20px_rgba(59,130,246,0.03)]">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                  Available Seats
                </p>
                <h2
                  className={` text-4xl font-black ${noSeats ? "text-red-500" : "text-emerald-500"} `}>
                  {remainingSeats > 0 ? remainingSeats : 0}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card icon={<FaBookOpen />} label="Subject" value={tutor.subject} />
              <Card icon={<FaChalkboardTeacher />} label="Experience" value={tutor.experience} />
              <Card icon={<FaClock />} label="Available Time" value={tutor.availableTime} />
              <Card icon={<FaClock />} label="Available Days" value={tutor.availableDays} />
              <Card icon={<FaUniversity />} label="Institution" value={tutor.institution} />
              <Card icon={<FaMapMarkerAlt />} label="Location" value={tutor.location} />
              <Card icon={<FaMoneyBillWave />} label="Hourly Fee" value={`৳${tutor.hourlyFee}`} />
              <Card icon={<FaUsers />} label="Booked Students" value={bookedStudents} />
              <Card icon={<FaUsers />} label="Max Students" value={maxStudents} />
              <Card icon={<FaClock />} label="Course Duration" value={tutor.courseDuration} />
              <Card icon={<FaClock />} label="Course Period" value={`${tutor.courseStartMonth} - ${tutor.courseEndMonth}`} />
              <Card icon={<FaMoneyBillWave />} label="Full Fee" value={`৳${tutor.fee}`} />
            </div>

            <div className="mt-12 flex flex-col lg:flex-row gap-5">
              <button onClick={handleBookSession} disabled={bookingLoading || alreadyBooked || noSeats}
                className={` flex-1 py-4 px-6 rounded-2xl font-bold text-base tracking-wide
                  transition-all duration-300 shadow-md active:scale-[0.98]
                  ${ bookingLoading || alreadyBooked || noSeats ? "bg-gray-300 dark:bg-zinc-800 text-gray-500 dark:text-zinc-500 cursor-not-allowed shadow-none" : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.01] shadow-blue-600/10 hover:shadow-blue-600/20" } `} >
                {bookingLoading ? "Booking..." : alreadyBooked ? "Already Booked" : noSeats ? "No Seats Available" : "Book Session"}
              </button>

              <button onClick={() => router.push("/tutors")}
                className=" flex-1 py-4 px-6 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 active:scale-[0.98] hover:scale-[1.01] border-2 border-blue-600/30 text-blue-600 bg-white hover:bg-blue-50/50 dark:border-blue-400/30 dark:text-blue-400 dark:bg-zinc-900/20 dark:hover:bg-blue-950/20 shadow-xs " >
                Go Back
              </button>

              <button onClick={() => router.push("/booked-sessions")}
                className=" flex-1 py-4 px-6 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 active:scale-[0.98] hover:scale-[1.01] border-2 border-blue-600/30 text-blue-600 bg-white hover:bg-blue-50/50 dark:border-blue-400/30 dark:text-blue-400 dark:bg-zinc-900/20 dark:hover:bg-blue-950/20 shadow-xs">
                My Sessions
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

function Card({ icon, label, value }) {
  return (
    <div className=" p-5 rounded-2xl border flex items-center gap-4 transition-all duration-300 hover:scale-[1.01] bg-white border-blue-500/10 dark:bg-zinc-900/30 dark:border-blue-400/10 shadow-[0_2px_12px_rgba(59,130,246,0.01)]" >
      <div
        className="
          min-w-12.5 h-12.5
          rounded-xl flex items-center justify-center text-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 " >
        {icon}
      </div>

      {/* TEXT MODULE */}
      <div className="overflow-hidden">
        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {label}
        </p>

        <h3 className="text-base font-bold text-gray-800 dark:text-zinc-200 mt-0.5 truncate">
          {value || "Not Available"}
        </h3>
      </div>
    </div>
  );
}