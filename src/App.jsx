



import Sidebar from "./component/SideBar/Sidebar";
import Header from "./component/header/Header.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashdoard/Dashboard";
import Users from "./pages/User/User.jsx";
import Products from "./pages/Product/Product.jsx";
import Categories from "./pages/category/Cagegory.jsx";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const API = "https://olx-backend-code.vercel.app/";
function App() {
  const token = localStorage.getItem("token");
  // simple auth check; for dev: assume admin token present
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 min-h-screen p-6">
          <ToastContainer position="top-right" autoClose={2000} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/users" element={token ? <Users /> : <Navigate to="/login" />} />
            <Route path="/products" element={token ? <Products /> : <Navigate to="/login" />} />
            <Route path="/categories" element={token ? <Categories /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
