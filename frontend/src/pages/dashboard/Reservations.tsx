
import { Eye, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import type { Reservation } from "../../types/reservation";

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get("/reservations");

        setReservations(res.data.reservations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "EXPIRED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
          <table className="w-full min-w-225">
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    Loading reservations...
                  </td>
                </tr>
                // <div className="py-12 text-center">Loading Reservationa...</div>
              ) : reservations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={reservation.products.image_url}
                          alt={reservation.products.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <span>{reservation.products.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5">{reservation.quantity}</td>

                    <td className="px-6 py-5">
                      {reservation.status === "EXPIRED"
                        ? "Expired"
                        : new Date(reservation.expires_at).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                          reservation.status,
                        )}`}
                      >
                        {reservation.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <Link
                          to={`/reservation/${reservation.id}`}
                          className="rounded-lg border p-2"
                        >
                          <Eye size={18} />
                        </Link>

                        {reservation.status === "PENDING" && (
                          <Link
                            to={`/checkout/${reservation.id}`}
                            className="rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black"
                          >
                            <ShoppingCart size={18} />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reservations;