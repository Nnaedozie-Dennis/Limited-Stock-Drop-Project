import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../home/Hero";
import Brands from "../home/Brands";
import Features from "../home/Features";
import Products from "../home/Products";
import Process from "../home/Process";
import Testimonials from "../home/Testimonials";
import Newsletter from "../home/Newsletter";

const Home = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <section >
          {/* <h1 className="text-6xl font-bold">Aether</h1> */}
          <Hero/>
          <Brands/>
          <Features/>
          <Products/>
          <Process/>
          <Testimonials/>
          <Newsletter/>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;