"use client";

import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaSearch, FaEdit, FaTrash, FaGraduationCap, FaMapMarkerAlt, FaUsers, FaLink } from "react-icons/fa";
import { saveAuthToken } from "@/lib/auth-client";

export default function MyTutorsPage() {
  useEffect(() => {
    document.title = "MediQueue | My Tutors";
  }, []);

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [modal, setModal] = useState({
    update: false,
    delete: false,
    success: false,
  });

  const [form, setForm] = useState({});

  // Dynamic Responsive Visibility State management 
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewLimit, setViewLimit] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewLimit(6);   // Mobile base visibility limit
      } else if (width >= 768 && width < 1280) {
        setViewLimit(12);  // Tablet base visibility limit
      } else {
        setViewLimit(6);   // Desktop baseline visibility row limit
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FETCH
  const fetchTutors = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token") || (await saveAuthToken());

      if (!token) return router.push("/login");

      const res = await fetch(`${API_URL}/my-tutors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setTutors(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  // OPEN UPDATE
  const openUpdate = (tutor) => {
    setSelectedTutor(tutor);
    setForm({ ...tutor });
    setModal((m) => ({ ...m, update: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numberFields = ["hourlyFee", "totalSeats", "maxStudents", "fee"];

    if (numberFields.includes(name) && Number(value) < 0) {
      toast.error("Negative value not allowed");
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token") || (await saveAuthToken());

      const res = await fetch(`${API_URL}/tutors/${selectedTutor._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTutors((prev) =>
        prev.map((t) =>
          t._id === selectedTutor._id ? { ...t, ...form } : t
        )
      );

      toast.success("Updated successfully");

      setModal({ update: false, delete: false, success: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token") || (await saveAuthToken());
      const tutor = tutors.find((t) => t._id === deleteId);
      const res = await fetch(`${API_URL}/tutors/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTutors((prev) => prev.filter((t) => t._id !== deleteId));
      toast.success(`${tutor?.name} deleted`);
      setModal({ update: false, delete: false, success: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredTutors = useMemo(() => {
    return tutors.filter((t) =>
      `${t.name} ${t.subject}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [tutors, search]);

  const visibleTutors = useMemo(() => {
    if (isExpanded) return filteredTutors;
    return filteredTutors.slice(0, viewLimit);
  }, [filteredTutors, isExpanded, viewLimit]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-semibold text-lg tracking-wider">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Dashboard Data...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>MediQueue | My Tutors</title>

      <div className="min-h-screen p-4 md:p-10 bg-linear-to-br from-white via-blue-50 to-slate-100 dark:from-black dark:via-[#020817] dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <h1 className="text-center text-3xl md:text-6xl font-black mb-10 bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text py-2">
          My Tutors
        </h1>

        <div className="max-w-xl mx-auto mb-10 flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#0B1120] border-2 border-blue-500/80 dark:border-blue-500/60 shadow-xl focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
          <FaSearch className="text-blue-500 text-lg shrink-0" />
          <input 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setIsExpanded(false); }}
            placeholder="Search tutors by name or subject..."
            className="w-full bg-transparent outline-none border-none text-gray-900 dark:text-blue-200 placeholder:text-gray-400 dark:placeholder:text-blue-400/50 text-sm md:text-base font-medium"
          />
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden xl:block overflow-hidden rounded-3xl border-2 border-blue-500/80 dark:border-blue-500/60 shadow-2xl bg-white dark:bg-[#0B1120]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-sm font-bold uppercase tracking-wider">
                  <th className="p-5 text-left">Tutor Details</th>
                  <th className="p-5 text-center">Subject Area</th>
                  <th className="p-5 text-center">Hourly Fee</th>
                  <th className="p-5 text-center">Total Seats</th>
                  <th className="p-5 text-center">Location Basis</th>
                  <th className="p-5 text-center w-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-blue-500/20">
                {visibleTutors.map((tutor) => (
                  <tr key={tutor._id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all duration-200 group">
                    <td className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
                        {tutor.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100 text-base">{tutor.name}</p>
                        <p className="text-xs text-gray-500 dark:text-blue-300/60 font-medium mt-0.5">{tutor.institution || "Independent Institution"}</p>
                      </div>
                    </td>
                    <td className="p-5 text-center font-semibold text-gray-700 dark:text-blue-200">{tutor.subject}</td>
                    <td className="p-5 text-center font-bold text-emerald-600 dark:text-emerald-400 text-lg">৳{tutor.hourlyFee || tutor.fee}</td>
                    <td className="p-5 text-center font-medium text-gray-600 dark:text-gray-300">{tutor.totalSeats ?? "0"} available</td>
                    <td className="p-5 text-center text-sm font-medium text-gray-500 dark:text-blue-300/80">{tutor.location}</td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => openUpdate(tutor)}
                          className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => { setDeleteId(tutor._id); setModal((m) => ({ ...m, delete: true })); }}
                          className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="block xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTutors.map((tutor) => (
              <div key={tutor._id}
                className="rounded-3xl border-2 border-blue-500/80 dark:border-blue-500/60 bg-white dark:bg-[#0B1120] p-5 md:p-6 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                      {tutor.name?.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">{tutor.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-blue-400/60 font-medium truncate flex items-center gap-1 mt-0.5">
                        <FaGraduationCap className="text-blue-500 shrink-0" />
                        {tutor.institution || "Independent Institution"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 dark:border-blue-900/10 text-sm">
                    <div>
                      <span className="text-xs text-gray-400 dark:text-blue-400/40 uppercase font-semibold tracking-wider">Subject</span>
                      <p className="font-bold text-gray-800 dark:text-blue-200 truncate">{tutor.subject}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 dark:text-blue-400/40 uppercase font-semibold tracking-wider">Hourly Rate</span>
                      <p className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                        ৳{tutor.hourlyFee || tutor.fee}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 my-4 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-blue-400 w-4 shrink-0" />
                      <span>{tutor.totalSeats ?? "0"} Active Seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-400 w-4 shrink-0" />
                      <span className="truncate">{tutor.location}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2 pt-2 border-t border-gray-100 dark:border-blue-900/10">
                  <button
                    onClick={() => openUpdate(tutor)}
                    className="w-full py-3 px-4 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-xs md:text-sm active:scale-95 shadow-sm"
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(tutor._id);
                      setModal((m) => ({ ...m, delete: true }));
                    }}
                    className="w-full py-3 px-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-xs md:text-sm active:scale-95 shadow-sm"
                  >
                    <FaTrash />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTutors.length === 0 && (
            <div className="text-center py-16 rounded-3xl border-2 border-dashed border-blue-500/50 bg-white/50 dark:bg-black/10">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">No Matching Records Found</h3>
              <p className="text-sm text-gray-500 dark:text-blue-300/60">Try updating your structural search keywords or parameters.</p>
            </div>
          )}

          {filteredTutors.length > viewLimit && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className=" px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-blue-500/20 " >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>

        {/* UPDATE MODAL */}
        {modal.update && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0B1120] border-4 border-blue-500/90 dark:border-blue-500/70 rounded-3xl p-5 md:p-8 shadow-2xl transition-all overscroll-contain">
              <div className="pb-4 mb-6 border-b-2 border-blue-500/20">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                  Update Tutor Parameters
                </h2>
                <p className="text-xs md:text-sm text-gray-500 dark:text-blue-300/60 font-medium mt-1">
                  Modify field properties below. Adjust data properties accurately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  "name", "subject", "photoURL", "hourlyFee",
                  "availableDays", "availableTime", "location", "institution",
                  "experience", "teachingMode", "sessionStartDate", "courseStartMonth", "courseEndMonth",
                  "totalSeats", "maxStudents", "courseDuration", "fee"
                ].map((key) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400/80">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input name={key} type={key === "sessionStartDate" ? "date" : "text"} value={form[key] || ""} onChange={handleChange}
                      className="w-full p-3.5 rounded-xl text-gray-900 dark:text-blue-200 font-medium text-sm outline-none transition-all duration-200 border-2 border-blue-500/80 dark:border-blue-500/60 bg-white dark:bg-[#060b13] focus:ring-4 focus:ring-blue-500/20 placeholder:text-gray-300 dark:placeholder:text-blue-900/40" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-8 pt-5 border-t-2 border-blue-500/20">
                {/* CREATE IMAGE URL LINK BUTTON */}
                <button
                  type="button"
                  onClick={() => router.push("/image-urls")}
                  className="px-6 py-3.5 flex items-center justify-center gap-2 border-2 rounded-xl font-bold text-xs uppercase tracking-wide transition-all duration-200 hover:scale-[1.01] bg-[#0B1120]/10 border-blue-500/30 text-blue-600 dark:text-blue-400 dark:bg-[#0B1120]/80 dark:border-blue-900/40 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                >
                  <FaLink className="text-xs" />
                  Create Image URL
                </button>

                <div className="flex items-center gap-3 justify-end">
                  <button
                    onClick={() => setModal((m) => ({ ...m, update: false }))}
                    className="px-6 py-3.5 bg-gray-100 dark:bg-blue-950/40 text-gray-600 dark:text-blue-400 font-black rounded-xl hover:bg-gray-200 dark:hover:bg-blue-900/40 text-xs uppercase tracking-wide transition-all duration-200" >
                    Cancel Action
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-8 py-3.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 text-xs uppercase tracking-wide transition-all duration-200 shadow-md" >
                    {saving ? "Saving Changes..." : "Save Configuration"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DELETE MODAL */}
        {modal.delete && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0B1120] border-4 border-blue-500/90 dark:border-blue-500/70 p-6 md:p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-red-500 text-2xl" />
              </div>
              <h2 className="text-xl font-black mb-1 text-gray-900 dark:text-white">Delete Profile?</h2>
              <p className="text-xs text-gray-400 dark:text-blue-400/60 font-medium mb-6">This process dropped entry permanently.</p>
              <div className="flex justify-center items-center gap-3 w-full">
                <button
                  onClick={() => setModal((m) => ({ ...m, delete: false }))}
                  className="w-1/2 py-3 bg-gray-100 dark:bg-blue-950/40 text-gray-600 dark:text-blue-400 font-bold rounded-xl text-sm transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="w-1/2 py-3 bg-red-600 text-white font-bold rounded-xl text-sm transition-all">
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS MODAL */}
        {modal.success && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0B1120] border-4 border-blue-500/90 dark:border-blue-500/70 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-emerald-500 text-3xl font-black">✓</span>
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Action Completed!</h2>
              <p className="text-xs text-gray-400 dark:text-blue-400/60 font-medium mb-6">Your configurations data synchronizations processed successfully.</p>
              <button
                onClick={() => setModal((m) => ({ ...m, success: false }))}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-sm transition-all">
                Acknowledge
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}