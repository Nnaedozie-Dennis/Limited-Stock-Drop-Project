import Container from "../components/common/Container";
import FadeIn from "../components/common/FadeIn";

const products = [
  {
    id: 1,
    name: "Air Jordan Retro High",
    price: "$220",
    stock: 12,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 2,
    name: "Nike Dunk Low",
    price: "$180",
    stock: 8,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  },
  {
    id: 3,
    name: "New Balance 550",
    price: "$190",
    stock: 6,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
  },
];

const Products = () => {
  return (
    <FadeIn>
      <section className="py-24">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold">Limited Drops</h2>

            <p className="mt-4 text-gray-500">
              Reserve before inventory disappears.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="h-72 overflow-hidden">
                  <img
                    src={product.image}
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
                    <span className="text-2xl font-bold">{product.price}</span>

                    <button className="rounded-full bg-black px-5 py-2 text-white dark:bg-white dark:text-black">
                      Reserve
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default Products;
