// const AdminReservations = () => {
//   return (
//     <>
//       <h1 className="text-4xl font-bold">Reservations</h1>

//       <div className="mt-8 rounded-3xl border p-8">
//         Reservations table goes here.
//       </div>
//     </>
//   );
// };

// export default AdminReservations;




import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../services/api";

interface Reservation {
  id: string;
  quantity: number;
  status: string;
  expires_at: string;
  created_at: string;

  profiles: {
    full_name: string;
    email: string;
  };

  products: {
    name: string;
    image_url: string;
    price: number;
    stock: number;
  };
}

const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/admin/reservations");

      setReservations(res.data.reservations);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reservations");
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

      case "EXPIRED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">Reservations</h1>

        <p className="mt-2 text-gray-500">
          View and manage customer reservations.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="border-b bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left">Reservation ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Qty</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Expires</th>
                <th className="px-6 py-4 text-left">Created</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center">
                    Loading reservations...
                  </td>
                </tr>
              ) : reservations.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-gray-500"
                  >
                    No reservations found.
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-5">
                      #{reservation.id.slice(0, 8)}
                    </td>

                    <td className="px-6 py-5">
                      {reservation.profiles?.full_name}
                    </td>

                    <td className="px-6 py-5">
                      {reservation.profiles?.email}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            reservation.products.image_url ||
                            "https://placehold.co/400x400?text=No+Image"
                          }
                          alt={reservation.products.name}
                          className="h-12 w-12 rounded-xl border object-cover"
                        />

                        <span>{reservation.products.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {reservation.quantity}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      $
                      {(
                        reservation.quantity *
                        reservation.products.price
                      ).toFixed(2)}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                          reservation.status
                        )}`}
                      >
                        {reservation.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {new Date(
                        reservation.expires_at
                      ).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      {new Date(
                        reservation.created_at
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

export default AdminReservations;
