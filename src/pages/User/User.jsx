
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdLockOpen, MdBlock } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3002/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (id, current) => {
    try {
      await axios.put(
        `http://localhost:3002/api/admin/user/${id}/block`,
        { block: !current },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(!current ? "User Blocked" : "User Unblocked");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Error updating user status");
    }
  };

  const handleView = (userId) => {
    window.open(`http://localhost:5173/profile/${userId}`, "_blank");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">👥 User Management</h2>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg border">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Phone</th>
                <th className="px-4 py-3 border-b text-center">Role</th>
                <th className="px-4 py-3 border-b text-center">Status</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className={`hover:bg-gray-50 ${
                    u.blocked ? "bg-red-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 border-b font-medium text-gray-800">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 border-b text-gray-600">{u.phone}</td>
                  <td className="px-4 py-3 border-b text-center">
                    {u.role || "User"}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    {u.blocked ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                        🔒 Blocked
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        ✅ Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => toggleBlock(u._id, u.blocked)}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
                          u.blocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {u.blocked ? (
                          <>
                            <MdLockOpen /> Unblock
                          </>
                        ) : (
                          <>
                            <MdBlock /> Block
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleView(u._id)}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        <FiUser /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
