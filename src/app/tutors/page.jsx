
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

      <section className="min-h-screen px-3 xs:px-4 sm:px-6 md:px-10 py-8 xs:py-12 md:py-16 transition-colors duration-500 bg-linear-to-br from-slate-50 via-slate-100 to-zinc-200 dark:from-[#030712] dark:via-[#090d16] dark:to-[#020617] overflow-x-hidden">
        <div className="absolute top-0 left-1/4 w-60 h-60 xs:w-72 xs:h-72 md:w-96 md:h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 xs:w-72 xs:h-72 md:w-96 md:h-96 bg-blue-600/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative text-center mb-8 xs:mb-12 md:mb-16 z-10 px-1">
          <span className="inline-block text-[9px] xs:text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 px-2.5 py-1.5 bg-blue-50 dark:bg-zinc-900 border border-blue-500/10 dark:border-blue-400/10 rounded-xl max-w-full truncate">
            Expert Learning Network
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-3 xs:mt-5 tracking-tight break-words leading-tight">
            Find Your <span className="text-blue-600 dark:text-blue-400">Tutor</span>
          </h1>
          <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-500 dark:text-zinc-400 mt-2.5 xs:mt-4 max-w-2xl mx-auto font-medium leading-relaxed">
            Search and filter professional tutors easily with a premium learning experience custom-built for you.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto mb-8 xs:mb-12 md:mb-14 rounded-xl xs:rounded-2xl md:rounded-3xl p-3 xs:p-4 sm:p-5 md:p-6 border transition-all duration-300 bg-white border-blue-500/20 shadow-[0_8px_30px_rgba(59,130,246,0.02)] dark:bg-zinc-950 dark:border-blue-400/20 hover:border-blue-500/30 dark:hover:border-blue-400/30 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="w-full">
              <input 
                placeholder="Tutor name" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="p-3 xs:p-3.5 sm:p-4 text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl sm:rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:placeholder:text-zinc-500 dark:focus:border-blue-500" 
              />
            </div>

            <div className="w-full">
              <input 
                placeholder="Subject" 
                value={subjectText}
                onChange={(e) => setSubjectText(e.target.value)}
                className="p-3 xs:p-3.5 sm:p-4 text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl sm:rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:placeholder:text-zinc-500 dark:focus:border-blue-500" 
              />
            </div>

            <div className="w-full relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-3 xs:p-3.5 sm:p-4 text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl sm:rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:focus:border-blue-500 min-h-[44px] xs:min-h-[50px] sm:min-h-[56px]"
              />
            </div>

            <div className="w-full relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-3 xs:p-3.5 sm:p-4 text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl sm:rounded-2xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-500/5 w-full bg-white border-blue-500/15 text-gray-900 focus:border-blue-600 shadow-2xs dark:bg-zinc-900 dark:border-blue-400/15 dark:text-blue-400 dark:placeholder:text-zinc-500 dark:focus:border-blue-500 min-h-[44px] xs:min-h-[50px] sm:min-h-[56px]"
              />
            </div>

            <div className="w-full sm:col-span-2 lg:col-span-1">
              <button
                onClick={resetAll}
                className="p-3 xs:p-3.5 sm:p-4 text-xs xs:text-sm sm:text-base rounded-lg xs:rounded-xl sm:rounded-2xl w-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-blue-600/5 hover:shadow-blue-600/15"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 md:py-32 relative z-10">
            <div className="w-8 h-8 xs:w-11 xs:h-11 sm:w-14 sm:h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 md:py-24 relative z-10 bg-white dark:bg-zinc-950 rounded-xl xs:rounded-2xl md:rounded-3xl max-w-7xl mx-auto border border-blue-500/10 dark:border-blue-400/10 p-5 xs:p-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mb-2 break-words">
              No Tutors Match Your Criteria
            </h2>
            <p className="text-gray-500 dark:text-zinc-400 max-w-sm mx-auto font-medium text-[11px] xs:text-xs sm:text-sm leading-relaxed">
              Try adjusting your search criteria parameters or clearing active filters to refresh available lists.
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-12 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">
              {visibleTutors.map((tutor) => {
                const availableSlots = Number(tutor?.totalSeats ?? tutor?.totalSlot ?? 0);
                const isSoldOut = availableSlots <= 0;

                return (
                  <Link 
                    key={tutor?._id} 
                    href={`/tutors/${tutor?._id}`}
                    className="group rounded-xl xs:rounded-2xl md:rounded-3xl overflow-hidden flex flex-col border transition-all duration-300 bg-white border-blue-500/15 shadow-[0_4px_25px_rgba(59,130,246,0.015)] hover:border-blue-500/40 hover:shadow-[0_12px_35px_rgba(59,130,246,0.08)] sm:hover:-translate-y-1 dark:bg-zinc-950 dark:border-blue-400/15 dark:shadow-none dark:hover:border-blue-400/40 dark:hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] w-full" 
                  >
                    <div className="relative h-44 xs:h-52 sm:h-56 md:h-64 overflow-hidden bg-gray-100 dark:bg-zinc-900 w-full">
                      <Image
                        src={tutor?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                        alt={tutor?.name || "Tutor Portrait"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 sm:group-hover:scale-[1.03]"
                      />
                      
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent"></div>

                      <div className="absolute top-2.5 left-2.5 xs:top-4 xs:left-4 max-w-[50%]">
                        <span className="block px-2 py-1 xs:px-3.5 xs:py-1.5 rounded-md xs:rounded-xl bg-blue-600/90 text-white text-[8px] xs:text-[11px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-xs truncate">
                          {tutor?.subject}
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 xs:top-4 xs:right-4 max-w-[50%]">
                        <span className={`block px-2 py-1 xs:px-3.5 xs:py-1.5 rounded-md xs:rounded-xl text-[8px] xs:text-[11px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-xs truncate ${isSoldOut ? "bg-red-500/90 text-white" : "bg-emerald-500/90 text-white"}`}>
                          {isSoldOut ? "No Seats" : `${availableSlots} Seats`}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 xs:p-5 md:p-6 flex flex-col grow justify-between space-y-3.5 xs:space-y-5">
                      <div>
                        <h2 className="text-base xs:text-lg sm:text-xl font-black text-gray-900 dark:text-white sm:group-hover:text-blue-600 dark:sm:group-hover:text-blue-400 transition-colors line-clamp-1 tracking-tight">
                          {tutor?.name}
                        </h2>
                        <p className="text-gray-500 dark:text-zinc-400 text-[10px] xs:text-xs mt-1 xs:mt-1.5 font-semibold line-clamp-1 tracking-wide uppercase">
                          {tutor?.institution || "Expert Educator"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-b border-gray-100 dark:border-zinc-900 py-2.5 xs:py-4 gap-1">
                        <div className="min-w-0 flex-1">
                          <p className="text-[8px] xs:text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 truncate">
                            Course Fee
                          </p>
                          <h3 className="text-lg xs:text-2xl font-black text-blue-600 dark:text-blue-400 mt-0.5 truncate">
                            ৳{tutor?.fee}
                          </h3>
                        </div>

                        <div className="text-right min-w-0 flex-1">
                          <p className="text-[8px] xs:text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 truncate">
                            Duration
                          </p>
                          <h3 className="text-[10px] xs:text-sm font-bold text-gray-800 dark:text-zinc-200 mt-1 bg-gray-50 dark:bg-zinc-900 px-1.5 xs:px-2.5 py-0.5 xs:py-1 rounded-md xs:rounded-lg border border-gray-500/5 dark:border-zinc-400/5 truncate inline-block max-w-full">
                            {tutor?.courseDuration || "N/A"}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-2 py-2 xs:px-4 xs:py-3 rounded-lg xs:rounded-xl bg-blue-50/40 border border-blue-500/5 dark:bg-blue-950/10 dark:border-blue-400/5 gap-1">
                        <div className="min-w-0 flex-1">
                          <p className="text-[8px] xs:text-[10px] font-bold uppercase tracking-wider text-blue-600/80 dark:text-blue-400/80 truncate">
                            Session Date
                          </p>
                          <h4 className="font-bold text-[10px] xs:text-xs text-gray-800 dark:text-zinc-200 mt-0.5 truncate">
                            {tutor?.sessionStartDate || tutor?.courseStartMonth || "N/A"}
                          </h4>
                        </div>

                        <div className="w-3 xs:w-6 h-0.5 bg-blue-500/20 dark:bg-blue-400/20 rounded-full shrink-0"></div>

                        <div className="text-right min-w-0 flex-1">
                          <p className="text-[8px] xs:text-[10px] font-bold uppercase tracking-wider text-blue-600/80 dark:text-blue-400/80 truncate">
                            Available Slots
                          </p>
                          <h4 className="font-bold text-[10px] xs:text-xs text-gray-800 dark:text-zinc-200 mt-0.5 truncate">
                            {availableSlots} slots
                          </h4>
                        </div>
                      </div>

                      <div className={`w-full text-center py-2.5 xs:py-3.5 rounded-lg xs:rounded-xl text-white font-bold text-xs xs:text-sm tracking-wide transition-all duration-300 ${isSoldOut ? "bg-gray-200 dark:bg-zinc-900 text-gray-400 dark:text-zinc-600 cursor-not-allowed" : "bg-blue-600 sm:group-hover:bg-blue-500 shadow-sm shadow-blue-600/5 sm:group-hover:shadow-blue-600/15"}`}>
                        {isSoldOut ? "No Seats Available" : "Book Session"}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filtered.length > viewLimit && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-5 py-2.5 xs:px-8 xs:py-3.5 rounded-lg xs:rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs xs:text-base transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-600/5 hover:shadow-blue-600/15"
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

