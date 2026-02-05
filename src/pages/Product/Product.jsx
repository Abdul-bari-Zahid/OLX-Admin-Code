



import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEye, FiUser, FiEdit2 } from "react-icons/fi";
import { MdBlock, MdLockOpen } from "react-icons/md";
import { API } from "../../App";

 function Product() {
  const [products, setProducts] = useState([]);
  const  [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleBlock = async (id, current) => {
    try {
      await axios.put(
        `${API}/api/admin/product/${id}/block`,
        { block: !current },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(!current ? "Product blocked" : "Product unblocked");
      fetchProducts();
    } catch {
      toast.error("Error updating product");
    }
  };

  const handleView = (id) => {
    // window.open(`https://olx-frontend-code-78om.vercel.app/product/${id}`, "_blank");
    window.open(`http://localhost:5173/product/${id}`, "_blank");
  };

  const handleUserProfile = (userId) => {
    // window.open(`https://olx-frontend-code-78om.vercel.app/profile/${userId}`, "_blank");
    window.open(`http://localhost:5173/profile/${userId}`, "_blank");
  };

  const handleEdit = (id) => {
    window.location.href = `/admin/edit-product/${id}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🛍️ Product Management</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className={`p-4 border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                p.blocked ? "bg-red-50 border-red-300" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      p.images?.[0]
                        ? `${API}/${p.images[0]}`
                        : "/no-image.jpg"
                    }
                    alt={p.title}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {p.category} • Rs {p.price}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded by:{" "}
                      <span className="font-medium text-gray-800">
                        {p.email || "Unknown User"}
                      </span>
                    </p>
                    {p.blocked && (
                      <span className="text-xs mt-1 inline-block bg-red-200 text-red-700 px-2 py-0.5 rounded">
                        🔒 Blocked
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(p._id)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    <FiEye /> View
                  </button>

                  {/* <button
                    onClick={() => handleUserProfile(p.userId)}
                    className="flex items-center gap-1 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                  >
                    <FiUser /> User
                  </button> */}

                  {/* <button
                    onClick={() => handleEdit(p._id)}
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    <FiEdit2 /> Edit
                  </button> */}

                  <button
                    onClick={() => toggleBlock(p._id, p.blocked)}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
                      p.blocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {p.blocked ? (
                      <>
                        <MdLockOpen /> Unblock
                      </>
                    ) : (
                      <>
                        <MdBlock /> Block
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Product;