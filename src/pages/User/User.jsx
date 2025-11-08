
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { FiUser } from "react-icons/fi";
import { setupAxios } from "../../axiosSetup";
import { API } from "../../App";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log("Fetching users from API:", `${API}/api/admin/users`);
      const res = await axios.get(`${API}/api/users`);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ensure axios has the Authorization header (if token present)
    setupAxios();
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">👥 User List</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">Loading users...</div>
        </div>
      ) : users.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </h3>
                <p className="text-sm text-gray-500">
  Joined{" "}
  {user.createdAt
    ? format(new Date(user.createdAt), "MMM dd, yyyy")
    : "N/A"}
</p>
                    <p className="text-sm text-gray-500">Email: {user.email}</p>
                    <p className="text-sm text-gray-500">Phone: {user.phone || "N/A"}</p>
                    <div className="mt-2">  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;