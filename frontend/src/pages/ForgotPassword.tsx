// import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";

// const ForgotPassword = () => {

//   await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: "http://localhost:5173/reset-password",
//   });

//   await supabase.auth.updateUser({
//     password: newPassword,
//   });

//   return (
//     <>
//       <Header />

//       <main className="flex min-h-screen items-center justify-center px-6 py-20">
//         <div className="w-full max-w-md rounded-3xl border p-8">
//           <h1 className="text-center text-4xl font-bold">Reset Password</h1>

//           <p className="mt-4 text-center text-gray-500">
//             Enter your email address to receive a reset link.
//           </p>

//           <form className="mt-10 space-y-5">
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full rounded-2xl border p-4"
//             />

//             <button className="w-full rounded-full bg-black py-4 text-white dark:bg-white dark:text-black">
//               Send Reset Link
//             </button>
//           </form>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// };

// export default ForgotPassword;





import { useState } from "react";
import { supabase } from "../lib/supabase";
import heroShoe from "../assets/images/hero-shoe.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) {
      console.log(error.message);
      return;
    }

    alert("Password reset link sent.");
  };

  return (
    <>

      <main className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border p-8">
          <div className="w-20 m-auto border-green-600 p-2 rounded-full mb-4 bg-white border-4">
                      <img src={heroShoe} alt="" />
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

            <button
              type="submit"
              className="w-full rounded-full bg-black py-4 text-white dark:bg-white dark:text-black"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </main>

    </>
  );
};

export default ForgotPassword;