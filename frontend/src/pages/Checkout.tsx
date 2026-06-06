// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
// import Container from "../components/common/Container";

// const Checkout = () => {
//   return (
//     <>
//       <Header />

//       <main className="py-24">
//         <Container>
//           <div className="mb-12">
//             <h1 className="text-5xl font-bold">Checkout</h1>

//             <p className="mt-4 text-gray-500">
//               Complete your purchase before your reservation expires.
//             </p>
//           </div>

//           <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
//             {/* LEFT SIDE */}
//             <div>
//               <div className="rounded-3xl border p-8">
//                 <h2 className="text-2xl font-semibold">Shipping Information</h2>

//                 <div className="mt-8 grid gap-6">
//                   <input
//                     type="text"
//                     placeholder="Full Name"
//                     className="rounded-2xl border p-4"
//                   />

//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     className="rounded-2xl border p-4"
//                   />

//                   <input
//                     type="tel"
//                     placeholder="Phone Number"
//                     className="rounded-2xl border p-4"
//                   />

//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="rounded-2xl border p-4"
//                   />

//                   <div className="grid gap-6 md:grid-cols-2">
//                     <input
//                       type="text"
//                       placeholder="City"
//                       className="rounded-2xl border p-4"
//                     />

//                     <input
//                       type="text"
//                       placeholder="Country"
//                       className="rounded-2xl border p-4"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="space-y-6">
//               {/* TIMER */}
//               <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
//                 <p className="text-sm uppercase tracking-widest text-red-500">
//                   Reservation Timer
//                 </p>

//                 <h2 className="mt-3 text-5xl font-bold">04:59</h2>

//                 <p className="mt-3 text-sm text-gray-600">
//                   Complete checkout before the timer reaches zero.
//                 </p>
//               </div>

//               {/* ORDER SUMMARY */}
//               <div className="rounded-3xl border p-6">
//                 <h2 className="text-xl font-semibold">Order Summary</h2>

//                 <div className="mt-6 flex items-center gap-4">
//                   <img
//                     src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
//                     alt="Sneaker"
//                     className="h-20 w-20 rounded-2xl object-cover"
//                   />

//                   <div>
//                     <h3 className="font-semibold">Air Jordan Retro High</h3>

//                     <p className="text-sm text-gray-500">Quantity: 1</p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4 border-t pt-6">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>$220</span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span>$20</span>
//                   </div>

//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Total</span>
//                     <span>$240</span>
//                   </div>
//                 </div>

//                 <button className="mt-8 w-full rounded-full bg-black py-4 text-white dark:bg-white dark:text-black">
//                   Place Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default Checkout;













import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";


const Checkout = () => {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState<any>(null);
  const navigate = useNavigate();
  console.log(reservation);


  const handleCheckout = async () => {
    try {
      const res = await api.post("/orders/checkout", {
        reservationId,
      });

      navigate(`/order-success/${res.data.order.id}`);
    } catch (error) {
      console.error(error);
    }
  };


// const handleCheckout = async () => {
//   const res = await api.post("/orders/checkout", {
//     reservationId,
//   });

//   navigate(`/order-success/${res.data.order.id}`);
// };

  useEffect(() => {
    const fetchReservation = async () => {
      const res = await api.get(`/reservations/${reservationId}`);

      setReservation(res.data.reservation);
    };

    fetchReservation();
  }, [reservationId]);

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      

      <div className="min-h-screen bg-gray-50 px-6 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
          <h1 className="text-4xl font-bold">Checkout</h1>

          <p className="mt-2 text-gray-500">
            Complete your purchase before your reservation expires.
          </p>

          <div className="mt-10 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="mt-6 flex justify-between">
              <span>Reservation ID</span>

              <span>{reservationId}</span>
            </div>

            <div className="mt-4 flex justify-between">
              <span>Product</span>

              <span>{reservation.products?.name}</span>
            </div>

            <div className="mt-4 flex justify-between">
              <span>Price</span>

              <span>${reservation.products.price}</span>
            </div>

            <div className="mt-4 flex justify-between">
              <span>Quantity</span>

              <span>{reservation.quantity}</span>
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between font-bold">
              <span>Total</span>

              <span>
                $
                {(reservation.quantity * reservation.products.price).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-10 w-full rounded-full bg-black py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            Complete Purchase
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
