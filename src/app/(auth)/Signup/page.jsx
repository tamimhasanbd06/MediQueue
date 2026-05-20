"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (pass) => {
    return (
      /[A-Z]/.test(pass) &&
      /[a-z]/.test(pass) &&
      pass.length >= 6
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error(
        "Password must contain uppercase, lowercase & 6+ characters"
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      toast.loading("Creating account...");

      // 👉 backend connect here later
      // await fetch("/api/signup", {...})

      toast.dismiss();
      toast.success("Account created successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Signup failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-100 to-slate-200 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Join MediQueue & start learning
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition hover:scale-[1.01]"
          />

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition hover:scale-[1.01]"
          />

          {/* PHOTO */}
          <input
            name="photo"
            placeholder="Photo URL"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none transition hover:scale-[1.01]"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPass(!showConfirmPass)
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* PASSWORD RULE */}
          <p className="text-xs text-gray-500">
            Must include uppercase, lowercase & minimum 6 characters
          </p>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition active:scale-95 shadow-md"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}