"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import {  Camera, User, Mail, Save, X, LogOut, Edit3, Link2, Loader2,Image as ImageIcon } from "lucide-react";
import {
  useSession, saveAuthToken, clearAuthToken, signOut,} from "@/lib/auth-client";

export default function ProfilePage() {
  useEffect(() => {
    document.title = "MediQueue | Profile";
  }, []);

  const router = useRouter();
  const fileInputRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", image: "" });
  const [form, setForm] = useState({ name: "", email: "", image: "" });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token") || (await saveAuthToken());
      if (!token) return router.push("/login");

      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const user = {
        name: data?.user?.name || "",
        email: data?.user?.email || "",
        image: data?.user?.image || "",
      };

      setProfile(user);
      setForm(user);
      setPreview(user.image);
    } catch (err) {
      toast.error(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((p) => ({ ...p, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const openEdit = () => {
    setForm(profile);
    setPreview(profile.image);
    setIsEditOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token") || (await saveAuthToken());
      if (!token) return router.push("/login");

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

      setProfile(form);
      setIsEditOpen(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

const handleLogout = async () => {
  try {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          clearAuthToken();
          toast.success("Logged out successfully");
          router.replace("/login");
          router.refresh();
        },
      },
    });
  } catch (error) {
    toast.error("Logout failed");
  }
};
  const handleCreateImageURL = () => {
    router.push("/image-urls");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030712] px-4">
        <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-500 animate-spin mb-3" />
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide text-center">
          Loading your secure dashboard...
        </p>
      </div>
    );
  }

  return (
    <>
      <title>Profile</title>

      <div className="min-h-screen w-full px-4 py-6 sm:py-12 md:py-16 flex items-center justify-center bg-linear-to-br from-slate-50 via-slate-100 to-zinc-200 dark:from-[#030712] dark:via-[#090d16] dark:to-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

        <div className="w-full max-w-xs sm:max-w-xl md:max-w-2xl rounded-2xl sm:rounded-3xl border border-slate-200/60 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl p-5 sm:p-8 md:p-12 transition-all">
          
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Account Profile
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2 px-2">
              Manage your public personal display credentials across your interconnected accounts
            </p>
          </div>

        
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
            <div
              onClick={() => fileInputRef.current.click()}
              className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-xl cursor-pointer group transition-transform active:scale-95">
              <Image
                src={profile.image || "/avatar.png"} alt="profile" fill priority
                className="object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-1">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider">CHANGE</span>
              </div>
            </div>
          </div>

   
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 transition-all">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Full Name</span>
                <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">{profile.name || "Not provided"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/30 transition-all">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</span>
                <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">{profile.email || "Not provided"}</span>
              </div>
            </div>
          </div>

   
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-end border-t border-slate-200/60 dark:border-slate-800/60 pt-5 sm:pt-6">
            
            <button
              onClick={openEdit}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/10 hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Edit Profile
            </button>

            <button
              onClick={handleCreateImageURL}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Link2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Create Image URL
            </button>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Logout
            </button>

          </div>
        </div>

   
        {isEditOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            
            <div className="w-full max-w-xs sm:max-w-md my-auto rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-2xl transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-center mb-5 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">Update Specifications</h2>
                <button 
                  onClick={() => setIsEditOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 sm:mb-1.5">Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 sm:mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 sm:mb-1.5">Avatar Image Target Location</label>
                  <div className="relative">
                    <ImageIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="image"
                      type="text"
                      value={form.image}
                      onChange={handleChange}
                      placeholder="Paste standard source URI"
                      className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 sm:gap-3 mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => setIsEditOpen(false)}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-blue-600/10"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}