import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import heroShoe from "../assets/images/hero-shoe.png";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";



const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    setLoading(true);
    // setErrorMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Password updated successfully");
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border p-8">
        <div className="w-20 m-auto border-green-600 p-2 rounded-full mb-4 bg-white border-4">
          <Link to="/">
          <img src={heroShoe} alt="" />
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Set New Password</h1>

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

        {/* {errorMessage && (
          <div className="mt-4 rounded-2xl bg-red-100 p-4 text-sm text-red-600">
            {errorMessage}
          </div>
        )} */}

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="mt-6 w-full rounded-full bg-black py-4 text-white disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
