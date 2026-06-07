import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-6 dark:bg-slate-900">
        <h2 className="mb-8 text-2xl font-bold">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <NavLink to="/admin">Dashboard</NavLink>

          <NavLink to="/admin/products">Products</NavLink>

          <NavLink to="/admin/orders">Orders</NavLink>

          <NavLink to="/admin/reservations">Reservations</NavLink>

          <NavLink to="/admin/users">Users</NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
