import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import { api } from "../services/api";
import type { Product } from "../types/product";
import ProductSkeleton from "../components/skeletons/ProductSkeleton";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter((product) =>
    ["Nike Dunk Low Panda",  "New Balance 550"].includes(
      product.name,
    ),
  );


  return (
    <section className="py-15">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Limited Drops</h2>

          <p className="mt-4 text-gray-500">
            Reserve before inventory disappears.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
    <>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </>
  ) : (
          featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="h-72 overflow-hidden">
                <img
                  loading="lazy"
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{product.name}</h3>

                <p className="mt-2 text-gray-500">
                  Only {product.stock} pairs left
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>

                  <Link
                    to={`/products/${product.id}`}
                    className="rounded-full bg-black px-5 py-2 transition hover:opacity-90 text-white dark:bg-white dark:text-black"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            </Link>
          )))}
        </div>
      </Container>
    </section>
  );
};

export default Products;