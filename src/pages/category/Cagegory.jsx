

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { API } from "../../App";

export default function Categories() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null); // track which category deleting

  const token = localStorage.getItem("token");

  // ✅ Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/categories`);
      setList(res.data);
    } catch {
      toast.error("Unable to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Add category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name cannot be empty");

    setAdding(true);
    const toastId = toast.info("Adding category...", { autoClose: false });

    try {
      const res = await axios.post(
        `${API}/api/categories`
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.update(toastId, {
        render: res.data.message || "Category added successfully",
        type: "success",
        autoClose: 2000,
      });

      setName("");
      fetchCategories();
    } catch (err) {
      const msg = err?.response?.data?.message || "Error adding category";
      toast.update(toastId, { render: msg, type: "error", autoClose: 2000 });
    } finally {
      setAdding(false);
    }
  };

  // ✅ Delete category
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeleting(id);
    try {
      const res = await axios.delete(`${API}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || "Category deleted successfully");
      fetchCategories();
    } catch (err) {
      const msg = err?.response?.data?.message || "Error deleting category";
      toast.error(msg);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Categories</h2>

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border px-4 py-2 rounded"
        />
        <button
          type="submit"
          disabled={adding}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {adding ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Category List */}
      <ul className="divide-y border-t">
        {list.length === 0 ? (
          <li className="py-4 text-center text-gray-500">No categories yet</li>
        ) : (
          list.map((c) => (
            <li
              key={c._id}
              className="py-3 px-4 hover:bg-gray-50 flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">{c.name}</span>
              <button
                onClick={() => handleDelete(c._id, c.name)}
                disabled={deleting === c._id}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <FaTrash />
                {deleting === c._id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
