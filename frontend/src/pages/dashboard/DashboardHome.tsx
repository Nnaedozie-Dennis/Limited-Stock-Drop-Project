import { ShoppingBag, Clock3, Wallet, Heart, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
// import { useAuth } from "../../context/AuthContext";



interface DashboardStats {
  reservations: number;
  orders: number;
  totalSpent: number;
}



const DashboardHome = () => {

  // const { user } = useAuth();

  // console.log(user);
  // console.log(user?.profile?.is_admin);

    const [stats, setStats] = useState<DashboardStats | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const res = await api.get("/dashboard/stats");

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
      return <div>Loading dashboard...</div>;
    }

  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold lg:text-4xl">Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Welcome back. Here's what's happening with your account.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Clock3 className="text-gray-500" />
            <ArrowUpRight size={18} />
          </div>

          <p className="mt-4 text-sm text-gray-500">Active Reservations</p>

          <h3 className="mt-2 text-4xl font-bold">{stats?.reservations}</h3>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <ShoppingBag className="text-gray-500" />
            <ArrowUpRight size={18} />
          </div>

          <p className="mt-4 text-sm text-gray-500">Orders</p>

          <h3 className="mt-2 text-4xl font-bold">{stats?.orders}</h3>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Wallet className="text-gray-500" />
            <ArrowUpRight size={18} />
          </div>

          <p className="mt-4 text-sm text-gray-500">Amount Spent</p>

          <h3 className="mt-2 text-4xl font-bold">
            {/* {" "}
            ${stats?.totalSpent.toFixed(2)} */}
            ${stats ? stats.totalSpent.toFixed(2) : "0.00"}
          </h3>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Heart className="text-gray-500" />
            <ArrowUpRight size={18} />
          </div>

          <p className="mt-4 text-sm text-gray-500">Wishlist</p>

          <h3 className="mt-2 text-4xl font-bold">8</h3>
        </div>
      </div>

      {/* Recent Activity + Reservation Summary */}
      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <h2 className="text-xl font-semibold">Recent Activity</h2>

          <div className="mt-6 space-y-5">
            <div className="border-b pb-4">Reserved Air Jordan Retro High</div>

            <div className="border-b pb-4">Completed Order #ATH-102938</div>

            <div className="border-b pb-4">Reserved Nike Dunk Low</div>

            <div>Added Yeezy Boost 350 to Wishlist</div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <h2 className="text-xl font-semibold">Reservation Status</h2>

          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <span>Nike Dunk Low Panda</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                Active
              </span>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span>Air Jordan Retro High</span>
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Yeezy Boost 350</span>
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                Expired
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;