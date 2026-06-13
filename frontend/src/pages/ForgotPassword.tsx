import { useState } from "react";
import { supabase } from "../lib/supabase";
import heroShoe from "../assets/images/hero-shoe.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const handleReset = async () => {
    setLoading(true);
    // setMessage("");
    // setErrorMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://aetherrr-project.vercel.app/reset-password",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    } 
    
    toast.success("Password reset link sent to your email.");
    setLoading(false);
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <div className="w-20 m-auto border-green-600 p-2 rounded-full mb-4 bg-white border-4">
            <Link to="/">
            <img src={heroShoe} alt="" />
            </Link>
          </div>
          <h1 className="text-center text-4xl font-bold">Reset Password</h1>

          <p className="mt-4 text-center text-gray-500">
            Enter your email address to receive a reset link.
          </p>

          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border p-4"
            />
            {/* {errorMessage && (
              <div className="rounded-2xl bg-red-100 p-4 text-sm text-red-600">
                {errorMessage}
              </div>
            )}
            
            {message && (
              <div className="rounded-2xl bg-green-100 p-4 text-sm text-green-600">
                {message}
              </div>
            )} */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black py-4 text-white disabled:opacity-50 dark:bg-white dark:text-black cursor-pointer"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;