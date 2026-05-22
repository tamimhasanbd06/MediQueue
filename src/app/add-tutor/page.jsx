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

export default function AddTutorPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ FULL VALIDATION
  const validate = () => {
    if (!form.name) return "Name is required";
    if (!form.photoURL) return "Photo URL is required";
    if (!form.subject) return "Subject is required";
    if (!form.hourlyFee) return "Hourly fee is required";
    if (!form.totalSeats) return "Total seats is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add tutor");
      }

      toast.success("Tutor added successfully!");

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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-slate-100 py-10 px-4">

      {/* ✅ TOAST CONTAINER */}
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Add New Tutor
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          <Input icon={<FaUser />} name="name" placeholder="Tutor Name" onChange={handleChange} />
          <Input icon={<FaImage />} name="photoURL" placeholder="Photo URL" onChange={handleChange} />
          <Input icon={<FaBook />} name="subject" placeholder="Subject" onChange={handleChange} />
          <Input icon={<FaMoneyBill />} name="hourlyFee" placeholder="Hourly Fee" onChange={handleChange} />
          <Input icon={<FaCalendar />} name="availableDays" placeholder="Available Days" onChange={handleChange} />
          <Input icon={<FaClock />} name="availableTime" placeholder="Available Time" onChange={handleChange} />
          <Input icon={<FaUniversity />} name="institution" placeholder="Institution" onChange={handleChange} />
          <Input icon={<FaChalkboardTeacher />} name="experience" placeholder="Experience" onChange={handleChange} />
          <Input icon={<FaMapMarkerAlt />} name="location" placeholder="Location" onChange={handleChange} />
          <Input icon={<FaLayerGroup />} name="teachingMode" placeholder="Teaching Mode" onChange={handleChange} />
          <Input icon={<FaCalendar />} name="courseStartMonth" placeholder="Start Month" onChange={handleChange} />
          <Input icon={<FaCalendar />} name="courseEndMonth" placeholder="End Month" onChange={handleChange} />
          <Input icon={<FaLayerGroup />} name="totalSeats" placeholder="Total Seats" onChange={handleChange} />
          <Input icon={<FaBook />} name="expertise" placeholder="Expertise" onChange={handleChange} />

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg"
            >
              {loading ? "Submitting..." : "Add Tutor"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ icon, name, placeholder, onChange }) {
  return (
    <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50">
      <span className="text-blue-600">{icon}</span>
      <input
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}