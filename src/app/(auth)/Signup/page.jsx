"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ImageIcon,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

export default function SignupPage() {

  const [loading, setLoading] =
    useState(false);

  const [googleLoading,
    setGoogleLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
    });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // EMPTY CHECK
    for (let key in formData) {

      if (!formData[key]) {

        return toast.error(
          "All fields are required"
        );
      }
    }

    // PASSWORD MATCH
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      return toast.error(
        "Passwords do not match"
      );
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (
      !passwordRegex.test(
        formData.password
      )
    ) {

      return toast.error(
        "Password must contain uppercase, lowercase and minimum 6 characters"
      );
    }

    try {

      setLoading(true);

      const { error } =
        await authClient.signUp.email({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: formData.image,
        });

      if (error) {

        return toast.error(
          error.message ||
          "Signup failed"
        );
      }

      toast.success(
        "Account created successfully"
      );

      setFormData({
        name: "",
        email: "",
        image: "",
        password: "",
        confirmPassword: "",
      });

      window.location.href =
        "/login";

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin =
    async () => {

      try {

        setGoogleLoading(true);

        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Google login failed"
        );

      } finally {

        setGoogleLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-4xl shadow-[0_10px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_60px_rgba(0,0,0,0.4)] p-6 sm:p-8">

          {/* HEADER */}
          <div className="text-center mb-8">

            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 mb-5">

              <span className="text-white text-2xl font-black">
                M
              </span>

            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">

              Create Account

            </h1>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">

              Join MediQueue and start booking
              expert tutors easily.

            </p>

          </div>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-gray-700 dark:text-gray-200 hover:scale-[1.01]"
          >

            <FcGoogle className="text-2xl" />

            {googleLoading
              ? "Connecting..."
              : "Continue with Google"}

          </button>

          {/* DIVIDER */}
          <div className="relative flex items-center justify-center my-7">

            <div className="absolute w-full h-px bg-gray-200 dark:bg-gray-800"></div>

            <span className="relative px-4 bg-white dark:bg-gray-900 text-sm text-gray-500">
              OR
            </span>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}
            <div className="relative">

              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-4 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

            </div>

            {/* EMAIL */}
            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-4 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

            </div>

            {/* IMAGE */}
            <div className="relative">

              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="image"
                placeholder="Photo URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-4 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

            </div>

            {/* PASSWORD */}
            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-14 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >

                {showPassword
                  ? <EyeOff size={20} />
                  : <Eye size={20} />
                }

              </button>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-14 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >

                {showConfirmPassword
                  ? <EyeOff size={20} />
                  : <Eye size={20} />
                }

              </button>

            </div>

            {/* PASSWORD NOTE */}
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">

              Password must contain at least one uppercase letter,
              one lowercase letter and minimum 6 characters.

            </p>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.01]"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">

            Already have an account?

            <Link
              href="/login"
              className="ml-1 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}