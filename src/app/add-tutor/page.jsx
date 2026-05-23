"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaUser,
  FaImage,
  FaBook,
  FaClock,
  FaMoneyBill,
  FaCalendar,
  FaUniversity,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaLayerGroup,
} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ BETTER AUTH
import { useSession } from "@/lib/auth-client";

export default function AddTutorPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ✅ GET LOGGED USER
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    subject: "",
    availableDays: "",
    availableTime: "",
    hourlyFee: "",
    totalSeats: "",
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

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ VALIDATION
  const validate = () => {
    if (!form.name.trim()) return "Tutor name is required";
    if (!form.photoURL.trim()) return "Photo URL is required";
    if (!form.subject.trim()) return "Subject is required";
    if (!form.availableDays.trim()) return "Available days required";
    if (!form.availableTime.trim()) return "Available time required";
    if (!form.hourlyFee.trim()) return "Hourly fee required";
    if (!form.totalSeats.trim()) return "Total seats required";
    if (!form.institution.trim()) return "Institution required";
    if (!form.location.trim()) return "Location required";
    if (!form.teachingMode.trim()) return "Teaching mode required";

    return null;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      // ✅ AUTO COURSE DURATION
      const courseDuration = `${form.courseStartMonth.slice(
        0,
        3
      )} - ${form.courseEndMonth.slice(0, 3)}`;

      // ✅ GET USER DATA FROM SESSION
      const creatorData = session?.user
        ? {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || "",
            key: "user",
          }
        : {
            key: "system",
          };

      // ✅ FINAL DATA
      const tutorData = {
        ...form,

        hourlyFee: Number(form.hourlyFee),
        totalSeats: Number(form.totalSeats),

        maxStudents: Number(
          form.maxStudents || form.totalSeats
        ),

        fee: Number(form.fee || 0),

        courseDuration,

        // ✅ AUTO CREATOR
        creator: creatorData,
      };

      const res = await fetch(`${API_URL}/tutors`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(tutorData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to add tutor"
        );
      }

      toast.success("Tutor added successfully!");

      // ✅ RESET FORM
      setForm({
        name: "",
        photoURL: "",
        subject: "",
        availableDays: "",
        availableTime: "",
        hourlyFee: "",
        totalSeats: "",
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

      setTimeout(() => {
        router.push("/tutors");
      }, 1200);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-10 px-4">
      {/* ✅ TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Add New Tutor
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <Input
            icon={<FaUser />}
            name="name"
            placeholder="Tutor Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            icon={<FaImage />}
            name="photoURL"
            placeholder="Photo URL"
            value={form.photoURL}
            onChange={handleChange}
          />

          <Input
            icon={<FaBook />}
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />

          <Input
            icon={<FaCalendar />}
            name="availableDays"
            placeholder="Available Days"
            value={form.availableDays}
            onChange={handleChange}
          />

          <Input
            icon={<FaClock />}
            name="availableTime"
            placeholder="Available Time"
            value={form.availableTime}
            onChange={handleChange}
          />

          <Input
            icon={<FaMoneyBill />}
            name="hourlyFee"
            type="number"
            placeholder="Hourly Fee"
            value={form.hourlyFee}
            onChange={handleChange}
          />

          <Input
            icon={<FaLayerGroup />}
            name="totalSeats"
            type="number"
            placeholder="Total Seats"
            value={form.totalSeats}
            onChange={handleChange}
          />

          <Input
            icon={<FaLayerGroup />}
            name="maxStudents"
            type="number"
            placeholder="Max Students"
            value={form.maxStudents}
            onChange={handleChange}
          />

          <Input
            icon={<FaCalendar />}
            name="courseStartMonth"
            placeholder="Course Start Month"
            value={form.courseStartMonth}
            onChange={handleChange}
          />

          <Input
            icon={<FaCalendar />}
            name="courseEndMonth"
            placeholder="Course End Month"
            value={form.courseEndMonth}
            onChange={handleChange}
          />

          <Input
            icon={<FaUniversity />}
            name="institution"
            placeholder="Institution"
            value={form.institution}
            onChange={handleChange}
          />

          <Input
            icon={<FaChalkboardTeacher />}
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={handleChange}
          />

          <Input
            icon={<FaMapMarkerAlt />}
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <Input
            icon={<FaLayerGroup />}
            name="teachingMode"
            placeholder="Teaching Mode"
            value={form.teachingMode}
            onChange={handleChange}
          />

          <Input
            icon={<FaBook />}
            name="expertise"
            placeholder="Expertise"
            value={form.expertise}
            onChange={handleChange}
          />

          <Input
            icon={<FaMoneyBill />}
            name="fee"
            type="number"
            placeholder="Course Fee"
            value={form.fee}
            onChange={handleChange}
          />

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg"
            >
              {loading
                ? "Submitting..."
                : "Add Tutor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================================= */
/* INPUT COMPONENT */
/* ========================================= */

function Input({
  icon,
  name,
  placeholder,
  onChange,
  value,
  type = "text",
}) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-gray-50 focus-within:border-blue-500 transition">
      <span className="text-blue-600 text-lg">
        {icon}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-700"
      />
    </div>
  );
}