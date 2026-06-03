import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h1 className="text-5xl font-bold">About Aether</h1>

            <p className="mt-8 text-lg leading-relaxed text-gray-500">
              Aether was built for sneaker enthusiasts who want a fair and
              reliable way to secure limited-edition releases.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
