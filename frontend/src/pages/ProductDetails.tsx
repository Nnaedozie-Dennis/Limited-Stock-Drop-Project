import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/common/Container";
import { api } from "../services/api";
import type { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("PARAM ID:", id);

        const res = await api.get(`/products/${id}`);
        
        console.log("Product Response:", res.data);

        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

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
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <img
                src={
                  product.image_url ||
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                }
                alt={product.name}
                className="w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              {/* <p className="mb-3 text-sm uppercase tracking-widest text-gray-500">
                // {product.brand}
                //{" "}
              </p> */}
              <h1 className="text-4xl font-bold">{product.name}</h1>

              <p className="mt-6 text-lg text-gray-500">
                {product.description}
              </p>

              <div className="mt-8">
                <span className="text-4xl font-bold">${product.price}</span>
              </div>

              <div className="mt-4">
                <span className="text-sm rounded-full bg-green-100 px-4 py-2 text-green-700">
                  Available Stock: {product.stock}
                </span>
              </div>

              <button className="mt-10 rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black">
                Reserve Now
              </button>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;