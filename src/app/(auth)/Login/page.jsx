"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";

import {
  FcGoogle,
} from "react-icons/fc";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { data } from "framer-motion/client";

export default function LoginPage() {

 
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [showPass, setShowPass] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // LOGIN SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error(
        "Email and Password required"
      );
    }

    try {
      setLoading(true);

      const { error } =
        await authClient.signIn.email({
          email: form.email,
          password: form.password,
        });

      if (error) {
        return toast.error(
          error.message || "Login failed"
        );
      }

      toast.success("Login successful!");

      router.push("/");

    } catch (err) {
      console.log(err);

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
  const handleGoogleLogin = async () => {
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
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-30 -left-30 w-65 h-65 sm:w-100 sm:h-100 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="absolute -bottom-30 -right-30 w-65 h-65 sm:w-100 sm:h-100 bg-cyan-400/20 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border border-white/20 dark:border-gray-800 rounded-4xl shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden">

          {/* TOP SECTION */}
          <div className="px-6 sm:px-8 pt-8 sm:pt-10 text-center">

            {/* LOGO */}
            <div className="mx-auto mb-5 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-xl shadow-blue-500/30">

              <span className="text-white text-2xl sm:text-3xl font-black">
                M
              </span>

            </div>

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">

              Welcome Back

            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">

              Login to your MediQueue account and continue your learning journey.

            </p>

          </div>

          {/* FORM SECTION */}
          <div className="px-6 sm:px-8 py-8">

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="group w-full h-14 sm:h-15 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 font-semibold"
            >

              <FcGoogle className="text-2xl" />

              <span className="text-sm sm:text-base">
                {googleLoading
                  ? "Connecting..."
                  : "Continue with Google"}
              </span>

            </button>

            {/* DIVIDER */}
            <div className="relative flex items-center justify-center my-7">

              <div className="absolute w-full h-px bg-gray-200 dark:bg-gray-800"></div>

              <span className="relative px-4 bg-white dark:bg-gray-900 text-sm text-gray-400">
                OR LOGIN WITH EMAIL
              </span>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">

                  Email Address

                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />

                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full h-14 sm:h-15 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-4 text-gray-800 dark:text-white placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">

                    Password

                  </label>

                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                  >
                    Forgot Password?
                  </button>

                </div>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />

                  <input
                    name="password"
                    type={
                      showPass
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-14 sm:h-15 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-14 text-gray-800 dark:text-white placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPass(!showPass)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
                  >

                    {showPass ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}

                  </button>

                </div>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group relative overflow-hidden w-full h-14.5 sm:h-15.5 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >

                <span className="relative z-10">
                  {loading
                    ? "Logging In..."
                    : "Login Account"}
                </span>

                <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-700 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              </button>

            </form>

            {/* REGISTER */}
            <div className="mt-8 text-center">

              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">

                Don’t have an account?

                <Link
                  href="/signup"
                  className="ml-2 font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  Create Account
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}