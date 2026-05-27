"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Camera, User, Mail, Link as LinkIcon, Save, X } from "lucide-react";

import { useSession, saveAuthToken } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
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
  const [preview, setPreview] = useState("");

  // =========================
  // FETCH PROFILE
  // =========================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token") || (await saveAuthToken());

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
  // FILE MANAGER UPLOAD HANDLE
  // =========================
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreview(base64String);
      setForm((prev) => ({
        ...prev,
        image: base64String,
      }));
      toast.success("Image selected from local storage");
    };
    reader.readAsDataURL(file);
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

      const token = localStorage.getItem("token") || (await saveAuthToken());

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
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent dark:border-blue-500 dark:border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-gray-800 dark:text-gray-200 tracking-wide">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-black dark:via-[#050816] dark:to-[#020617] px-4 py-8 md:py-16 flex items-center justify-center">
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl bg-white/90 dark:bg-black/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
          My Profile
        </h1>

        <div className="flex flex-col items-center justify-center mb-10 group">
          <div 
            onClick={handleImageClick}
            className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 relative rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl cursor-pointer bg-gray-100 dark:bg-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <Image
              src={profile?.image || "/avatar.png"}
              alt="profile"
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300">
              <Camera className="w-6 h-6 md:w-8 md:h-8 mb-1 animate-bounce" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Change Photo</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-semibold pointer-events-none italic">
            Click image to upload file from device
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 flex items-center gap-4 transition-all hover:bg-gray-100/50 dark:hover:bg-white/10">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">Full Name</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                {profile?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 flex items-center gap-4 transition-all hover:bg-gray-100/50 dark:hover:bg-white/10">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">Email Address</p>
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                {profile?.email || "N/A"}
              </p>
            </div>
          </div>

        </div>

        <div className="flex justify-end mt-8 sm:mt-10">
          <button
            onClick={openEdit}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          
          <div className="w-full max-w-md bg-white dark:bg-[#0b1121] rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 transform scale-100 transition-all duration-300 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Edit Profile
              </h2>
              <button 
                onClick={() => setIsEditOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center mb-6">
              <div 
                onClick={handleImageClick}
                className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-full overflow-hidden border border-gray-200 dark:border-gray-800 cursor-pointer shadow-lg bg-gray-50 dark:bg-gray-900 group"
              >
                <Image
                  src={preview || "/avatar.png"}
                  alt="preview"
                  fill
                  className="object-cover group-hover:opacity-80 transition"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition">
                  <Camera className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-2 font-bold uppercase tracking-wider cursor-pointer hover:underline" onClick={handleImageClick}>
                Browse File Manager
              </p>
            </div>

            <div className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 ml-1">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full h-12 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full h-12 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1 ml-1">Image URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Image URL (or upload above)"
                    className="w-full h-12 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 text-sm font-semibold text-gray-900 dark:text-white outline-none focus:border-blue-600 dark:focus:border-blue-500 transition"
                  />
                </div>
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-900">
              
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}