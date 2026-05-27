"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { saveAuthToken } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { FaBookOpen, FaMoneyBillWave,  FaCalendarAlt,FaTrashAlt, FaSearch,FaUser,} from "react-icons/fa";

export default function BookedSessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [cancelLoading, setCancelLoading] = useState("");
  const [searchText, setSearchText] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    setMounted(true);
  }, []);


  const fetchSessions = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      if (!token) {
        token = await saveAuthToken();
      }

      if (!token) {
        return router.push("/login");
      }

      const res = await fetch(`${API_URL}/booked-sessions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    return sessions.filter(
      (session) =>
        session?.tutorName?.toLowerCase().includes(searchText.toLowerCase()) ||
        session?.subject?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [sessions, searchText]);

  const handleCancel = async (id) => {
    try {
      setCancelLoading(id);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/booked-sessions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Failed to cancel session");
      }

      toast.success("Session cancelled successfully");
      setSessions((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Cancel failed");
    } finally {
      setCancelLoading("");
    }
  };


  const totalPrice = sessions.reduce(
    (total, item) => total + Number(item?.fee || 0),
    0
  );


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-zinc-950 transition-all duration-500">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className=" min-h-screen px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-500
        bg-gray-50 dark:bg-zinc-950" >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Booked Sessions</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 font-medium">
            Manage your academic schedule, track financial records, and keep tabs on pending appointments effortlessly.
          </p>
        </div>

  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">


          <div className=" lg:col-span-2 flex items-center rounded-3xl p-5 border bg-white border-blue-500/20 dark:bg-zinc-900/40 dark:border-blue-400/20 shadow-[0_8px_30px_rgba(59,130,246,0.01)]" >
            <div className="relative w-full">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400 text-lg" />
              <input
                type="text" placeholder="Search by tutor name or learning subject..." value={searchText} onChange={(e) => setSearchText(e.target.value)}
                className=" w-full pl-14 pr-5 py-4 rounded-2xl border outline-none text-sm transition-all duration-300 focus:ring-4 focus:ring-blue-500/5  bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 " />
            </div>
          </div>

       
       
          <div
            className=" rounded-3xl p-6 border flex flex-col justify-center bg-white border-blue-500/30 dark:bg-black dark:border-blue-400/30 shadow-[0_10px_35px_rgba(59,130,246,0.03)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
                  Total Course Fee
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
                  ৳ {totalPrice.toLocaleString()}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center border border-blue-500/10">
                <FaMoneyBillWave className="text-xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-900/60 flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 font-medium">
              <span>Total Active Tutors</span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-zinc-900 font-bold text-gray-800 dark:text-zinc-200">
                {sessions.length} booked
              </span>
            </div>
          </div>
        </div>



        {filteredSessions.length === 0 ? (
          <div className=" rounded-3xl p-12 md:p-20 text-center border bg-white border-blue-500/20 dark:bg-zinc-900/20 dark:border-blue-400/20" >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-950/20 border border-blue-500/10">
              <FaBookOpen className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Booked Sessions Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
              There are no tutor configurations matching your specific criteria filter parameters right now.
            </p>
            <button onClick={() => router.push("/tutors")}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all duration-300" >
              Explore Instructors
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
              {filteredSessions.map((session) => (
                <div key={session._id}
                  className=" group rounded-3xl overflow-hidden border bg-white border-blue-500/20 dark:bg-zinc-900/40 dark:border-blue-400/20 transition-all duration-300 hover:shadow-lg hover:border-blue-500/40 dark:hover:border-blue-400/40 flex flex-col" >
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-zinc-900">
                    <Image
                      src={session.tutorImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt={session.tutorName} fill
                      className="object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
                        {session.subject}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-black text-white line-clamp-1">
                        {session.tutorName}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col grow justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-bold">
                          Course Fee
                        </p>
                        <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                          ৳ {session.fee}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <div className="text-xs font-medium text-gray-700 dark:text-zinc-300">
                          <p className="text-[10px] uppercase text-gray-400 text-left font-bold">Booked At</p>
                          <p className="font-bold mt-0.5">
                            {new Date(session.bookedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button onClick={() => router.push(`/tutors/${session.tutorId}`)}
                        className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide transition-all"
                      >
                        View Details
                      </button>
                      <button onClick={() => handleCancel(session._id)} disabled={cancelLoading === session._id}
                        className="w-12 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all disabled:opacity-50" >
                        {cancelLoading === session._id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : ( <FaTrashAlt className="text-sm" />)}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          


            <div className=" hidden lg:block rounded-3xl overflow-hidden border bg-white border-blue-500/20 dark:bg-zinc-900/30 dark:border-blue-400/20 shadow-[0_4px_30px_rgba(59,130,246,0.015)]" >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-blue-500/10 dark:border-blue-400/10 bg-gray-50/70 dark:bg-zinc-900/50">
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                      Tutor Profile
                    </th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                      Subject Area
                    </th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                      Booking Date
                    </th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                      Tuition Fee
                    </th>
                    <th className="p-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 text-right">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-900/60">
                  {filteredSessions.map((session) => (
                    <tr key={session._id}
                      className=" hover:bg-blue-50/10 dark:hover:bg-blue-950/5  transition-colors duration-200">
                 
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 shadow-2xs">
                            <Image
                              src={session.tutorImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
                              alt={session.tutorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white tracking-tight">
                              {session.tutorName}
                            </h4>
                            <p className="text-xs text-gray-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5">
                              <FaUser className="text-[10px]" /> ID: {session.tutorId?.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                   
                      <td className="p-5">
                        <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-500/5">
                          {session.subject}
                        </span>
                      </td>

               
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-zinc-300 font-semibold text-sm">
                          <FaCalendarAlt className="text-gray-400 dark:text-zinc-600 text-xs" />
                          <span>{new Date(session.bookedAt).toLocaleDateString()}</span>
                        </div>
                      </td>

                      <td className="p-5">
                        <span className="font-black text-gray-900 dark:text-white text-base">
                          ৳ {session.fee}
                        </span>
                      </td>

                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => router.push(`/tutors/${session.tutorId}`)}
                            className=" px-4 py-2  rounded-xl  bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs  transition-all duration-200  shadow-2xs " >
                            View Details
                          </button>
                          
                          <button  onClick={() => handleCancel(session._id)} disabled={cancelLoading === session._id} title="Cancel Session"
                            className=" p-2.5  rounded-xl  bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/10 transition-all duration-200  disabled:opacity-40 flex items-center justify-center" >
                            {cancelLoading === session._id ? (
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> 
                              ) : ( <FaTrashAlt className="text-xs" /> )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}