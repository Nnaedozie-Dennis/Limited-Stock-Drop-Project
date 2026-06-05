import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/common/Container";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";
import Skeleton from "../components/common/Skeleton";

const Shop = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        console.log(res.data.products);
        // console.log("API RESPONSE:", res.data);

        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {/* Loading products... */}
        <Skeleton className="h-[500px] w-full rounded-3xl" />
      </div>
    );
  }


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
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900"
              >
                <img
                  src={
                    product.image_url ||
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  }
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{product.name}</h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price}</span>

                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>

                  {/* <button className="mt-5 w-full rounded-full bg-black py-3 text-white transition hover:opacity-90 dark:bg-white dark:text-black">
          Reserve
        </button> */}
                  <Link
                    to={`/products/${product.id}`}
                    className="mt-5 block w-full rounded-full bg-black py-3 text-center text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            
          </div>

          {/* <ProductCard product={product} /> */}
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Shop;