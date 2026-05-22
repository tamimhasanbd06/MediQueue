"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyTutorsPage() {
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

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/my-tutors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

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
      const token = localStorage.getItem("token");

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
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/tutors/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold animate-pulse">
          Loading your tutors...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        My Tutors
      </h1>

      {/* EMPTY STATE */}
      {tutors.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No tutors found. Add your first tutor.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border rounded-lg overflow-hidden">

            <thead className="bg-gray-100">
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
                  className="border-t text-center"
                >
                  <td className="p-3">{tutor.name}</td>
                  <td className="p-3">{tutor.subject}</td>
                  <td className="p-3">
                    {tutor.hourlyFee}
                  </td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() => openUpdate(tutor)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(tutor._id);
                        setIsDeleteOpen(true);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-100">

            <h2 className="text-xl font-bold mb-4">
              Update Tutor
            </h2>

            <input
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="border p-2 w-full mb-2"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              placeholder="Subject"
            />

            <input
              className="border p-2 w-full mb-2"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-87.5 text-center">

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