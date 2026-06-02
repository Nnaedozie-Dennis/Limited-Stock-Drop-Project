import { ArrowRight } from "lucide-react";
import Container from "../components/common/Container";
import heroShoe from "../assets/images/hero-shoe.png";
// import CountUp from "react-countup";
import Counter from "../components/common/Counter";
import FadeIn from "../components/common/FadeIn";


const Hero = () => {
  return (
    <FadeIn>
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />

        <Container>
          <div className="relative grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="rounded-full border px-4 py-2 text-sm font-medium">
                Exclusive Sneaker Drops
              </span>

              <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl ">
                Own the Drop Before It's Gone.
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-300">
                Reserve limited-edition sneakers before they sell out. Secure
                your pair and complete checkout within minutes.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="flex items-center gap-2 rounded-full bg-black px-8 py-4 text-white transition hover:opacity-90 dark:bg-white dark:text-black">
                  Reserve Now
                  <ArrowRight size={18} />
                </button>

                <button className="rounded-full border px-8 py-4 transition hover:bg-gray-100 dark:hover:bg-slate-800">
                  Explore Drops
                </button>
              </div>

              <div className="mt-10 flex items-center gap-8">
                <div>
                  <h3 className="text-2xl font-bold">
                    {/* <CountUp start={0} end={500} duration={2} />500+ */}
                    <Counter end={500} suffix="+" />
                  </h3>
                  <p className="text-sm text-gray-500">Reservations</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {/* <CountUp end={120} duration={2} />120+ */}
                    <Counter end={120} suffix="+" />
                  </h3>

                  <p className="text-sm text-gray-500">Limited Drops</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {/* <CountUp end={99} duration={2} />99% */}
                    <Counter end={99} suffix="%" />
                  </h3>

                  <p className="text-sm text-gray-500">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroShoe}
                alt="Aether Sneaker"
                className="mx-auto max-w-xl drop-shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default Hero;
