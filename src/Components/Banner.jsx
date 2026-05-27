"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image:
      "https://s2.imgbb.ws/file/storage-sv2/xnFEA.png",
    badge: "Trusted Platform",
    heading: "Find Expert Tutors Anytime",
    subheading:
      "Connect with verified tutors and book personalized learning sessions easily.",
  },
  {
    id: 2,
    image:
      "https://s1.imgbb.ws/file/storage-sv1/xnF3X.png",
    badge: "Smart Booking",
    heading: "Book Sessions Instantly",
    subheading:
      "Manage your learning schedule with smooth and flexible booking system.",
  },
  {
    id: 3,
    image:
      "https://s2.imgbb.ws/file/storage-sv2/xnubQ.png",
    badge: "Future Learning",
    heading: "Upgrade Your Education",
    subheading:
      "Personalized tutoring that helps you learn faster and smarter every day.",
  },
];

export default function Banner() {
  return (
    <section className="relative w-full h-[75vh] sm:h-[85vh] lg:h-[88vh] overflow-hidden bg-black">

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade" loop speed={1200} autoplay={{
          delay: 4500,
          disableOnInteraction: false, }}
        className="w-full h-full">
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">

              {/* IMAGE */}
              <Image
                src={slide.image}
                alt={slide.heading}
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute inset-0 bg-blue-900/10" />

              {/* CONTENT */}
              <div className="relative z-20 flex items-center h-full">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 w-full">

                  <div className="max-w-3xl text-white space-y-4 sm:space-y-6">

                    {/* BADGE */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                      <p className="text-[10px] sm:text-xs md:text-sm tracking-widest uppercase text-blue-200">
                        {slide.badge}
                      </p>
                    </div>

                    {/* HEADING */}
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
                      {slide.heading}
                    </h1>

                    {/* SUBHEADING */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                      {slide.subheading}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-3 pt-2">

                      <Link
                        href="/tutors"
                        className="px-5 sm:px-7 py-3 sm:py-4 rounded-xl bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:scale-[1.03] transition"
                      >
                        Explore Tutors
                      </Link>

                      <Link
                        href="/login"
                        className="px-5 sm:px-7 py-3 sm:py-4 rounded-xl border border-white/30 text-white text-sm sm:text-base hover:bg-white hover:text-black transition"
                      >
                        Get Started
                      </Link>

                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 text-center sm:text-left">

                      <div>
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-400">
                          500+
                        </h3>
                        <p className="text-[10px] sm:text-sm text-gray-300">
                          Tutors
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-400">
                          10K+
                        </h3>
                        <p className="text-[10px] sm:text-sm text-gray-300">
                          Sessions
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-400">
                          98%
                        </h3>
                        <p className="text-[10px] sm:text-sm text-gray-300">
                          Satisfaction
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}