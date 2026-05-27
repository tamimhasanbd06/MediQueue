"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

import { useSession, saveAuthToken } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ SAFE INITIAL STATE
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
  const [preview, setPreview] = useState("");

  // =========================
  // FETCH PROFILE
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

      if (!res.ok) throw new Error(data.message);

      // ✅ SAFE USER HANDLING
      const user = data?.user || {};

      const safeUser = {
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
      };

      setProfile(safeUser);
      setForm(safeUser);
      setPreview(safeUser.image);
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
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setPreview(value);
    }
  };

  // =========================
  // OPEN EDIT
  // =========================
  const openEdit = () => {
    setForm(profile);
    setPreview(profile.image);
    setIsEditOpen(true);
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSave = async () => {
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

      if (!res.ok) throw new Error(data.message);

      const updatedUser = data?.user || form;

      const safeUpdated = {
        name: updatedUser.name || "",
        email: updatedUser.email || "",
        image: updatedUser.image || "",
      };

      setProfile(safeUpdated);
      setForm(safeUpdated);
      setPreview(safeUpdated.image);

      setIsEditOpen(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <p className="animate-pulse font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-black dark:via-[#050816] dark:to-[#020617] px-4 py-12">

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white/70 dark:bg-white/5 backdrop-blur-xl border rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          My Profile
        </h1>

        {/* IMAGE */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-blue-500 shadow-xl">
            <Image
              src={profile?.image || "/avatar.png"}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-4">

          <div className="p-4 rounded-xl bg-white/60 dark:bg-white/10 border">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">
              {profile?.name || "N/A"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 dark:bg-white/10 border">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">
              {profile?.email || "N/A"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/60 dark:bg-white/10 border break-all">
            <p className="text-sm text-gray-500">Image URL</p>
            <p className="text-sm">
              {profile?.image || "N/A"}
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end mt-8">
          <button
            onClick={openEdit}
            className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-white dark:bg-[#0b1020] rounded-2xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Edit Profile
            </h2>

            {/* PREVIEW */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-blue-500">
                <Image
                  src={preview || "/avatar.png"}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-3">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 border rounded-xl"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border rounded-xl"
              />

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-3 border rounded-xl"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-xl"
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