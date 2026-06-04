import { Eye } from "lucide-react";
// import EmptyState from "../../components/common/EmptyState";


// const orders = [];
const Orders = () => {
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
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-5">ATH-102938</td>

                  <td className="px-6 py-5">Nike Dunk Low Panda</td>

                  <td className="px-6 py-5">May 12, 2026</td>

                  <td className="px-6 py-5">$220</td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Completed
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="rounded-lg border p-2">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-5">ATH-102939</td>

                  <td className="px-6 py-5">Yeezy Boost 350</td>

                  <td className="px-6 py-5">April 25, 2026</td>

                  <td className="px-6 py-5">$320</td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Completed
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="rounded-lg border p-2">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        {/*  )} */}
      </div>
    </>
  );
};

export default Orders;