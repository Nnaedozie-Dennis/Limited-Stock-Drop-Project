import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import type { Reservation } from "../types/reservation";
import useTimer from "../hooks/useTimer";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import BackButton from "../components/common/BackButton";


const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  // const navigate = useNavigate();


  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await api.get(`/reservations/${id}`);

        setReservation(res.data.reservation);
      } catch (error) {
        toast.error("Reservation expired");
      }
    };
    // setTimeout(() => {
    //   navigate("/shop");
    // }, 3000);


    fetchReservation();
  }, [id]);

    const { minutes, seconds, expired } = useTimer(
      reservation?.expires_at || new Date().toISOString(),
    );

  if (!reservation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader size={20} color="#fff" />
      </div>
    );
  }

  
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:p-10">
          <div className="flex">
            {/* <div className="">
              <BackButton />
            </div> */}
            {/* Success Header */}
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold md:text-4xl">
                Reservation Successful
              </h1>

              <p className="mt-3 text-gray-500">
                Your sneaker has been reserved successfully.
              </p>

              <span
                className={`mt-5 inline-block rounded-full px-4 py-2 text-sm font-medium ${
                  reservation.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : reservation.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {reservation.status}
              </span>
            </div>
          </div>

          {/* Product Card */}
          <div className="mt-10 rounded-3xl border p-5 ">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <img
                src={reservation.products.image_url}
                alt={reservation.products.name}
                className="h-40 w-full rounded-2xl object-cover md:w-40"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">
                  {reservation.products.name}
                </h2>

                <p className="mt-2 text-gray-500">
                  Reserved Quantity: {reservation.quantity}
                </p>

                <p className="mt-2 text-xl font-bold">
                  $
                  {(reservation.products.price * reservation.quantity).toFixed(
                    2,
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="mt-8 rounded-3xl border p-5 text-center">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              Time Remaining
            </p>

            <p
              className={`mt-4 text-5xl font-bold md:text-6xl ${
                expired ? "text-red-500" : ""
              }`}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>

            {expired && (
              <div className="mt-4 rounded-2xl bg-red-50 p-4 text-red-600">
                This reservation has expired.
              </div>
            )}
          </div>

          {/* Reservation Info */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border p-5">
              <p className="text-sm text-gray-500">Reservation ID</p>

              <p className="mt-2 break-all font-medium">{reservation.id}</p>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-sm text-gray-500">Expires At</p>

              <p className="mt-2 font-medium">
                {new Date(reservation.expires_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Policy */}
          <div className="mt-8 rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <h3 className="font-semibold text-black">Reservation Policy</h3>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Reservation lasts 5 minutes</li>

              <li>• Stock is temporarily locked</li>

              <li>• Expired reservations return stock</li>

              <li>• Checkout before timer ends</li>
            </ul>
          </div>

          {/* CTA */}
          {!expired ? (
            <Link
              to={`/checkout/${reservation.id}`}
              className="mt-10 block rounded-full bg-black py-4 text-center font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Proceed to Checkout
            </Link>
          ) : (
            <button
              disabled
              className="mt-10 w-full cursor-not-allowed rounded-full bg-gray-300 py-4 text-black"
            >
              Reservation Expired
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservationDetails;
