import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Clock3,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink
        to="/dashboard"
        end
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl p-3 transition ${
            isActive
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-gray-100 dark:hover:bg-slate-800"
          }`
        }
      >
        <LayoutDashboard size={20} />
        Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/reservations"
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl p-3 transition ${
            isActive
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-gray-100 dark:hover:bg-slate-800"
          }`
        }
      >
        <Clock3 size={20} />
        Reservations
      </NavLink>

      <NavLink
        to="/dashboard/orders"
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl p-3 transition ${
            isActive
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-gray-100 dark:hover:bg-slate-800"
          }`
        }
      >
        <ShoppingBag size={20} />
        Orders
      </NavLink>

      <NavLink
        to="/dashboard/profile"
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl p-3 transition ${
            isActive
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-gray-100 dark:hover:bg-slate-800"
          }`
        }
      >
        <User size={20} />
        Profile
      </NavLink>

      <button className="flex w-full items-center gap-3 rounded-xl p-3 text-red-500 transition hover:bg-red-50">
        <LogOut size={20} />
        Logout
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="grid lg:grid-cols-[260px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden border-r bg-white lg:block dark:bg-slate-900">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Aether</h2>
          </div>

          <nav className="space-y-2 px-4">{navLinks}</nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="fixed left-0 top-0 z-50 h-screen w-70 bg-white p-6 shadow-xl dark:bg-slate-900">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Aether</h2>

                <button onClick={() => setSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-2">{navLinks}</nav>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="p-6 lg:p-10">
          {/* Mobile Top Bar */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border p-2"
            >
              <Menu size={22} />
            </button>

            <h2 className="text-xl font-bold">Dashboard</h2>

            <div className="w-10" />
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;