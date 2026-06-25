
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-toastify";

interface Order {
id: string;
status: string;
created_at: string;

profiles: {
full_name: string;
email: string;
};

reservations: {
quantity: number;


products: {
  name: string;
  image_url: string;
  price: number;
};


};
}

const AdminOrders = () => {
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchOrders();
}, []);

const fetchOrders = async () => {
try {
const res = await api.get("/admin/orders");
setOrders(res.data.orders);
} catch (error) {
console.error(error);
toast.error("Failed to load orders");
} finally {
setLoading(false);
}
};

const getStatusColor = (status: string) => {
switch (status) {
case "COMPLETED":
return "bg-green-100 text-green-700";


  case "PENDING":
    return "bg-yellow-100 text-yellow-700";

  case "CANCELLED":
    return "bg-red-100 text-red-700";

  default:
    return "bg-gray-100 text-gray-700";
}


};

return ( <div className="p-4 md:p-6"> <div> <h1 className="text-3xl font-bold">Orders</h1>

    <p className="mt-2 text-gray-500">
      View and manage all customer orders.
    </p>
  </div>

  <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px]">
        <thead className="border-b bg-gray-50 dark:bg-slate-800">
          <tr>
            <th className="px-6 py-4 text-left">Order ID</th>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Product</th>
            <th className="px-6 py-4 text-left">Qty</th>
            <th className="px-6 py-4 text-left">Amount</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={9}
                className="py-12 text-center"
              >
                Loading orders...
              </td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="py-12 text-center text-gray-500"
              >
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td className="px-6 py-5">
                  #{order.id.slice(0, 8)}
                </td>

                <td className="px-6 py-5">
                  {order.profiles?.full_name}
                </td>

                <td className="px-6 py-5">
                  {order.profiles?.email}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        order.reservations.products.image_url ||
                        "https://placehold.co/400x400?text=No+Image"
                      }
                      alt={order.reservations.products.name}
                      className="h-12 w-12 rounded-xl border object-cover"
                    />

                    <span>
                      {order.reservations.products.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  {order.reservations.quantity}
                </td>

                <td className="px-6 py-5 font-semibold">
                  $
                  {(
                    order.reservations.quantity *
                    order.reservations.products.price
                  ).toFixed(2)}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <button className="rounded-lg border p-2 hover:bg-blue-50">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


);
};

export default AdminOrders;
