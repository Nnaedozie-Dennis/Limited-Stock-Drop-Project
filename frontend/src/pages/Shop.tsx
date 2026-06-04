// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";

// const Shop = () => {
//   return (
//     <>
//       <Header />

//       <main className="min-h-screen">
//         <section className="py-24">
//           <div className="mx-auto max-w-7xl px-6">
//             <h1 className="text-5xl font-bold">Shop Sneakers</h1>

//             <p className="mt-4 text-gray-500">
//               Discover exclusive sneaker drops.
//             </p>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default Shop;

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import { products } from "../data/products";

const Shop = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen py-24">
        <Container>
          <div className="mb-12">
            <h1 className="text-5xl font-bold">Sneaker Collection</h1>

            <p className="mt-4 text-gray-500">
              Explore our latest exclusive drops.
            </p>
          </div>

          <div className="mb-12 flex flex-wrap gap-4">
            <button className="rounded-full border px-5 py-2">All</button>

            <button className="rounded-full border px-5 py-2">Nike</button>

            <button className="rounded-full border px-5 py-2">Jordan</button>

            <button className="rounded-full border px-5 py-2">
              New Balance
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Shop;