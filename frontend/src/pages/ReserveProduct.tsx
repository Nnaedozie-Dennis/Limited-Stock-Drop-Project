import { useParams, Link } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/common/Container";
import ReservationPreview from "../components/reservation/ReservationPreview";

import { products } from "../data/products";

const ReserveProduct = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-4xl"
              />
            </div>

            {/* Reservation Info */}
            <div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium dark:bg-slate-800">
                Limited Drop
              </span>

              <h1 className="mt-6 text-5xl font-bold">{product.name}</h1>

              <p className="mt-3 text-lg text-gray-500">{product.brand}</p>

              <p className="mt-8 text-4xl font-bold">${product.price}</p>

              <div className="mt-8 rounded-3xl border p-6">
                <h3 className="font-semibold">Available Stock</h3>

                <p className="mt-2 text-3xl font-bold">{product.stock}</p>

                <p className="text-sm text-gray-500">pairs remaining</p>
              </div>

              <div className="mt-6">
                <label className="mb-3 block font-medium">Quantity</label>

                <select className="w-full rounded-2xl border p-4">
                  {[1, 2, 3].map((qty) => (
                    <option key={qty}>{qty}</option>
                  ))}
                </select>
              </div>

              <div className="mt-8 rounded-3xl border border-amber-300 bg-amber-50 p-6 dark:bg-transparent">
                <h3 className="font-semibold">Reservation Policy</h3>

                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Reservation lasts 5 minutes</li>

                  <li>• Stock is temporarily locked</li>

                  <li>• Expired reservations return stock</li>

                  <li>• Checkout before timer ends</li>
                </ul>
              </div>
              <div className="mt-6">
                <ReservationPreview />
              </div>

              <Link
                to="/checkout"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Reserve Pair
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default ReserveProduct;
