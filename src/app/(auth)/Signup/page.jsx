"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
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

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    // EMPTY FIELD CHECK
    for (let key in formData) {

      if (!formData[key]) {

        return toast.error(
          "All fields are required"
        );
      }
    }

    // PASSWORD MATCH CHECK
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      return toast.error(
        "Passwords do not match"
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

      // ERROR
      if (error) {

        return toast.error(
          error.message || "Signup failed"
        );
      }

      // SUCCESS
      toast.success(
        "Account created successfully"
      );

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        image: "",
        password: "",
        confirmPassword: "",
      });

      // REDIRECT
      window.location.href = "/login";

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">

          Sign Up

        </h1>

        <p className="text-center text-gray-500 mb-6">

          Create your account

        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* IMAGE */}
          <input
            type="text"
            name="image"
            placeholder="Photo URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PASSWORD */}
          <div className="relative">

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
              className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-gray-500"
            >

              {showPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
              }

            </button>

          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">

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
              className="w-full border px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-4 text-gray-500"
            >

              {showConfirmPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
              }

            </button>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >

            {loading
              ? "Loading..."
              : "Create Account"
            }

          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">

          Already have an account?

          <Link
            href="/login"
            className="text-blue-600 ml-1 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}