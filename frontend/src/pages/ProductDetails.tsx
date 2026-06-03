// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";

// const ProductDetails = () => {
//   return (
//     <>
//       <Header />

//       <main className="min-h-screen">
//         <section className="py-24">
//           <div className="mx-auto max-w-7xl px-6">
//             <div className="grid gap-16 lg:grid-cols-2">
//               <img
//                 src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
//                 alt="Sneaker"
//                 className="rounded-3xl"
//               />

//               <div>
//                 <h1 className="text-5xl font-bold">Air Jordan Retro High</h1>

//                 <p className="mt-4 text-3xl font-bold">$220</p>

//                 <p className="mt-6 text-gray-500">Limited stock available.</p>

//                 <button className="mt-8 rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black">
//                   Reserve Pair
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default ProductDetails;

import { useParams } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/common/Container";

import { products } from "../data/products";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <>
      <Header />

      <main className="py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl"
            />

            <div>
              <p className="mb-3 text-sm uppercase tracking-widest text-gray-500">
                {product.brand}
              </p>

              <h1 className="text-5xl font-bold">{product.name}</h1>

              <p className="mt-6 text-3xl font-bold">${product.price}</p>

              <p className="mt-6 leading-relaxed text-gray-500">
                {product.description}
              </p>

              <div className="mt-8">
                <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                  {product.stock} pairs available
                </span>
              </div>

              {/* <button className="mt-10 rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black">
                Reserve Pair
              </button> */}
              <Link
                to={`/reserve/${product.id}`}
                className="mt-10 inline-flex rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black"
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

export default ProductDetails;