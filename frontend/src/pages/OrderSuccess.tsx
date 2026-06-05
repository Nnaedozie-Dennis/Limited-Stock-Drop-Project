// import { Link } from "react-router-dom";
// import { CheckCircle } from "lucide-react";

// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
// import Container from "../components/common/Container";

// const OrderSuccess = () => {
//   return (
//     <>
//       <Header />

//       <main className="py-32">
//         <Container>
//           <div className="mx-auto max-w-2xl text-center">
//             <CheckCircle size={80} className="mx-auto" />

//             <h1 className="mt-8 text-5xl font-bold">Order Confirmed</h1>

//             <p className="mt-6 text-lg text-gray-500">
//               Your reservation has been successfully converted into an order.
//             </p>

//             <div className="mt-10 rounded-3xl border p-8">
//               <p className="text-sm uppercase tracking-widest text-gray-500">
//                 Order Number
//               </p>

//               <h2 className="mt-4 text-3xl font-bold">#ATH-102938</h2>
//             </div>

//             <Link
//               to="/shop"
//               className="mt-10 inline-flex rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </Container>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default OrderSuccess;






import { CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-slate-900">
        <CheckCircle size={80} className="mx-auto text-green-500" />

        <h1 className="mt-6 text-4xl font-bold">Order Confirmed</h1>

        <p className="mt-4 text-gray-500">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="mt-10 rounded-2xl border p-6 text-left">
          <p className="text-sm text-gray-500">Order ID</p>

          <p className="mt-2 break-all font-semibold">{orderId}</p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/dashboard/orders"
            className="rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            View Orders
          </Link>

          <Link
            to="/shop"
            className="rounded-full border px-8 py-4 transition hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
