import Container from "../components/common/Container";
import FadeIn from "../components/common/FadeIn";

const testimonials = [
  {
    name: "Michael Carter",
    role: "Sneaker Collector",
    review:
      "I reserved a pair of Air Jordans in seconds. The process was smooth and the timer feature gave me enough time to complete checkout.",
  },
  {
    name: "Jason Reed",
    role: "Streetwear Enthusiast",
    review:
      "Aether removes the frustration of limited releases. No stress, no endless refreshing.",
  },
  {
    name: "David Brooks",
    role: "Verified Buyer",
    review:
      "The reservation system is brilliant. I secured a rare pair before stock disappeared.",
  },
];

const Testimonials = () => {
  return (
    <FadeIn>
      <section className="py-15">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
              Testimonials
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              Loved By Sneaker Enthusiasts
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-3xl border border-gray-200 p-8 dark:border-slate-700"
              >
                <div className="mb-6 flex gap-1 text-xl">★★★★★</div>

                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  "{testimonial.review}"
                </p>

                <div className="mt-8">
                  <h4 className="font-semibold">{testimonial.name}</h4>

                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default Testimonials;
