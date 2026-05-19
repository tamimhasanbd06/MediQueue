"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    heading: "Find Expert Tutors Anytime",
    subheading:
      "Connect with verified subject specialists, schedule smarter sessions, and accelerate your learning journey.",
    badge: "Trusted Learning Platform",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop",
    heading: "Book Smarter Learn Better",
    subheading:
      "Flexible tutor schedules, instant booking, secure digital tokens, and seamless education management.",
    badge: "Smart Session Booking",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=1600&auto=format&fit=crop",
    heading: "Upgrade Your Academic Future",
    subheading:
      "From personalized learning to professional tutoring, MediQueue simplifies your success.",
    badge: "Premium Education Experience",
  },
];

export default function Banner() {
  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] lg:h-screen overflow-hidden bg-black">

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        speed={1800}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >

        {slides?.map((slide) => (
          <SwiperSlide key={slide?.id}>
            <div className="relative w-full h-full">

              {/* IMAGE */}
              <img
                src={slide?.image}
                alt={slide?.heading}
                className="absolute inset-0 w-full h-full object-cover scale-105 animate-slowZoom"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

              {/* BLUE GLOW */}
              <div className="absolute inset-0 bg-blue-900/10" />

              {/* CONTENT */}
              <div className="relative z-20 flex items-center h-full">

                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full">

                  <div className="max-w-4xl text-white">

                    {/* BADGE */}
                    <div className="inline-flex items-center px-5 py-2 rounded-full border border-blue-400/40 bg-blue-500/10 backdrop-blur-md mb-6 animate-fadeUp">

                      <span className="text-blue-300 text-sm md:text-base font-medium tracking-wide uppercase">
                        {slide?.badge}
                      </span>

                    </div>

                    {/* HEADING */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-[1.1] mb-6 animate-fadeUp delay-100">

                      {slide?.heading}

                    </h1>

                    {/* SUBHEADING */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl mb-10 animate-fadeUp delay-200">

                      {slide?.subheading}

                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-5 animate-fadeUp delay-300">

                      <Link
                        href="/tutors"
                        className="group relative px-8 py-4 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white text-base md:text-lg shadow-2xl transition duration-500 overflow-hidden"
                      >

                        <span className="relative z-10">
                          Browse Tutors
                        </span>

                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-500" />

                      </Link>

                      <Link
                        href="/register"
                        className="px-8 py-4 md:px-10 md:py-5 border-2 border-white/70 hover:border-blue-400 hover:bg-white hover:text-black rounded-xl font-semibold text-white text-base md:text-lg backdrop-blur-md transition duration-500"
                      >

                        Join Now

                      </Link>

                    </div>

                    {/* STATS */}
                    <div className="flex flex-wrap gap-8 mt-14 text-white animate-fadeUp delay-500">

                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-blue-400">
                          500+
                        </h3>

                        <p className="text-sm md:text-base text-gray-300">
                          Active Tutors
                        </p>
                      </div>

                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-blue-400">
                          10K+
                        </h3>

                        <p className="text-sm md:text-base text-gray-300">
                          Sessions Booked
                        </p>
                      </div>

                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-blue-400">
                          98%
                        </h3>

                        <p className="text-sm md:text-base text-gray-300">
                          Satisfaction Rate
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