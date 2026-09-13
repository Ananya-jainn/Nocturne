import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-[#faebd7]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full">

          {/* Heading */}

          <h1 className="font-display text-5xl font-semibold tracking-tight">
            JOIN NOCTURNE.
          </h1>

          <p className="mt-4 text-[#faebd7]/60">
            Create an account and save the music you love.
          </p>


          {/* Form */}

          <form
          onSubmit={handleSubmit} 
          className="mt-12 space-y-6">

            {/* Username */}

            <div>
              <label className="text-sm text-[#faebd7]/70">
                USERNAME
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="your name"
                className="mt-2 w-full rounded-xl border border-[#ad46e4]/50 bg-transparent px-4 py-3 outline-none transition focus:border-[#ad46e4] focus:ring-1 focus:ring-[#ad46e4]"
              />
            </div>


            {/* Email */}

            <div>
              <label className="text-sm text-[#faebd7]/70">
                EMAIL
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-[#ad46e4]/50 bg-transparent px-4 py-3 outline-none transition focus:border-[#ad46e4] focus:ring-1 focus:ring-[#ad46e4]"
              />
            </div>


            {/* Password */}

            <div>
              <label className="text-sm text-[#faebd7]/70">
                PASSWORD
              </label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-[#ad46e4]/50 bg-transparent px-4 py-3 outline-none transition focus:border-[#ad46e4] focus:ring-1 focus:ring-[#ad46e4]"
              />
            </div>


            {/* Create Account Button */}

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-[#ad46e4] py-3 font-medium text-black transition hover:scale-[1.02]"
            >
              CREATE ACCOUNT
            </button>

          </form>


          {/* Login */}

          <p className="mt-8 text-center text-sm text-[#faebd7]/60">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#ad46e4] transition hover:text-[#faebd7]"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;
