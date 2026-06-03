import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Clock3,
  User,
  LogOut,
} from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="grid lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="border-r bg-white dark:bg-slate-900">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Aether</h2>
          </div>

          <nav className="space-y-2 px-4">
            <NavLink
              to="/dashboard"
              end
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/reservations"
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <Clock3 size={20} />
              Reservations
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <ShoppingBag size={20} />
              Orders
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <User size={20} />
              Profile
            </NavLink>

            <button className="flex w-full items-center gap-3 rounded-xl p-3 text-red-500 hover:bg-red-50">
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
