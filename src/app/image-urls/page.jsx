"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowLeft, UploadCloud, ExternalLink, CheckCircle2, X, Copy } from "lucide-react";

export default function ImageUrlsPage() {
  useEffect(() => {
    document.title = "MediQueue | Image URL Helper";
  }, []);

  const router = useRouter();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [localPreview, setLocalPreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  const handleBackToProfile = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/profile");
    }
  };

  const handleRedirectToImgBB = () => {
    window.open("https://imgbb.ws/upload/?lang=en", "_blank", "noopener,noreferrer");
  };

  const isValidImageUrl = (url) => {
    return /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  };

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreview(reader.result);
      setImageUrl("");
      toast.success("Image loaded locally");
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    const trimmedUrl = imageUrl.trim();
    if (!trimmedUrl) return toast.error("Enter an image URL");

    if (!isValidImageUrl(trimmedUrl)) {
      toast.error("Invalid image URL. Must end with .jpg, .jpeg, .png, .webp, or .gif");
      return;
    }

    setLocalPreview(trimmedUrl);
    toast.success("Remote image preview loaded");
  };

  const copyToClipboard = async () => {
    const linkToCopy = imageUrl.trim() || localPreview;
    if (!linkToCopy || linkToCopy.startsWith("data:")) {
      toast.error("No valid public web link to copy yet");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(linkToCopy);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Copy failed");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  const clearAll = () => {
    setLocalPreview("");
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Head>
        <title>MediQueue | Image URL Generator</title>
      </Head>

      <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#020617] dark:via-[#050816] dark:to-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">

        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden"/>

        <div className="w-full max-w-2xl rounded-3xl border border-slate-200/60 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl p-6 sm:p-10 transition-all">


          <div className="flex justify-between items-center border-b pb-4 mb-6 border-slate-200/60 dark:border-slate-800/50">
            <button
              onClick={handleBackToProfile}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-all active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <span className="text-xs font-bold text-blue-500 tracking-widest uppercase">
              Image Link Tool
            </span>
          </div>

     
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
              Image URL Generator
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Verify layouts locally or paste your generated external ImgBB direct image links.
            </p>
          </div>


          <div className="flex gap-2 mb-6">
            <input
              type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste direct URL (e.g., https://i.ibb.co/image.png)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 text-sm outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"/>

            <button
              onClick={handleUrlSubmit}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/10 transition-all active:scale-[0.98]" >
              Load
            </button>
          </div>



          <div className="mb-6">
            {!localPreview ? (
              <div
                onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
                className={`p-10 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-200 group ${
                  dragActive
                    ? "border-blue-500 bg-blue-500/5 scale-[0.99]"
                    : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-slate-50/30 dark:bg-slate-950/10"
                }`}
              >
                <UploadCloud className="mx-auto w-8 h-8 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mb-3 animate-pulse" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Drop image here, or <span className="text-blue-600 dark:text-blue-400 hover:underline">browse files</span>
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  Supports local PNG, JPG, JPEG, WEBP or GIF file configurations
                </p>
              </div>
            ) : (
              <div className="relative p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 animate-in fade-in zoom-in-95 duration-200">
                
                {/* Action Controls */}
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                  {imageUrl && (
                    <button
                      onClick={copyToClipboard}
                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-sm transition"
                      title="Copy Image URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={clearAll}
                    className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-red-500 hover:border-red-200 dark:hover:border-red-950 text-slate-400 shadow-sm transition"
                    title="Clear Preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>


                <div className="flex flex-col sm:flex-row gap-5 items-center">
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden ring-4 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-800 shadow-md shrink-0">
                    <Image
                      src={localPreview}
                      alt="Active validation viewport container"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center sm:text-left min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Layout Processing Verified
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Configuration looks ready!
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">
                      {imageUrl ? "Displaying remote reference location" : "Displaying unsaved local media file buffer"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

   
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-950/40">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Need a permanent link?</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Upload your file to ImgBB and pick the <strong className="text-blue-600 dark:text-blue-400 font-semibold">Direct links</strong> setting.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRedirectToImgBB}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-600/10 transition-all active:scale-[0.98]"
            >
              Open ImgBB Upload
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}