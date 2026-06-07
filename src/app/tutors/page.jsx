"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function TutorsPage() {
  useEffect(() => {
    document.title = "MediQueue | Tutors";
  }, []);

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewLimit, setViewLimit] = useState(18);
  const [mounted, setMounted] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewLimit(6);
      } else if (width >= 768 && width < 1280) {
        setViewLimit(12);
      } else {
        setViewLimit(18);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchText.trim()) params.set("search", searchText.trim());
      if (subjectText.trim()) params.set("subject", subjectText.trim());
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      const queryString = params.toString();
      const res = await fetch(`${API_URL}/tutors${queryString ? `?${queryString}` : ""}`);
      const data = await res.json();
      setTutors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tutors");
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTutors();
    }, 350);
    return () => clearTimeout(timeout);
  }, [searchText, subjectText, startDate, endDate]);

  const filtered = useMemo(() => {
    return tutors.filter((t) => {
      return (
        t?.name?.toLowerCase().includes(searchText.toLowerCase()) &&
        t?.subject?.toLowerCase().includes(subjectText.toLowerCase()) &&
        (startDate ? String(t?.sessionStartDate || "") >= startDate : true) &&
        (endDate ? String(t?.sessionStartDate || "") <= endDate : true)
      );
    });
  }, [tutors, searchText, subjectText, startDate, endDate]);

  const visibleTutors = useMemo(() => {
    if (isExpanded) return filtered;
    return filtered.slice(0, viewLimit);
  }, [filtered, isExpanded, viewLimit]);

  const resetAll = () => {
    setSearchText("");
    setSubjectText("");
    setStartDate("");
    setEndDate("");
    setIsExpanded(false);
  };

  return (
    <>
      <title> MediQueue | Tutor </title>

      <section className="min-h-screen px-4 md:px-10 py-16 transition-colors duration-500 bg-[#FFF8F2] dark:bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative text-center mb-16 z-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 px-4 py-1.5 bg-blue-50 dark:bg-zinc-900 border border-blue-500/10 dark:border-blue-400/10 rounded-xl">
            Expert Learning Network
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-5 tracking-tight">
            Find Your <span className="text-blue-600 dark:text-blue-400">Tutor</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto font-medium">
            Search and filter professional tutors easily with a premium learning experience custom-built for you.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto mb-14 rounded-3xl p-5 md:p-6 border transition-all duration-300 bg-white border-blue-500/20 shadow-[0_8px_30px_rgba(59,130,246,0.02)] dark:bg-zinc-950 dark:border-blue-400/20 hover:border-blue-500/30 dark:hover:border-blue-400/30 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input 
              placeholder="Tutor name" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="p-4 rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:placeholder:text-zinc-500 dark:focus:border-blue-500" 
            />

            <input 
              placeholder="Subject" 
              value={subjectText}
              onChange={(e) => setSubjectText(e.target.value)}
              className="p-4 rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:placeholder:text-zinc-500 dark:focus:border-blue-500" 
            />

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-4 rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:focus:border-blue-500"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-4 rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:placeholder:text-zinc-500 dark:focus:border-blue-500"
            />

            <button
              onClick={resetAll}
              className="p-4 rounded-2xl w-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-600/5 hover:shadow-blue-600/15 md:col-span-2 lg:col-span-1"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32 relative z-10">
            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 relative z-10 bg-white dark:bg-zinc-950 rounded-3xl max-w-7xl mx-auto border border-blue-500/10 dark:border-blue-400/10 p-8">
            <h2 className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-2">
              No Tutors Match Your Criteria
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 max-w-sm mx-auto font-medium text-sm">
              Try adjusting your search criteria parameters or clearing active filters to refresh available lists.
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {visibleTutors.map((tutor) => {
                const availableSlots = Number(tutor?.totalSeats ?? tutor?.totalSlot ?? 0);
                const isSoldOut = availableSlots <= 0;

                return (
                  <Link 
                    key={tutor?._id} 
                    href={`/tutors/${tutor?._id}`}
                    className="group rounded-3xl overflow-hidden flex flex-col border transition-all duration-300 bg-white border-blue-500/15 shadow-[0_4px_25px_rgba(59,130,246,0.015)] hover:border-blue-500/40 hover:shadow-[0_12px_35px_rgba(59,130,246,0.08)] hover:-translate-y-1 dark:bg-zinc-950 dark:border-blue-400/15 dark:shadow-none dark:hover:border-blue-400/40 dark:hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)]" 
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-zinc-900">
                      <Image
                        src={tutor?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt={tutor?.name || "Tutor Portrait"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent"></div>

                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 rounded-xl bg-blue-600/90 text-white text-[11px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-xs">
                          {tutor?.subject}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-xs ${isSoldOut ? "bg-red-500/90 text-white" : "bg-emerald-500/90 text-white"}`}>
                          {isSoldOut ? "No Seats Left" : `${availableSlots} Seats Open`}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col grow justify-between space-y-5">
                      <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 tracking-tight">
                          {tutor?.name}
                        </h2>
                        <p className="text-gray-500 dark:text-zinc-400 text-xs mt-1.5 font-semibold line-clamp-1 tracking-wide uppercase">
                          {tutor?.institution || "Expert Educator"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-b border-gray-100 dark:border-zinc-900 py-4">
                        <div>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500">
                            Course Fee
                          </p>
                          <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                            ৳{tutor?.fee}
                          </h3>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500">
                            Duration
                          </p>
                          <h3 className="text-sm font-bold text-gray-800 dark:text-zinc-200 mt-1.5 bg-gray-50 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-gray-500/5 dark:border-zinc-400/5">
                            {tutor?.courseDuration || "N/A"}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50/40 border border-blue-500/5 dark:bg-blue-950/10 dark:border-blue-400/5">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600/80 dark:text-blue-400/80">
                            Session Date
                          </p>
                          <h4 className="font-bold text-xs text-gray-800 dark:text-zinc-200 mt-0.5">
                            {tutor?.sessionStartDate || tutor?.courseStartMonth || "N/A"}
                          </h4>
                        </div>

                        <div className="w-6 h-0.5 bg-blue-500/20 dark:bg-blue-400/20 rounded-full"></div>

                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600/80 dark:text-blue-400/80">
                            Available Slots
                          </p>
                          <h4 className="font-bold text-xs text-gray-800 dark:text-zinc-200 mt-0.5">
                            {availableSlots} slots
                          </h4>
                        </div>
                      </div>

                      <div className={`w-full text-center py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-300 ${isSoldOut ? "bg-gray-200 dark:bg-zinc-900 text-gray-400 dark:text-zinc-600 cursor-not-allowed" : "bg-blue-600 group-hover:bg-blue-500 shadow-sm shadow-blue-600/5 group-hover:shadow-blue-600/15"}`}>
                        {isSoldOut ? "No Seats Available" : "Book Session"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filtered.length > viewLimit && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-600/5 hover:shadow-blue-600/15"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}