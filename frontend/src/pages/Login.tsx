import { Link } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";




// const handleLogin = async () => {
//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     console.log(error.message);
//     return;
//   }

//   navigate("/dashboard");
// };

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      return;
    }

    navigate("/");
  } ;

  return (
    <>
      <Header />

      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <h1 className="text-center text-4xl font-bold">Welcome Back</h1>

          <p className="mt-4 text-center text-gray-500">
            Sign in to manage reservations and orders.
          </p>

          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
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
              className="w-full rounded-full bg-black py-4 text-white dark:bg-white dark:text-black"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/forgot-password" className="text-sm text-gray-500">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-8 text-center">
            <span className="text-gray-500">Don't have an account?</span>

            <Link to="/register" className="ml-2 font-semibold">
              Register
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
