import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error.message);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border p-8">
        <h1 className="text-3xl font-bold">Set New Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full rounded-2xl border p-4"
        />

        <button
          onClick={handleUpdatePassword}
          className="mt-6 w-full rounded-full bg-black py-4 text-white"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
