import { Link } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";


const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegister = async () => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });

  if (error) {
    console.log(error.message);
    return;
  }

  navigate("/login");
};
  return (
    <>
      <Header />

      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <h1 className="text-center text-4xl font-bold">Create Account</h1>

          <p className="mt-4 text-center text-gray-500">
            Join Aether and reserve exclusive sneaker drops.
          </p>

          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border p-4"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border p-4"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border p-4"
            />

            <button
            type="submit"
            className="w-full rounded-full bg-black py-4 text-white dark:bg-white dark:text-black">
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
