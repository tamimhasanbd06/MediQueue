
"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { saveAuthToken, useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { FaMapMarkerAlt, FaUniversity, FaChalkboardTeacher, FaClock, FaMoneyBillWave, FaUsers, FaBookOpen, FaPhoneAlt, FaUserGraduate, FaTimes } from "react-icons/fa";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({ studentName: "", phone: "" });
  const [countryCode, setCountryCode] = useState("+880");
  const [errorModal, setErrorModal] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const countries = [
    { code: "+880", name: "Bangladesh", length: 10 },
    { code: "+1", name: "United States", length: 10 },
    { code: "+44", name: "United Kingdom", length: 10 },
    { code: "+91", name: "India", length: 10 },
    { code: "+92", name: "Pakistan", length: 10 },
    { code: "+966", name: "Saudi Arabia", length: 9 },
    { code: "+971", name: "UAE", length: 9 },
    { code: "+60", name: "Malaysia", length: 9 },
    { code: "+65", name: "Singapore", length: 8 },
    { code: "+61", name: "Australia", length: 9 }
  ];

  useEffect(() => {
    document.title = tutor?.name ? `MediQueue | ${tutor.name}` : "MediQueue | Tutor Details";
  }, [tutor?.name]);

  useEffect(() => {
    if (session?.user) {
      setBookingForm((prev) => ({
        ...prev,
        studentName: prev.studentName || session.user.name || "",
      }));
    }
  }, [session?.user]);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        setLoading(true);
        let token = localStorage.getItem("token");

        if (!token) token = await saveAuthToken();
        if (!token) return router.push("/login");

        const res = await fetch(`${API_URL}/tutors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          return router.push("/login");
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Tutor not found");

        setTutor(data);

        const bookedRes = await fetch(`${API_URL}/booked-sessions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookedData = await bookedRes.json();
        const exists = Array.isArray(bookedData) && bookedData.some((item) => item.tutorId === data._id && item.status !== "cancelled");
        setAlreadyBooked(exists);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTutor();
  }, [id, API_URL, router]);

  const availableSlots = useMemo(() => Number(tutor?.totalSeats ?? tutor?.totalSlot ?? tutor?.availableSlots ?? 0), [tutor]);
  const maxStudents = useMemo(() => Number(tutor?.maxStudents ?? tutor?.totalSlotLimit ?? availableSlots), [tutor, availableSlots]);
  const bookedStudents = Math.max(maxStudents - availableSlots, 0);
  const noSeats = availableSlots <= 0;
  const sessionStartDate = tutor?.sessionStartDate ? String(tutor.sessionStartDate).slice(0, 10) : "";
  const bookingNotStarted = sessionStartDate && new Date().toISOString().slice(0, 10) < sessionStartDate;

  const handleOpenBooking = () => {
    if (bookingNotStarted) return toast.error("Booking is not available yet for this tutor");
    if (noSeats) return toast.error("This session is fully booked. You can’t join at the moment.");
    if (alreadyBooked) return toast.error("You already booked this session");
    setCountryCode("+880");
    setBookingForm((prev) => ({ ...prev, phone: "" }));
    setBookingModal(true);
  };

  const handleBookSession = async (e) => {
    e.preventDefault();

    if (!bookingForm.studentName.trim()) return toast.error("Student name required");
    if (!bookingForm.phone.trim()) return toast.error("Phone number required");

    const currentCountry = countries.find((c) => c.code === countryCode);
    if (currentCountry && bookingForm.phone.length < currentCountry.length) {
      setErrorModal(true);
      return;
    }

    try {
      setBookingLoading(true);
      let token = localStorage.getItem("token");
      if (!token) token = await saveAuthToken();
      if (!token) return router.push("/login");

      const res = await fetch(`${API_URL}/book-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tutorId: tutor._id,
          tutorName: tutor.name,
          studentName: bookingForm.studentName,
          phone: `${countryCode}${bookingForm.phone}`,
          studentEmail: session?.user?.email || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Booking failed");

      toast.success("Session booked successfully");
      setAlreadyBooked(true);
      setBookingModal(false);
      setTutor((prev) => ({
        ...prev,
        totalSeats: Math.max(Number(prev?.totalSeats ?? prev?.totalSlot ?? 0) - 1, 0),
        totalSlot: Math.max(Number(prev?.totalSeats ?? prev?.totalSlot ?? 0) - 1, 0),
        availableSlots: Math.max(Number(prev?.totalSeats ?? prev?.totalSlot ?? 0) - 1, 0),
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
        <p className="text-gray-600 dark:text-blue-400">{error || "No tutors available on your requirements."}</p>
        <button onClick={() => router.push("/tutors")} className="mt-6 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-blue-600/10">
          Back To Tutors
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen transition-colors duration-500 p-4 md:p-8 bg-[#FFF8F2] dark:bg-black">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border shadow-xl transition-all duration-500 border-blue-500/20 bg-white dark:border-blue-400/20 dark:bg-zinc-950">
          <div className="relative h-65 md:h-110">
            <Image src={tutor.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt={tutor.name || "Tutor"} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>
            <div className="absolute top-6 left-6 flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-xl bg-blue-600/90 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider shadow-sm">{tutor.subject}</span>
              <span className={`px-4 py-1.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-sm backdrop-blur-md ${noSeats ? "bg-red-500/90" : "bg-emerald-500/90"}`}>
                {noSeats ? "No Seats" : `${availableSlots} Seats Left`}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-xs">{tutor.name}</h1>
              <p className="text-base md:text-lg text-blue-400 font-medium mt-2 drop-shadow-xs">{tutor.institution}</p>
            </div>
          </div>

          <div className="p-5 md:p-10">
            {bookingNotStarted && (
              <div className="mb-8 rounded-2xl border border-amber-400/30 bg-amber-50 dark:bg-amber-950/20 p-4 text-amber-700 dark:text-amber-300 font-bold text-sm">
                Booking is not available yet for this tutor. Session starts on {sessionStartDate}.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <InfoCard title="Full Course Fee" value={`৳ ${tutor.fee || 0}`} />
              <InfoCard title="Enrolled Students" value={`${bookedStudents} / ${maxStudents}`} />
              <InfoCard title="Available Seats" value={availableSlots > 0 ? availableSlots : 0} danger={noSeats} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card icon={<FaBookOpen />} label="Subject" value={tutor.subject} />
              <Card icon={<FaChalkboardTeacher />} label="Experience" value={tutor.experience} />
              <Card icon={<FaClock />} label="Available Time" value={tutor.availableTime} />
              <Card icon={<FaClock />} label="Available Days" value={tutor.availableDays} />
              <Card icon={<FaUniversity />} label="Institution" value={tutor.institution} />
              <Card icon={<FaMapMarkerAlt />} label="Location" value={tutor.location} />
              <Card icon={<FaMoneyBillWave />} label="Hourly Fee" value={`৳${tutor.hourlyFee || 0}`} />
              <Card icon={<FaUsers />} label="Booked Students" value={bookedStudents} />
              <Card icon={<FaUsers />} label="Available Slots" value={availableSlots} />
              <Card icon={<FaClock />} label="Session Start Date" value={sessionStartDate || "N/A"} />
              <Card icon={<FaClock />} label="Course Duration" value={tutor.courseDuration || "Flexible"} />
              <Card icon={<FaMoneyBillWave />} label="Full Fee" value={`৳${tutor.fee || 0}`} />
            </div>

            <div className="mt-12 flex flex-col lg:flex-row gap-5">
              <button onClick={handleOpenBooking} disabled={bookingLoading || alreadyBooked || noSeats || bookingNotStarted} className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 shadow-md active:scale-[0.98] ${bookingLoading || alreadyBooked || noSeats || bookingNotStarted ? "bg-gray-300 dark:bg-zinc-800 text-gray-500 dark:text-zinc-500 cursor-not-allowed shadow-none" : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.01] shadow-blue-600/10 hover:shadow-blue-600/20"}`}>
                {bookingLoading ? "Booking..." : alreadyBooked ? "Already Booked" : noSeats ? "No Seats Available" : bookingNotStarted ? "Booking Not Available Yet" : "Book Session"}
              </button>
              <button onClick={() => router.push("/tutors")} className="flex-1 py-4 px-6 rounded-2xl border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-base hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300">
                Back To Tutors
              </button>
            </div>
          </div>
        </div>
      </div>

      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <form onSubmit={handleBookSession} className="w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-950 border border-blue-500/20 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-blue-600 dark:text-blue-400">Book Session</h2>
              <button type="button" onClick={() => setBookingModal(false)} className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-300">
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModalInput icon={<FaUserGraduate />} label="Student Name" value={bookingForm.studentName} onChange={(value) => setBookingForm((prev) => ({ ...prev, studentName: value }))} />
              
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Phone</span>
                <div className="flex items-center rounded-2xl border bg-gray-50 border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden focus-within:border-blue-500 transition-colors">
                  <div className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-800 shrink-0">
                    <span className="text-blue-600 dark:text-blue-400"><FaPhoneAlt /></span>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent text-sm font-bold text-gray-900 dark:text-white outline-none cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, "") }))}
                    placeholder="Enter phone number"
                    className="w-full bg-transparent px-4 py-3 outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </label>

              <ModalInput label="Tutor ID" value={tutor._id} readOnly />
              <ModalInput label="Tutor Name" value={tutor.name} readOnly />
              <ModalInput label="Student Email" value={session?.user?.email || ""} readOnly className="md:col-span-2" />
            </div>
            <button type="submit" disabled={bookingLoading} className="mt-6 w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-300 disabled:opacity-60">
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      )}

      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-950 border border-red-500/20 p-6 shadow-2xl text-center">
            <h2 className="text-xl font-black text-red-500 mb-3">Invalid Number</h2>
            <p className="text-gray-600 dark:text-zinc-400 mb-6 font-medium">
              Please submit correct a number and number will be correct length
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-300 shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function InfoCard({ title, value, danger }) {
  return (
    <div className="p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] bg-white border-blue-500/20 dark:bg-zinc-900/50 dark:border-blue-400/20 shadow-[0_4px_20px_rgba(59,130,246,0.03)]">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">{title}</p>
      <h2 className={`text-4xl font-black ${danger ? "text-red-500" : "text-gray-900 dark:text-white"}`}>{value}</h2>
    </div>
  );
}

function Card({ icon, label, value }) {
  return (
    <div className="p-5 rounded-2xl border bg-white border-blue-500/20 dark:bg-zinc-900/40 dark:border-blue-400/20 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2 text-blue-600 dark:text-blue-400">{icon}<span className="text-xs font-bold uppercase tracking-wider">{label}</span></div>
      <p className="font-bold text-gray-900 dark:text-white break-words">{value || "N/A"}</p>
    </div>
  );
}

function ModalInput({ icon, label, value, onChange, readOnly, className = "" }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl px-4 py-3 border bg-gray-50 border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
        {icon && <span className="text-blue-600 dark:text-blue-400">{icon}</span>}
        <input value={value} readOnly={readOnly} onChange={(e) => onChange?.(e.target.value)} className="w-full bg-transparent outline-none text-gray-900 dark:text-white" />
      </div>
    </label>
  );
}

