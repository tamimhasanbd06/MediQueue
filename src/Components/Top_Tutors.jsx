"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/tutors`, {
          cache: "no-store",
        });

        const data = await res.json();

        setTutors(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [API_URL]);

  return (
    <section
      className=" relative  py-16  sm:py-24  px-4  overflow-hidden  transition-colors  duration-500 bg-linear-to-b  from-slate-50  via-blue-50/30  to-slate-50  dark:from-[#030712]  dark:via-[#0b1528]  dark:to-[#030712]" >
   
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative text-center mb-12 sm:mb-16 z-10">
        <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-100 dark:bg-blue-950/50 rounded-full">
          Expert Instruction
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
          Featured <span className="text-blue-600 dark:text-blue-400">Tutors</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
          Connect with top-rated experts handpicked for your academic success.
        </p>
      </div>


      {loading ? (
        <div className="relative flex justify-center py-24 z-10">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 z-10">
          {tutors.map((tutor) => (
            <div key={tutor?._id}
              className=" group rounded-2xl overflow-hidden flex flex-col transition-all duration-300backdrop-blur-md

                /* LIGHT MODE: Thin Blue Border & Soft Glow */

                 bg-white/80 border border-blue-500/30 shadow-[0_4px_20px_rgba(59,130,246,0.06)] hover:border-blue-500/60 hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)] hover:-translate-y-1
               
                 /* DARK MODE: Thin Blue Border & Adaptive Dark Glow */

                 dark:bg-slate-900/80 dark:border-blue-400/30 dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] dark:hover:border-blue-400/60 dark:hover:shadow-[0_12px_35px_rgba(37,99,235,0.2)]">
              {/* IMAGE WRAPPER */}
              <Link href={`/tutors/${tutor?._id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={tutor?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={tutor?.name || "Tutor profile picture"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent opacity-60"></div>

                {/* SUBJECT BADGE ON IMAGE */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md shadow-md backdrop-blur-xs bg-opacity-90">
                    {tutor?.subject}
                  </span>
                </div>
              </Link>

             
              <div className="p-5 sm:p-6 flex flex-col grow">
                
   
                <div className="flex justify-between items-start gap-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {tutor?.name}
                  </h3>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">
                      ৳{tutor?.fee}
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block -mt-1">per session</span>
                  </div>
                </div>

                <hr className="border-slate-100 dark:border-slate-800/60 mb-4" />

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 grow">
                  
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <p>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        Subject:
                      </span>{" "}
                      <span className="font-medium text-slate-800 dark:text-slate-200">{tutor?.subject}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <p>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        Start Month:
                      </span>{" "}
                      <span className="font-medium text-slate-800 dark:text-slate-200">{tutor?.courseStartMonth}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    <p>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        End Month:
                      </span>{" "}
                      <span className="font-medium text-slate-800 dark:text-slate-200">{tutor?.courseEndMonth}</span>
                    </p>
                  </div>

                </div>

                {/* ACTION BUTTON */}
                <div className="mt-6">
                  <Link
                    href={`/tutors/${tutor?._id}`}
                    className=" block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 active:scale-[0.98]" >
                    Book Session
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}