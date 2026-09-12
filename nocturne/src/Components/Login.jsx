import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-[#faebd7]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full">
          
          {/* Heading */}

          <h1 className="font-display text-5xl font-semibold tracking-tight">
            WELCOME BACK.
          </h1>

          <p className="mt-4 text-[#faebd7]/60">
            Sign in to access your favourite music.
          </p>

          {/* Form */}

          <form className="mt-12 space-y-6">
            
            {/* Email */}

            <div>
              <label className="text-sm text-[#faebd7]/70">
                EMAIL
              </label>

              <input
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
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-[#ad46e4]/50 bg-transparent px-4 py-3 outline-none transition focus:border-[#ad46e4] focus:ring-1 focus:ring-[#ad46e4]"
              />
            </div>

            {/* Sign In Button */}

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-[#ad46e4] py-3 font-medium text-black transition hover:scale-[1.02]"
            >
              SIGN IN
            </button>
          </form>

          {/* Signup */}

          <p className="mt-8 text-center text-sm text-[#faebd7]/60">
            New here?{" "}
            
            <Link
              to="/sign-up"
              className="text-[#ad46e4] transition hover:text-[#faebd7]"
            >
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
