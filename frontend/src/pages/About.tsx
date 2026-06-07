import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ShoppingBag, ShieldCheck, Clock3, Trophy } from "lucide-react";

const About = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gray-50 py-15 px-2 dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="rounded-full border px-4 py-2 text-sm font-medium">
              About Aether
            </span>

            <h1 className="mt-6 text-5xl font-bold lg:text-7xl">
              Built For Sneaker Enthusiasts
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-500">
              Aether is a modern sneaker reservation platform designed to give
              customers a fair opportunity to secure limited-edition releases
              before stock runs out.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold">Our Story</h2>

              <p className="mt-6 leading-relaxed text-gray-500">
                Sneaker drops often sell out within minutes, leaving many
                customers frustrated. Aether was created to provide a smoother,
                more transparent reservation experience that allows users to
                reserve products before completing checkout.
              </p>

              <p className="mt-6 leading-relaxed text-gray-500">
                Our goal is to make limited releases more accessible while
                helping stores manage demand and inventory effectively.
              </p>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                alt="Sneakers"
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 py-15 px-2 dark:bg-slate-950">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Why Choose Aether?</h2>

              <p className="mt-4 text-gray-500">
                Designed with simplicity, fairness and speed in mind.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border bg-white p-8 dark:bg-slate-900">
                <ShoppingBag size={32} />

                <h3 className="mt-5 text-xl font-semibold">
                  Limited Releases
                </h3>

                <p className="mt-3 text-gray-500">
                  Reserve exclusive sneaker drops before they sell out.
                </p>
              </div>

              <div className="rounded-3xl border bg-white p-8 dark:bg-slate-900">
                <Clock3 size={32} />

                <h3 className="mt-5 text-xl font-semibold">
                  Reservation System
                </h3>

                <p className="mt-3 text-gray-500">
                  Secure products temporarily while completing your purchase.
                </p>
              </div>

              <div className="rounded-3xl border bg-white p-8 dark:bg-slate-900">
                <ShieldCheck size={32} />

                <h3 className="mt-5 text-xl font-semibold">
                  Secure Experience
                </h3>

                <p className="mt-3 text-gray-500">
                  Built with modern authentication and account protection.
                </p>
              </div>

              <div className="rounded-3xl border bg-white p-8 dark:bg-slate-900">
                <Trophy size={32} />

                <h3 className="mt-5 text-xl font-semibold">
                  Premium Selection
                </h3>

                <p className="mt-3 text-gray-500">
                  Discover highly sought-after sneakers from top brands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-15 px-4">
          <div className="mx-auto max-w-4xl rounded-3xl border p-10 text-center">
            <h2 className="text-4xl font-bold">
              Ready For The Next Drop?
            </h2>

            <p className="mt-5 text-gray-500">
              Join Aether today and never miss a limited sneaker release.
            </p>

            <button className="mt-8 rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black">
              Start Exploring
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;