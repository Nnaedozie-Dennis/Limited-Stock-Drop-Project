import Container from "../components/common/Container";
import FadeIn from "../components/common/FadeIn";

const steps = [
  {
    number: "01",
    title: "Reserve",
    description: "Choose your sneaker and reserve it instantly.",
  },
  {
    number: "02",
    title: "Checkout",
    description: "Complete payment within your reservation window.",
  },
  {
    number: "03",
    title: "Confirmed",
    description: "Your order is secured and ready for fulfillment.",
  },
];

const Process = () => {
  return (
    <FadeIn>
      <section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold">How It Works</h2>

            <p className="mt-4 text-gray-500">
              Get your pair in three simple steps.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-gray-200 p-8 dark:border-slate-700"
              >
                <span className="text-5xl font-bold text-gray-300 dark:text-slate-600">
                  {step.number}
                </span>

                <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>

                <p className="mt-3 text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default Process;
