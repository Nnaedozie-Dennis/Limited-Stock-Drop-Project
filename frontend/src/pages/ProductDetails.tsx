import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Container from "../components/common/Container";
import { api } from "../services/api";
import type { Product } from "../types/product";
import ProductDetailsSkeleton from "../components/skeletons/ProductDetailsSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);


    const handleReserve = async () => {
      if (!product) return;

      try {
        const res = await api.post("/reservations", {
          productId: product.id,
          quantity: quantity,
        });

        navigate(`/reservation/${res.data.reservation.id}`);
      } catch (error) {
        console.error(error);
      }
    };

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
    return <ProductDetailsSkeleton />;
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

      <main className="py-15">
        <Container>
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
            <div>
              <img
                src={
                  product.image_url ||
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                }
                alt={product.name}
                className="w-full h-115 rounded-3xl object-cover"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold">{product.name}</h1>

              <p className="mt-6 text-lg text-gray-500">
                {product.description}
              </p>

              <div className="mt-6">
                <span className="text-4xl font-bold">${product.price}</span>
              </div>

              <div className="mt-10">
                <label className="mb-2 block text-sm font-medium ml-8">
                  Quantity
                </label>

                <div className="flex items-center gap-4 ">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-full border"
                  >
                    -
                  </button>

                  <span className="text-xl font-semibold">{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="h-10 w-10 rounded-full border"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6  mt-14">
                <div >
                  <span className="text-sm rounded-full bg-green-100 px-8 py-5 text-green-700">
                    Available Stock: {product.stock}
                  </span>
                </div>

                <button
                  onClick={handleReserve}
                  className=" rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black cursor-pointer"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;