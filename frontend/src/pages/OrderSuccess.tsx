import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/common/Container";

const OrderSuccess = () => {
  return (
    <>
      <Header />

      <main className="py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <CheckCircle size={80} className="mx-auto" />

            <h1 className="mt-8 text-5xl font-bold">Order Confirmed</h1>

            <p className="mt-6 text-lg text-gray-500">
              Your reservation has been successfully converted into an order.
            </p>

            <div className="mt-10 rounded-3xl border p-8">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Order Number
              </p>

              <h2 className="mt-4 text-3xl font-bold">#ATH-102938</h2>
            </div>

            <Link
              to="/shop"
              className="mt-10 inline-flex rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default OrderSuccess;
