import { Package, ShoppingBag, Clock3, Wallet } from "lucide-react";

const AdminDashboard = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border p-6">
          <Package />
          <h3 className="mt-4 text-3xl font-bold">25</h3>
          <p>Total Products</p>
        </div>

        <div className="rounded-3xl border p-6">
          <ShoppingBag />
          <h3 className="mt-4 text-3xl font-bold">48</h3>
          <p>Total Orders</p>
        </div>

        <div className="rounded-3xl border p-6">
          <Clock3 />
          <h3 className="mt-4 text-3xl font-bold">12</h3>
          <p>Reservations</p>
        </div>

        <div className="rounded-3xl border p-6">
          <Wallet />
          <h3 className="mt-4 text-3xl font-bold">$4,580</h3>
          <p>Revenue</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
