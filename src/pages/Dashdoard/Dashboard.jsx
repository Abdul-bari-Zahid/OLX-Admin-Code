const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold">Users</h3>
          <p className="text-3xl mt-2 font-bold">120</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold">Products</h3>
          <p className="text-3xl mt-2 font-bold">340</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-semibold">Orders</h3>
          <p className="text-3xl mt-2 font-bold">87</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
