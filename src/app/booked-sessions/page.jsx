"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { saveAuthToken } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { FaBookOpen, FaMoneyBillWave, FaTrashAlt, FaSearch, FaEnvelope, FaUser } from "react-icons/fa";

export default function BookedSessionsPage() {
  useEffect(() => {
    document.title = "MediQueue | My Booked Sessions";
  }, []);

  const router = useRouter();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState("");
  const [searchText, setSearchText] = useState("");
  const [cancelTarget, setCancelTarget] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchSessions = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      if (!token) token = await saveAuthToken();
      if (!token) return router.push("/login");

      const res = await fetch(`${API_URL}/booked-sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        return router.push("/login");
      }

      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch booked sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const filteredSessions = useMemo(() => {
    const search = searchText.toLowerCase();
    return sessions.filter((session) =>
      `${session.tutorName || ""} ${session.studentName || ""} ${session.studentEmail || ""} ${session.subject || ""}`
        .toLowerCase()
        .includes(search)
    );
  }, [sessions, searchText]);

  const totalPrice = useMemo(
    () => sessions.filter((s) => s.status !== "cancelled").reduce((sum, session) => sum + Number(session.fee || 0), 0),
    [sessions]
  );

  const handleCancel = async () => {
    if (!cancelTarget) return;

    try {
      setCancelLoading(cancelTarget._id);
      let token = localStorage.getItem("token");
      if (!token) token = await saveAuthToken();
      if (!token) return router.push("/login");

      const res = await fetch(`${API_URL}/booked-sessions/${cancelTarget._id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cancel failed");

      setSessions((prev) =>
        prev.map((session) =>
          session._id === cancelTarget._id ? { ...session, status: "cancelled", bookStatus: "cancelled" } : session
        )
      );
      toast.success("Session cancelled successfully");
      setCancelTarget(null);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Cancel failed");
    } finally {
      setCancelLoading("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F2] dark:bg-black transition-all duration-500">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen px-4 md:px-10 py-12 bg-[#FFF8F2] dark:bg-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 px-4 py-1.5 bg-blue-50 dark:bg-zinc-900 border border-blue-500/10 rounded-xl">
              Learning Schedule
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-5 tracking-tight">
              My Booked <span className="text-blue-600 dark:text-blue-400">Sessions</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto font-medium">
              Manage your booked tutor sessions and cancel sessions when needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-3xl p-5 border bg-white border-blue-500/20 dark:bg-zinc-900/30 dark:border-blue-400/20">
              <div className="flex items-center gap-3">
                <FaSearch className="text-blue-600 dark:text-blue-400" />
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search tutor, student, email or subject"
                  className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="rounded-3xl p-6 border bg-white border-blue-500/20 dark:bg-zinc-900/30 dark:border-blue-400/20 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">Total Active Fee</p>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">৳ {totalPrice.toLocaleString()}</h2>
              </div>
              <FaMoneyBillWave className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="rounded-3xl p-12 md:p-20 text-center border bg-white border-blue-500/20 dark:bg-zinc-900/20 dark:border-blue-400/20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-950/20 border border-blue-500/10">
                <FaBookOpen className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Booked Sessions Found</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">You do not have any booked sessions yet.</p>
              <button onClick={() => router.push("/tutors")} className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all duration-300">
                Explore Instructors
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
                {filteredSessions.map((session) => {
                  const cancelled = session.status === "cancelled";
                  return (
                    <div key={session._id} className="group rounded-3xl overflow-hidden border bg-white border-blue-500/20 dark:bg-zinc-900/40 dark:border-blue-400/20 transition-all duration-300 hover:shadow-lg flex flex-col">
                      <div className="relative h-48 w-full bg-gray-100 dark:bg-zinc-900">
                        <Image src={session.tutorImage || "https://i.ibb.co/4pDNDk1/avatar.png"} alt={session.tutorName || "Tutor"} fill className="object-cover" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-blue-600 text-white text-[11px] font-bold tracking-wider uppercase">{session.subject}</span>
                        <h3 className="absolute bottom-4 left-4 right-4 text-lg font-black text-white line-clamp-1">{session.tutorName}</h3>
                      </div>
                      <div className="p-5 space-y-3">
                        <Line icon={<FaUser />} label="Student" value={session.studentName || "N/A"} />
                        <Line icon={<FaEnvelope />} label="Email" value={session.studentEmail || "N/A"} />
                        <Line label="Status" value={cancelled ? "cancelled" : session.status || "confirmed"} />
                        <button onClick={() => setCancelTarget(session)} disabled={cancelled || cancelLoading === session._id} className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                          {cancelled ? "Cancelled" : cancelLoading === session._id ? "Cancelling..." : "Cancel"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="hidden lg:block rounded-3xl overflow-hidden border bg-white border-blue-500/20 dark:bg-zinc-900/30 dark:border-blue-400/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-blue-500/10 bg-gray-50/70 dark:bg-zinc-900/50">
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">Tutor Name</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">Student Name</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">Email</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">Status</th>
                      <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 text-center">Cancel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-500/10">
                    {filteredSessions.map((session) => {
                      const cancelled = session.status === "cancelled";
                      return (
                        <tr key={session._id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/10 transition-all">
                          <td className="p-5 font-black text-gray-900 dark:text-white">{session.tutorName}</td>
                          <td className="p-5 text-gray-700 dark:text-zinc-300">{session.studentName || "N/A"}</td>
                          <td className="p-5 text-gray-700 dark:text-zinc-300">{session.studentEmail || "N/A"}</td>
                          <td className="p-5"><span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase ${cancelled ? "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"}`}>{cancelled ? "cancelled" : session.status || "confirmed"}</span></td>
                          <td className="p-5 text-center">
                            <button onClick={() => setCancelTarget(session)} disabled={cancelled || cancelLoading === session._id} className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2">
                              <FaTrashAlt /> {cancelled ? "Cancelled" : "Cancel"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>

      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-w-md w-full rounded-3xl bg-white dark:bg-zinc-950 border border-blue-500/20 p-6 shadow-2xl text-center">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Cancel Session?</h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">After confirmation, this booking status will be updated to cancelled.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelTarget(null)} className="flex-1 py-3 rounded-xl border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold">No</button>
              <button onClick={handleCancel} disabled={cancelLoading === cancelTarget._id} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold disabled:opacity-50">
                {cancelLoading === cancelTarget._id ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Line({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 font-bold">{icon}{label}</span>
      <span className="text-gray-900 dark:text-white font-bold text-right break-all">{value}</span>
    </div>
  );
}
