"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import {
  authClient,
  saveAuthToken,
} from "@/lib/auth-client";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "MediQueue | Login";
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error(
        "Email and Password required"
      );
    }

    try {
      setLoading(true);

      const result =
        await authClient.signIn.email({
          email: form.email,
          password: form.password,
        });

      if (result.error) {
        return toast.error(
          result.error.message ||
          "Login failed"
        );
      }

      const token = await saveAuthToken();

      if (!token) {
        return toast.error(
          "JWT token create failed"
        );
      }

      toast.success(
        "Login successful!"
      );

      router.push("/");

    } catch (err) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin =
    async () => {
      try {
        setGoogleLoading(true);

        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });

      } catch (error) {
        toast.error(
          "Google login failed"
        );
      } finally {
        setGoogleLoading(false);
      }
    };

  return (
    <>
      <Head>
        <title>MediQueue | Login</title>
      </Head>

      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-4xl shadow-[0_10px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_60px_rgba(0,0,0,0.4)] p-6 sm:p-8">

            {/* HEADER */}
            <div className="text-center mb-8">

              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 mb-5">
                <span className="text-white text-2xl font-black">
                  M
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                Welcome Back
              </h1>

              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                Login to MediQueue and access premium expert tutors easily.
              </p>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
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

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-4 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 pl-12 pr-14 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPass
                    ? <EyeOff size={20} />
                    : <Eye size={20} />}
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.01]"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>
            </form>

            {/* REGISTER LINK */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
              Don&apos;t have an account?

              <Link
                href="/signup"
                className="ml-1 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}