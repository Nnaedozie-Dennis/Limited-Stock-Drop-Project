import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Contact = () => {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <section className="py-10">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="text-5xl font-bold">Contact Us</h1>

            <form className="mt-12 space-y-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-2xl border p-4"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-2xl border p-4"
              />

              <textarea
                rows={6}
                placeholder="Message"
                className="w-full rounded-2xl border p-4"
              />

              <button className="rounded-full bg-black px-8 py-4 text-white dark:bg-white dark:text-black">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
