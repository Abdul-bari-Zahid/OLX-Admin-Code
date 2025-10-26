import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { IoEyeOutline } from "react-icons/io5";
import { API } from "../../App";
// import { LuEyeClosed } from "react-icons/lu";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill out complete form");
    setLoading(true);

    try {
  const api = `${API}/api/auth/login`;
  const res = await axios.post(api, { email: email.toLowerCase(), password }, { withCredentials: true });

      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message || "Login successful");

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto h-[80vh] mt-15 p-6 rounded shadow mb-10 flex gap-6 justify-center items-center">
      <div className="md:w-[100%]">
        <h2 className="text-2xl font-bold mb-4">Login Admin</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex border rounded w-full h-[40px]">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                className="flex-1 px-3 py-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="px-2 text-xl text-gray-600"
              >
                {show ? <IoEyeOutline /> : <LuEyeClosed />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-red-800">
              Forget Password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? <ClipLoader size={25} color="white" /> : "Login Now"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-gray-700">Don’t Have an Account?</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border w-0.5 h-[25vh] hidden md:block"></div>

      {/* Image Section removed to avoid missing asset import */}
    </div>
  );
}
