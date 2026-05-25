"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { saveAuthToken } from "@/lib/auth-client";

export default function MyTutorsPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [form, setForm] = useState({});

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // =========================
  // FETCH MY TUTORS
  // =========================
  const fetchTutors = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/my-tutors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to load tutors"
        );
      }

      setTutors(data || []);
    } catch (err) {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  // =========================
  // OPEN UPDATE MODAL
  // =========================
  const openUpdate = (tutor) => {
    setSelectedTutor(tutor);

    setForm({
      name: tutor.name || "",
      subject: tutor.subject || "",
      hourlyFee: tutor.hourlyFee || "",
      photoURL: tutor.photoURL || "",
    });

    setIsUpdateOpen(true);
  };

  // =========================
  // UPDATE TUTOR
  // =========================
  const handleUpdate = async () => {
    if (!selectedTutor?._id) return;

    try {
      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${API_URL}/tutors/${selectedTutor._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            hourlyFee: Number(form.hourlyFee),
          }),
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Updated successfully");

      setIsUpdateOpen(false);
      fetchTutors();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // =========================
  // DELETE TUTOR
  // =========================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${API_URL}/tutors/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (!res.ok) throw new Error(data.message);

      toast.success("Deleted successfully");

      setIsDeleteOpen(false);
      setDeleteId(null);

      // faster UI update (no refetch needed)
      setTutors((prev) =>
        prev.filter((t) => t._id !== deleteId)
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white">
        <p className="text-lg font-semibold animate-pulse">
          Loading your tutors...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto bg-white dark:bg-black text-gray-900 dark:text-white">

      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-yellow-300 dark:via-pink-400 dark:to-cyan-300 bg-clip-text text-transparent">
        My Tutors
      </h1>

      {/* EMPTY STATE */}
      {tutors.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-300">
          No tutors found. Add your first tutor.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">

            <thead className="bg-gray-100 dark:bg-zinc-900">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tutors.map((tutor) => (
                <tr
                  key={tutor._id}
                  className="border-t border-gray-200 dark:border-zinc-700 text-center"
                >
                  <td className="p-3">{tutor.name}</td>
                  <td className="p-3">{tutor.subject}</td>
                  <td className="p-3">
                    {tutor.hourlyFee}
                  </td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() => openUpdate(tutor)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(tutor._id);
                        setIsDeleteOpen(true);
                      }}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      {/* ================= UPDATE MODAL ================= */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white p-6 rounded w-[400px] max-w-full dark:border dark:border-zinc-700">

            <h2 className="text-xl font-bold mb-4">
              Update Tutor
            </h2>

            <input
              className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white p-2 w-full mb-2 outline-none"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white p-2 w-full mb-2 outline-none"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              placeholder="Subject"
            />

            <input
              className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black text-gray-900 dark:text-white p-2 w-full mb-2 outline-none"
              value={form.hourlyFee}
              onChange={(e) =>
                setForm({
                  ...form,
                  hourlyFee: e.target.value,
                })
              }
              placeholder="Fee"
            />

            <div className="flex justify-end gap-2 mt-4">

              <button
                onClick={() => setIsUpdateOpen(false)}
                className="px-3 py-1 bg-gray-400 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-600 text-white"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white p-6 rounded w-[350px] max-w-full text-center dark:border dark:border-zinc-700">

            <h2 className="text-lg font-bold mb-4">
              Are you sure?
            </h2>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-1 bg-gray-400 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-1 bg-red-600 text-white"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}