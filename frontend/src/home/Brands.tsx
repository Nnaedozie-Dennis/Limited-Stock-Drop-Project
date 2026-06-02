import Container from "../components/common/Container";
import FadeIn from "../components/common/FadeIn";

const brands = ["Nike", "Jordan", "Adidas", "New Balance", "Puma", "ASICS"];

const Brands = () => {
  return (
    <FadeIn>
      <section className="py-16">
        <Container>
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Trusted Sneaker Brands
          </p>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex h-20 items-center justify-center rounded-2xl border border-gray-200 bg-white text-lg font-semibold shadow-sm transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
              >
                {brand}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default Brands;
