"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { data } from "framer-motion/client";

export default function LoginPage() {

 

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();



    // simple validation
    if (!form.email || !form.password) {
      return toast.error("Email and Password required");
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

      // redirect to home
      router.push("/");

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-gray-100 to-slate-200 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to your account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* PASSWORD */}
          <div className="relative">

            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={form.password}
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition active:scale-95 shadow-md"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}