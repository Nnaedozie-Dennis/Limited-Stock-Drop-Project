import { ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import FadeIn from "../components/common/FadeIn";

const CtaBanner = () => {
  return (
    <FadeIn>
      <section className="py-24">
        <Container>
          <div className="overflow-hidden rounded-[40px] bg-black px-8 py-16 text-white dark:bg-white dark:text-black md:px-16">
            <div className="mx-auto max-w-3xl text-center">
              <span className="rounded-full border border-white/20 px-4 py-2 text-sm dark:border-black/20">
                Limited Stock Available
              </span>

              <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                Secure Your Next Exclusive Pair
              </h2>

              <p className="mt-6 text-lg opacity-80">
                Join thousands of sneaker enthusiasts who reserve limited
                releases before they're gone.
              </p>

              <button className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105 dark:bg-black dark:text-white">
                Explore Drops
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default CtaBanner;
