// import { Package, ShoppingBag, Clock3, Wallet } from "lucide-react";

// const AdminDashboard = () => {
//   return (
//     <>
//       <h1 className="text-4xl font-bold">Admin Dashboard</h1>

//       <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//         <div className="rounded-3xl border p-6">
//           <Package />
//           <h3 className="mt-4 text-3xl font-bold">25</h3>
//           <p>Total Products</p>
//         </div>

//         <div className="rounded-3xl border p-6">
//           <ShoppingBag />
//           <h3 className="mt-4 text-3xl font-bold">48</h3>
//           <p>Total Orders</p>
//         </div>

//         <div className="rounded-3xl border p-6">
//           <Clock3 />
//           <h3 className="mt-4 text-3xl font-bold">12</h3>
//           <p>Reservations</p>
//         </div>

//         <div className="rounded-3xl border p-6">
//           <Wallet />
//           <h3 className="mt-4 text-3xl font-bold">$4,580</h3>
//           <p>Revenue</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminDashboard;









import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Package, ShoppingBag, Clock3, Wallet } from "lucide-react";

interface AdminStats {
  products: number;
  reservations: number;
  orders: number;
  revenue: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");

        setStats(res.data.stats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading admin dashboard...</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <p className="mt-2 text-gray-500">Overview of your store activity.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border  p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <Package />
          </div>

          <p className="mt-4 text-sm text-gray-500">Total Products</p>

          <h3 className="mt-2 text-4xl font-bold">{stats?.products}</h3>
        </div>

        <div className="rounded-3xl border bg-yellow p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <Clock3 />
          </div>

          <p className="mt-4 text-sm text-gray-500">Reservations</p>

          <h3 className="mt-2 text-4xl font-bold">{stats?.reservations}</h3>
        </div>

        <div className="rounded-3xl border  p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <ShoppingBag />
          </div>

          <p className="mt-4 text-sm text-gray-500">Orders</p>

          <h3 className="mt-2 text-4xl font-bold">{stats?.orders}</h3>
        </div>

        <div className="rounded-3xl border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <Wallet />
          </div>

          <p className="mt-4 text-sm text-gray-500">Revenue</p>

          <h3 className="mt-2 text-4xl font-bold">
            ${stats?.revenue.toFixed(2)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;