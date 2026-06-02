import { ShieldCheck, TimerReset, PackageCheck } from "lucide-react";
import Container from "../components/common/Container";
import FadeIn from "../components/common/FadeIn";

const features = [
  {
    icon: ShieldCheck,
    title: "Guaranteed Reservation",
    description: "Secure your pair instantly before stock disappears.",
  },
  {
    icon: TimerReset,
    title: "5 Minute Hold",
    description: "Complete checkout before your reservation expires.",
  },
  {
    icon: PackageCheck,
    title: "Authentic Products",
    description: "Every sneaker comes directly from verified suppliers.",
  },
];

const Features = () => {
  return (
    <FadeIn>
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold">
              Why Sneakerheads Choose Aether
            </h2>

            <p className="mt-4 text-gray-500">
              Designed to eliminate the stress of limited-edition releases.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-gray-200 p-8 transition hover:-translate-y-2 hover:shadow-xl dark:border-slate-700"
                >
                  <div className="mb-6 w-fit rounded-2xl bg-gray-100 p-4 dark:bg-slate-800">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-3 text-gray-500">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default Features;
