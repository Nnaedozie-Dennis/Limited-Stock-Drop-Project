// import { Eye } from "lucide-react";
// import EmptyState from "../../components/common/EmptyState";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { Order } from "../../types/order";
import { toast } from "react-toastify";




// const orders = [];
const Orders = () => {


  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders");
          try {
            const res = await api.get("/orders");
            setOrders(res.data.orders);
          } catch (error) {
            console.error(error);
            toast.error("Failed to load orders");
          } finally {
            setLoading(false);
          }

      setOrders(res.data.orders);
    };

    fetchOrders();
  }, []);



  
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold lg:text-4xl">Orders</h1>

        <p className="mt-2 text-gray-500">Review your purchase history.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
        {/* {orders.length === 0 ? (
          <EmptyState
            title="No Orders Yet"
            description="Your completed purchases will appear here."
          />
        ) : ( */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5">
              <thead className="border-b bg-gray-50 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left">Order ID</th>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-left">Qty</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      Loading Orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-6 py-5">{order.id.slice(0, 8)}</td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.reservations.products.image_url}
                            alt={order.reservations.products.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />

                          <span>{order.reservations.products.name}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {order.reservations.quantity}
                      </td>

                      <td className="px-6 py-5">
                        $
                        {(
                          order.reservations.quantity *
                          order.reservations.products.price
                        ).toFixed(2)}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>

                      {/* <td className="px-6 py-5">
                      <button className="rounded-lg border p-2">
                        <Eye size={18} />
                      </button>
                    </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        {/* )} */}
      </div>
    </>
  );
};

export default Orders;