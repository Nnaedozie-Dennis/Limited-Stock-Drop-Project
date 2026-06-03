const DashboardHome = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <p className="mt-3 text-gray-500">Welcome back to Aether.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-gray-500">Active Reservations</h3>

          <p className="mt-3 text-4xl font-bold">3</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-gray-500">Orders</h3>

          <p className="mt-3 text-4xl font-bold">12</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-gray-500">Amount Spent</h3>

          <p className="mt-3 text-4xl font-bold">$2,450</p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h2 className="text-xl font-semibold">Recent Activity</h2>

        <div className="mt-6 space-y-4">
          <div>Reserved Air Jordan Retro High</div>

          <div>Completed Order #ATH-102938</div>

          <div>Reserved Nike Dunk Low</div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
