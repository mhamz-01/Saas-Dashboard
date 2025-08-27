"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { User } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empName, setEmpName] = useState("");
  const [empDesignation, setEmpDesignation] = useState("");
  const [empHierarchy, setEmpHierarchy] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      // 1. Create User in auth.users
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      // 2. If signup successful → insert into employees table
      const userId = data?.user?.id;
      if (userId) {
        const { error: empError } = await supabase.from("employees").insert([
          {
            user_id: userId,
            emp_name: empName,
            emp_designation: empDesignation,
            emp_hierarchylevel: empHierarchy,
          },
        ]);

        if (empError) {
          setError(empError.message);
          return;
        }
      }

      router.push("/"); // redirect after signup
    } else {
      // Login
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) setError(loginError.message);
      else if (data?.user) router.push("/");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Column - Auth Form */}
      <div className="w-1/3 bg-gray-900 text-white flex flex-col justify-center items-center p-10">
        {/* Big Icon */}
        <div className="bg-blue-500 p-6 rounded-full mb-6 shadow-lg">
          <User size={48} />
        </div>

        <h2 className="text-3xl font-bold mb-6">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        <form className="w-full max-w-sm space-y-4" onSubmit={handleAuth}>
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-400"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-400"
          />

          {/* Extra fields only for signup */}
          {isSignup && (
            <>
              <input
                type="text"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                value={empDesignation}
                onChange={(e) => setEmpDesignation(e.target.value)}
                placeholder="Designation"
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-400"
              />
              <input
                type="number"
                value={empHierarchy}
                onChange={(e) => setEmpHierarchy(e.target.value)}
                placeholder="Hierarchy Level"
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-400"
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        {/* Toggle between login/signup */}
        <p className="mt-6 text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Sign in" : "Sign up"}
          </span>
        </p>
      </div>

      {/* Right Column - Animation */}
      <div className="w-2/3 relative flex items-center justify-center bg-black overflow-hidden">
        {/* Moving Lines Background */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(0,150,255,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated Welcome Text */}
        <TypeAnimation
          sequence={
            isSignup
              ? ["Join DevWorks Agency Portal", 2000, "", 1000]
              : ["Welcome back to DevWorks", 2000, "", 1000]
          }
          wrapper="h1"
          speed={50}
          repeat={Infinity}
          className="relative text-white text-3xl md:text-5xl font-bold z-10"
        />
      </div>
    </div>
  );
}
