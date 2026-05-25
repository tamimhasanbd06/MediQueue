"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  useSession,
  saveAuthToken,
} from "@/lib/auth-client";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  // =========================
  // SET SESSION DATA FIRST
  // =========================
  useEffect(() => {
    if (session?.user) {
      const userData = {
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      };

      setProfile(userData);
      setForm(userData);
    }
  }, [session]);

  // =========================
  // FETCH PROFILE FROM BACKEND
  // =========================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to load profile"
        );
      }

      const userData = {
        name: data.user?.name || "",
        email: data.user?.email || "",
        image: data.user?.image || "",
      };

      setProfile(userData);
      setForm(userData);
    } catch (err) {
      toast.error(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const openEditModal = () => {
    setForm(profile);
    setIsEditOpen(true);
  };

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleUpdateProfile = async () => {
    try {
      setSaving(true);

      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update profile"
        );
      }

      const updatedUser = {
        name: data.user?.name || "",
        email: data.user?.email || "",
        image: data.user?.image || "",
      };

      setProfile(updatedUser);
      setForm(updatedUser);
      setIsEditOpen(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white">
        <p className="text-lg font-semibold animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-4 py-10">

      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-950 shadow-2xl rounded-3xl p-8 border border-gray-100 dark:border-zinc-800">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-yellow-300 dark:via-pink-400 dark:to-cyan-300 bg-clip-text text-transparent">
          My Profile
        </h1>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center mb-6">
          {profile.image ? (
            <Image
              src={profile.image}
              alt={profile.name || "User"}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-cyan-300"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center border-4 border-blue-500 dark:border-cyan-300">
              <span className="text-gray-500 dark:text-gray-300">
                No Image
              </span>
            </div>
          )}
        </div>

        {/* PROFILE INFO */}
        <div className="space-y-5">

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300">
              Name
            </label>

            <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-3 bg-gray-50 dark:bg-black">
              {profile.name || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300">
              Email
            </label>

            <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-3 bg-gray-50 dark:bg-black">
              {profile.email || "N/A"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300">
              Image URL
            </label>

            <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-3 bg-gray-50 dark:bg-black break-all">
              {profile.image || "N/A"}
            </div>
          </div>

        </div>

        {/* EDIT BUTTON */}
        <div className="flex justify-end mt-8">
          <button
            onClick={openEditModal}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Edit Profile
          </button>
        </div>

      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">

          <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-zinc-800">

            <h2 className="text-2xl font-bold mb-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-yellow-300 dark:via-pink-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Edit Profile
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Profile image URL"
                  className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setIsEditOpen(false)}
                disabled={saving}
                className="px-5 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateProfile}
                disabled={saving}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}