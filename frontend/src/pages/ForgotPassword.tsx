import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const ForgotPassword = () => {
  return (
    <>
      <Header />

      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <h1 className="text-center text-4xl font-bold">Reset Password</h1>

          <p className="mt-4 text-center text-gray-500">
            Enter your email address to receive a reset link.
          </p>

          <form className="mt-10 space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-2xl border p-4"
            />

            <button className="w-full rounded-full bg-black py-4 text-white dark:bg-white dark:text-black">
              Send Reset Link
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ForgotPassword;
