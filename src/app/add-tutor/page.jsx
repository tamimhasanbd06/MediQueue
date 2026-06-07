
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FaUser, FaImage, FaBook, FaClock, FaMoneyBill, FaCalendar, FaUniversity, FaMapMarkerAlt, FaChalkboardTeacher, FaLayerGroup, FaLink } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSession, saveAuthToken } from "@/lib/auth-client";

export default function AddTutorPage() {
  useEffect(() => {
    document.title = "MediQueue | Add Tutor";
  }, []);

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const LOCAL_STORAGE_KEY = "addTutorForm";

  useEffect(() => { setMounted(true); }, []);

  const darkMode = mounted && document.documentElement.classList.contains("dark");

  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    subject: "",
    availableDays: "",
    availableTime: "",
    hourlyFee: "",
    totalSeats: "",
    sessionStartDate: "",
    courseStartMonth: "",
    courseEndMonth: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "",
    expertise: "",
    fee: "",
    maxStudents: "",
    courseDuration: "",
  });

  useEffect(() => {
    const savedForm = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numberFields = ["hourlyFee", "totalSeats", "maxStudents", "fee"];

    if (numberFields.includes(name)) {
      if (Number(value) < 0) {
        toast.error("Negative numbers are not allowed");
        return;
      }
    }

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedForm));
  };

  const validate = () => {
    if (!form.name.trim()) return "Tutor name is required";
    if (!form.photoURL.trim()) return "Photo URL is required";
    if (!form.subject.trim()) return "Subject is required";
    if (!form.availableDays.trim()) return "Available days required";
    if (!form.availableTime.trim()) return "Available time required";
    if (!form.hourlyFee.trim()) return "Hourly fee required";
    if (!form.totalSeats.trim()) return "Total seats required";
    if (!form.sessionStartDate.trim()) return "Session start date required";
    if (!form.institution.trim()) return "Institution required";
    if (!form.location.trim()) return "Location required";
    if (!form.teachingMode.trim()) return "Teaching mode required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) { toast.error(error); return; }

    try {
      setLoading(true);

      const courseDuration = form.courseStartMonth && form.courseEndMonth
        ? `${form.courseStartMonth.slice(0, 3)} - ${form.courseEndMonth.slice(0, 3)}`
        : "Flexible";

      const creatorData = session?.user 
        ? { id: session.user.id, name: session.user.name, email: session.user.email, image: session.user.image || "", key: "user" }
        : { key: "system" };

      // FINAL DATA
      const tutorData = {
        ...form,
        hourlyFee: Number(form.hourlyFee),
        totalSeats: Number(form.totalSeats),
        maxStudents: Number(form.maxStudents || form.totalSeats),
        totalSlot: Number(form.totalSeats),
        availableSlots: Number(form.totalSeats),
        totalSlotLimit: Number(form.maxStudents || form.totalSeats),
        fee: Number(form.fee || 0),
        courseDuration,
        creator: creatorData,
      };

      const token = localStorage.getItem("token") || (await saveAuthToken());

      if (!token) {
        router.push("/login");
        throw new Error("Please login again");
      }

      const res = await fetch(`${API_URL}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(tutorData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add tutor");
      }

      toast.success("Tutor added successfully!");

      localStorage.removeItem(LOCAL_STORAGE_KEY);
      
      setForm({
        name: "",
        photoURL: "",
        subject: "",
        availableDays: "",
        availableTime: "",
        hourlyFee: "",
        totalSeats: "",
        sessionStartDate: "",
        courseStartMonth: "",
        courseEndMonth: "",
        institution: "",
        experience: "",
        location: "",
        teachingMode: "",
        expertise: "",
        fee: "",
        maxStudents: "",
        courseDuration: "",
      });

      setTimeout(() => { router.push("/tutors"); }, 1200);
    } catch (err) { 
      toast.error(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <>
      <title>MediQueue | Add Tutor</title>

      <div className="min-h-screen py-10 px-4 transition-all duration-500 bg-gray-50 dark:bg-linear-to-br dark:from-black dark:via-[#020817] dark:to-blue-950">
        <ToastContainer 
          position="top-right" 
          autoClose={2000} 
          toastClassName={() =>
            "relative flex p-4 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer shadow-2xl border border-gray-200/50 dark:border-zinc-800 bg-white dark:bg-black text-gray-900 dark:text-white"
          }
          bodyClassName={() => "flex items-center text-sm font-bold text-gray-900 dark:text-white"} 
        />

        {/* CONTAINER */}
        <div className="max-w-5xl mx-auto rounded-3xl p-8 transition-all duration-500 bg-white border border-gray-200 shadow-2xl dark:bg-black/40 dark:border-blue-900/40">
          {/* TITLE */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-3">
              Add New Tutor
            </h1>

            <p className="text-gray-600 dark:text-blue-300 text-base md:text-lg">
              Create premium tutor profile with professional details
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <Input icon={<FaUser />} name="name" label="Tutor Name" placeholder="Tutor Name" value={form.name} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaImage />} name="photoURL" label="Photo URL" placeholder="Photo URL" value={form.photoURL} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaBook />} name="subject" label="Subject" placeholder="Subject" value={form.subject} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaCalendar />} name="availableDays" label="Available Days" placeholder="Available Days" value={form.availableDays} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaClock />} name="availableTime" label="Available Time" placeholder="Available Time" value={form.availableTime} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaMoneyBill />} name="hourlyFee" type="number" label="Hourly Fee" placeholder="Hourly Fee" value={form.hourlyFee} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaLayerGroup />} name="totalSeats" type="number" label="Total Seats" placeholder="Total Seats" value={form.totalSeats} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaCalendar />} name="sessionStartDate" type="date" label="Session Start Date" placeholder="Session Start Date" value={form.sessionStartDate} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaLayerGroup />} name="maxStudents" type="number" label="Max Students" placeholder="Max Students" value={form.maxStudents} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaCalendar />} name="courseStartMonth" label="Course Start Month" placeholder="Course Start Month" value={form.courseStartMonth} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaCalendar />} name="courseEndMonth" label="Course End Month" placeholder="Course End Month" value={form.courseEndMonth} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaUniversity />} name="institution" label="Institution" placeholder="Institution" value={form.institution} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaChalkboardTeacher />} name="experience" label="Experience" placeholder="Experience" value={form.experience} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaMapMarkerAlt />} name="location" label="Location" placeholder="Location" value={form.location} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaLayerGroup />} name="teachingMode" label="Teaching Mode" placeholder="Teaching Mode" value={form.teachingMode} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaBook />} name="expertise" label="Expertise" placeholder="Expertise" value={form.expertise} onChange={handleChange} darkMode={darkMode} />
            <Input icon={<FaMoneyBill />} name="fee" type="number" label="Course Fee" placeholder="Course Fee" value={form.fee} onChange={handleChange} darkMode={darkMode} />

            {/* BUTTONS */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-2">
              <button
                type="button"
                onClick={() => router.push("/image-urls")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border font-bold text-lg transition-all duration-300 hover:scale-[1.01] ${
                  darkMode 
                    ? "bg-[#0B1120]/80 border-blue-900/40 text-blue-400 hover:bg-blue-950/40" 
                    : "bg-gray-50 border-gray-200 text-blue-600 hover:bg-gray-100"
                }`}
              >
                <FaLink className="text-base" />
                Create Image URL
              </button>

              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Add Tutor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function Input({ icon, name, label, placeholder, onChange, value, type = "text", darkMode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wide">
        {label}
      </label>

      <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-300 ${
        darkMode ? "bg-[#0B1120]/80 border-blue-900/40" : "bg-gray-50 border-gray-200"
      }`}>
        <span className="text-blue-600 dark:text-blue-400 text-lg">
          {icon}
        </span>

        <input 
          type={type} 
          min={type === "number" ? "0" : undefined}
          name={name} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          className={`w-full bg-transparent outline-none ${
            darkMode ? "text-blue-300 placeholder:text-blue-400" : "text-gray-700 placeholder:text-gray-400"
          }`} 
        />
      </div>
    </div>
  );
}

