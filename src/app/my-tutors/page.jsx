"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { saveAuthToken } from "@/lib/auth-client";

export default function MyTutorsPage() {
  const router = useRouter();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [modal, setModal] = useState({
    update: false,
    delete: false,
    success: false,
  });

  const [form, setForm] = useState({});

  // FETCH
  const fetchTutors = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      if (!token) return router.push("/login");

      const res = await fetch(`${API_URL}/my-tutors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setTutors(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  // OPEN UPDATE
  const openUpdate = (tutor) => {
    setSelectedTutor(tutor);
    setForm({ ...tutor });
    setModal((m) => ({ ...m, update: true }));
  };

  // CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    const numberFields = ["hourlyFee", "totalSeats", "maxStudents", "fee"];

    if (numberFields.includes(name) && Number(value) < 0) {
      toast.error("Negative value not allowed");
      return;
    }

    setForm({ ...form, [name]: value });
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      setSaving(true);

      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      const res = await fetch(
        `${API_URL}/tutors/${selectedTutor._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTutors((prev) =>
        prev.map((t) =>
          t._id === selectedTutor._id ? { ...t, ...form } : t
        )
      );

      toast.success("Updated successfully");

      setModal({ update: false, delete: false, success: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        (await saveAuthToken());

      const tutor = tutors.find((t) => t._id === deleteId);

      const res = await fetch(`${API_URL}/tutors/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTutors((prev) => prev.filter((t) => t._id !== deleteId));

      toast.success(`${tutor?.name} deleted`);

      setModal({ update: false, delete: false, success: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredTutors = tutors.filter((t) =>
    `${t.name} ${t.subject}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-white via-blue-50 to-slate-100 dark:from-black dark:via-[#020817] dark:to-blue-950">

      <h1 className="text-center text-4xl md:text-6xl font-black mb-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
        My Tutors Dashboard
      </h1>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-8 flex items-center gap-2 p-4 rounded-2xl bg-white dark:bg-zinc-900 border">
        <FaSearch />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tutors..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto overflow-x-auto rounded-3xl border shadow-2xl bg-white dark:bg-black/40">
        <table className="w-full min-w-[900px]">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-5 text-left">Tutor</th>
              <th>Subject</th>
              <th>Fee</th>
              <th>Students</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTutors.map((tutor) => (
              <tr key={tutor._id} className="border-b dark:border-zinc-800">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {tutor.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{tutor.name}</p>
                    <p className="text-xs text-gray-500">{tutor.institution}</p>
                  </div>
                </td>

                <td className="text-center">{tutor.subject}</td>
                <td className="text-center text-green-600">৳{tutor.hourlyFee}</td>
                <td className="text-center">{tutor.totalSeats}</td>
                <td className="text-center">{tutor.location}</td>

                <td className="text-center flex justify-center gap-2 p-3">
                  <button
                    onClick={() => openUpdate(tutor)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-xl"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(tutor._id);
                      setModal((m) => ({ ...m, delete: true }));
                    }}
                    className="px-3 py-2 bg-red-600 text-white rounded-xl"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE MODAL (70vh FIXED) */}
      {modal.update && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[70vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-3xl p-6">

            <h2 className="text-2xl font-bold text-center mb-6">
              Update Tutor
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "name",
                "subject",
                "photoURL",
                "hourlyFee",
                "availableDays",
                "availableTime",
                "location",
                "institution",
                "experience",
                "teachingMode",
                "courseStartMonth",
                "courseEndMonth",
                "totalSeats",
                "maxStudents",
                "courseDuration",
                "fee",
              ].map((key) => (
                <div key={key}>
                  <label className="text-sm font-semibold capitalize">
                    {key}
                  </label>
                  <input
                    name={key}
                    value={form[key] || ""}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl mt-1"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModal((m) => ({ ...m, update: false }))}
                className="px-5 py-2 bg-gray-500 text-white rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-green-600 text-white rounded-xl"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {modal.delete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl text-center">
            <FaTrash className="text-red-500 text-5xl mx-auto mb-4" />

            <h2 className="text-xl font-bold mb-4">Delete Tutor?</h2>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setModal((m) => ({ ...m, delete: false }))}
                className="px-4 py-2 bg-gray-500 text-white rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {modal.success && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl text-center">
            <h2 className="text-xl font-bold text-green-600">
              Success!
            </h2>

            <button
              onClick={() => setModal((m) => ({ ...m, success: false }))}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}