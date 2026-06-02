import Container from "../components/common/Container";
import FadeIn from "../components/common/FadeIn";

const Newsletter = () => {
  return (
    <FadeIn>
      <section className="pb-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
              Newsletter
            </span>

            <h2 className="mt-4 text-4xl font-bold">Never Miss A Drop</h2>

            <p className="mt-4 text-gray-500">
              Get notified about exclusive releases, restocks, and limited
              reservations.
            </p>

            <form className="mt-10 flex flex-col gap-4 md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 flex-1 rounded-full border border-gray-300 px-6 outline-none focus:border-black dark:border-slate-600 dark:bg-slate-800"
              />

              <button
                type="submit"
                className="h-14 rounded-full bg-black px-8 font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </FadeIn>
  );
};

export default Newsletter;
