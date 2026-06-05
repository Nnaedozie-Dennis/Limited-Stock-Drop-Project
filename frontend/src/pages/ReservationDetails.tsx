import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import type { Reservation } from "../types/reservation";
import useTimer from "../hooks/useTimer";

const ReservationDetails = () => {
  const { id } = useParams();
  // const [reservation, setReservation] = useState<any>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);


  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await api.get(`/reservations/${id}`);

        setReservation(res.data.reservation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservation();
  }, [id]);

    const { minutes, seconds, expired } = useTimer(
      reservation?.expires_at || new Date().toISOString(),
    );

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading reservation...
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <div className="text-center">
          <div className="mb-6 text-6xl">🎉</div>

          <h1 className="text-4xl font-bold">Reservation Successful</h1>
          <p>Status: {reservation?.status}</p>

          <p className="mt-4 text-gray-500">Your sneaker has been reserved.</p>
        </div>

        <div className="mt-10 rounded-2xl border p-6">
          <p className="text-sm text-gray-500">Reservation ID</p>

          <p className="mt-2 font-semibold break-all">{id}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold">Time Remaining</h2>

          <p
            className={`mt-3 text-5xl font-bold ${
              expired ? "text-red-500" : ""
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
          {expired && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              This reservation has expired.
            </div>
          )}
        </div>


        <p>
          Quantity: 
          {reservation.quantity}
        </p>

        <p>
          Expires: 
          {new Date(reservation.expires_at).toLocaleString()}
        </p>

        {!expired ? (
          <Link
            to={`/checkout/${reservation.id}`}
            className="mt-10 block rounded-full bg-black py-4 text-center text-white dark:bg-white dark:text-black"
          >
            Proceed to Checkout
          </Link>
        ) : (
          <button
            disabled
            className="mt-10 w-full cursor-not-allowed rounded-full bg-gray-300 py-4"
          >
            Reservation Expired
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationDetails;
