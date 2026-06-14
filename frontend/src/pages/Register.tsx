import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import heroShoe from "../assets/images/hero-shoe.png";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";



const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  

  const handleRegister = async () => {

      setLoading(true);
      // setErrorMessage("");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });

  if (error) {
    toast.error(error.message);
    setLoading(false);
    return;
  }
  
  toast.success("Account created successfully");
  setLoading(false);
  navigate("/login");
};
  return (
    <>
      <main className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <div className="w-20 m-auto border-green-600 p-2 rounded-full mb-4 bg-white border-4">
            <Link to="/">
            <img src={heroShoe} alt="" />
            </Link>
          </div>
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
              {loading ? "Creating Account..." : "Create Account"}
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
    </>
  );
};

export default Register;
