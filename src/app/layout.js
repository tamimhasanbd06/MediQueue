import "./globals.css";
import Nevber from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { ToastContainer } from "react-toastify/unstyled";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nevber />
        {children}
        <Footer />
        <Toaster position="top-right" />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
