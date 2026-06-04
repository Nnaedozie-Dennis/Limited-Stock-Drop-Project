import { Eye, ShoppingCart } from "lucide-react";

const Reservations = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold lg:text-4xl">Reservations</h1>

        <p className="mt-2 text-gray-500">
          Manage your active and expired sneaker reservations.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead className="border-b bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Quantity</th>
                <th className="px-6 py-4 text-left">Expires</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="px-6 py-5">Nike Dunk Low Panda</td>
                <td className="px-6 py-5">1</td>
                <td className="px-6 py-5">04:32</td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Active
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button className="rounded-lg border p-2">
                      <Eye size={18} />
                    </button>

                    <button className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-5">Air Jordan Retro High</td>
                <td className="px-6 py-5">1</td>
                <td className="px-6 py-5">Expired</td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                    Expired
                  </span>
                </td>

                <td className="px-6 py-5">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reservations;
