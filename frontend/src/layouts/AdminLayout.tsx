// import { Outlet, NavLink } from "react-router-dom";

// const AdminLayout = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 border-r bg-white p-6 dark:bg-slate-900">
//         <h2 className="mb-8 text-2xl font-bold">Admin Panel</h2>

//         <nav className="flex flex-col gap-4">
//           <NavLink to="/admin">Dashboard</NavLink>

//           <NavLink to="/admin/products">Products</NavLink>

//           <NavLink to="/admin/orders">Orders</NavLink>

//           <NavLink to="/admin/reservations">Reservations</NavLink>

//           <NavLink to="/admin/users">Users</NavLink>
//         </nav>
//       </aside>

//       {/* Content */}
//       <main className="flex-1 p-8">
        
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;






import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-3">
          <NavLink
            to="/admin"
            end
            className="block rounded-lg p-3 hover:bg-gray-100 hover:text-black"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className="block rounded-lg p-3 hover:bg-gray-100 hover:text-black"
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/reservations"
            className="block rounded-lg p-3 hover:bg-gray-100 hover:text-black"
          >
            Reservations
          </NavLink>

          <NavLink
            to="/admin/orders"
            className="block rounded-lg p-3 hover:bg-gray-100 hover:text-black"
          >
            Orders
          </NavLink>


          <NavLink
            to="/admin/users"
            className="block rounded-lg p-3 hover:bg-gray-100 hover:text-black"
          >
            Users
          </NavLink>

          <NavLink
          to="/admin/logs"
          className="block rounded-lg p-3 hover:bg-gray-100 hover:text-black"
        >
          Inventory Logs
        </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
