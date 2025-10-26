import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, subMonths } from "date-fns";
import { setupAxios } from "../../axiosSetup";
import { API } from "../../App";

const BarChart = ({ labels, values }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="w-full">
      <div className="flex items-end gap-3 h-48 px-2">
        {values.map((v, i) => {
          const height = (v / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                title={`${labels[i]}: ${v}`}
                className="w-full bg-blue-500 rounded-t-md transition-all"
                style={{ height: `${height}%` }}
              />
              <div className="text-xs text-center mt-2 text-gray-600">{labels[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [monthlyValues, setMonthlyValues] = useState([]);
  const [monthlyLabels, setMonthlyLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ensure axios has Authorization header if token present
    setupAxios();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const base = `${API}`;
      const [usersRes, productsRes, categoriesRes] = await Promise.all([
        axios.get(`${base}/api/admin/users`),
        axios.get(`${base}/api/admin/products`),
        axios.get(`${base}/api/categories`),
      ]);

      const users = Array.isArray(usersRes.data) ? usersRes.data : [];
      const products = Array.isArray(productsRes.data) ? productsRes.data : [];
      const categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];

      setUsersCount(users.length);
      setProductsCount(products.length);
      setCategoriesCount(categories.length);

      // prepare last 6 months labels (can change to 12 if desired)
      const months = [];
      const monthKeys = [];
      for (let i = 5; i >= 0; i--) {
        const d = subMonths(new Date(), i);
        months.push(format(d, "MMM"));
        monthKeys.push(format(d, "yyyy-MM"));
      }

      const counts = monthKeys.map(() => 0);
      products.forEach((p) => {
        const created = p.createdAt ? new Date(p.createdAt) : null;
        if (!created) return;
        const key = format(created, "yyyy-MM");
        const idx = monthKeys.indexOf(key);
        if (idx !== -1) counts[idx]++;
      });

      setMonthlyLabels(months);
      setMonthlyValues(counts);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-sm font-semibold text-gray-500">Users</h3>
          <p className="text-3xl mt-2 font-bold text-gray-800">{usersCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-sm font-semibold text-gray-500">Products</h3>
          <p className="text-3xl mt-2 font-bold text-gray-800">{productsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-sm font-semibold text-gray-500">Categories</h3>
          <p className="text-3xl mt-2 font-bold text-gray-800">{categoriesCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Added Products</h3>
        {loading ? (
          <div className="text-gray-500">Loading chart...</div>
        ) : (
          <BarChart labels={monthlyLabels} values={monthlyValues} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
