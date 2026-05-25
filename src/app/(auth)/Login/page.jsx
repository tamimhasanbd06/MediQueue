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

import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";

import {
  authClient,
  saveAuthToken,
} from "@/lib/auth-client";

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
  // LOGIN
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

      // =========================
      // CREATE + STORE JWT TOKEN
      // =========================
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
        toast.error(
          "Google login failed"
        );
      } finally {
        setGoogleLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 border rounded-2xl"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <div className="relative">

            <input
              type={
                showPass
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            <button
              type="button"
              onClick={() =>
                setShowPass(!showPass)
              }
              className="absolute right-4 top-4"
            >
              {showPass ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            {loading
              ? "Logging..."
              : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border p-3 rounded-xl flex items-center justify-center gap-2"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center">
            Don’t have an account?

            <Link
              href="/signup"
              className="text-blue-600 ml-2"
            >
              Register
            </Link>
          </p>

        </div>

      </form>

    </div>
  );
}