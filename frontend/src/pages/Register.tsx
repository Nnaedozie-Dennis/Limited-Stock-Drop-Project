import { Link } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Register = () => {
  return (
    <>
      <Header />

      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <h1 className="text-center text-4xl font-bold">Create Account</h1>

          <p className="mt-4 text-center text-gray-500">
            Join Aether and reserve exclusive sneaker drops.
          </p>

          <form className="mt-10 space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-2xl border p-4"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border p-4"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border p-4"
            />

            <button className="w-full rounded-full bg-black py-4 text-white dark:bg-white dark:text-black">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-500">Already have an account?</span>

            <Link to="/login" className="ml-2 font-semibold">
              Login
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Register;
