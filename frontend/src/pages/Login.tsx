import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import heroShoe from "../assets/images/hero-shoe.png";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";



const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        toast.error("Incorrect email or password.");
      } else {
        toast.error(error.message);
      }
      
      setLoading(false);
      return;
    }
    toast.success("Login successful");
    setLoading(false);
    navigate("/");
  };


  return (
    <>
      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <div className="w-20 m-auto border-green-600 p-2 rounded-full mb-4 bg-white border-4">
            <img src={heroShoe} alt="" />
          </div>
          <h1 className="text-center text-4xl font-bold">Welcome Back</h1>

          <p className="mt-4 text-center text-gray-500">
            Sign in to manage reservations and orders.
          </p>

          {/* {errorMessage && (
            <div className="rounded-2xl bg-red-100 p-4 text-sm text-red-600">
              {errorMessage}
            </div>
          )} */}

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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border p-4 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black py-4 text-white disabled:opacity-50 dark:bg-white dark:text-black cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
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
    </>
  );
};

export default Login;
