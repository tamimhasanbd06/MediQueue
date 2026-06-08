import "./globals.css";
import Nevber from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "MediQueue",
    template: "%s | MediQueue",
  },
  description: "MediQueue tutor booking system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Nevber />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            className:
              "dark:bg-zinc-900 dark:text-white bg-white text-black border dark:border-zinc-700",
          }}
        />
      </body>
    </html>
  );
}