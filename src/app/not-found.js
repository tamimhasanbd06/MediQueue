
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        
  
        <div className="text-center lg:text-left">
          <h1 className="text-[110px] sm:text-[140px] md:text-[170px] font-black text-blue-400 leading-none drop-shadow-lg">
            404
          </h1>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4">
            Page Not Found
          </h2>

          <p className="text-slate-300 mt-5 text-base sm:text-lg leading-7 max-w-xl">
            Sorry, the page you are looking for doesn’t exist or may have been
            moved. Please return to the homepage and continue exploring the
            platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/">
              <button className="px-7 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-semibold shadow-lg hover:scale-105">
                Back To Home
              </button>
            </Link>

            <Link href="/tutors">
              <button className="px-7 py-3 rounded-xl border border-slate-500 text-slate-200 hover:bg-slate-800 transition-all duration-300 font-semibold hover:scale-105">
                Explore Tutors
              </button>
            </Link>
          </div>
        </div>

        
        <div className="flex justify-center">
          <div className="relative">

            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

           
            <div className="relative w-70 sm:w-87.5 md:w-105 h-70 sm:h-87.5 md:h-[105 rounded-[40px] border border-slate-700 bg-slate-900/70 backdrop-blur-xl flex items-center justify-center shadow-2xl overflow-hidden">
              
        
              <div className="absolute w-60 h-60 rounded-full bg-blue-500/10 border border-blue-400/20 animate-pulse"></div>

          
              <div className="text-center z-10">
                <h1 className="text-7xl sm:text-8xl font-black text-blue-400">
                  !
                </h1>

                <p className="text-slate-300 mt-4 text-lg font-medium">
                  Oops! Something went wrong.
                </p>
              </div>

          
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}