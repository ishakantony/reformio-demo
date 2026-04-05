import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result.ok) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      {/* ---- Left: Form ---- */}
      <div className="relative flex flex-col bg-cream px-6 py-10 sm:px-12 lg:px-16 xl:px-24">
        {/* Subtle gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-col flex-1">
          {/* Header */}
          <div className="mb-16 lg:mb-20">
            <Link
              to="/"
              className="font-serif text-3xl font-semibold tracking-tight text-charcoal"
            >
              Reformio
            </Link>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mt-1.5">
              Studio Management Portal
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center max-w-sm w-full">
            <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-charcoal mb-2">
              Welcome back
            </h1>
            <p className="font-serif text-lg italic text-muted mb-10">
              Align your studio's journey with ease.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-muted mb-2"
                >
                  Studio Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="studio@reformio.com"
                  className="w-full rounded-lg border border-divider bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/40 outline-none focus:border-warm-brown focus:ring-1 focus:ring-warm-brown/30 transition-all duration-200"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-muted"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] font-medium text-warm-brown hover:text-warm-brown-dark transition-colors duration-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-divider bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/40 outline-none focus:border-warm-brown focus:ring-1 focus:ring-warm-brown/30 transition-all duration-200"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-full bg-warm-brown-dark px-6 py-3.5 text-sm font-medium text-cream shadow-md hover:bg-warm-brown hover:shadow-lg active:scale-[0.98] transition-all duration-300"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-[11px] text-muted/60 mt-16 lg:mt-20">
            &copy; {new Date().getFullYear()} Reformio Pilates Studio.
            Cultivating alignment in movement.
          </p>
        </div>
      </div>

      {/* ---- Right: Image + Quote ---- */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=960&q=80&auto=format"
          alt="Pilates studio with reformer equipment bathed in warm natural light"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Warm tint overlay */}
        <div className="absolute inset-0 bg-warm-brown/20" />

        {/* Quote card */}
        <div className="absolute bottom-12 left-12 right-12 xl:left-16 xl:right-16">
          <div className="rounded-2xl bg-cream/85 backdrop-blur-md px-8 py-7 shadow-lg">
            <div className="flex items-start gap-3 mb-3">
              {/* Decorative lotus / pilates icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-warm-brown shrink-0 mt-0.5"
              >
                <path d="M12 2C12 2 8 6 8 10c0 2.21 1.79 4 4 4s4-1.79 4-4c0-4-4-8-4-8z" />
                <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <blockquote className="font-serif text-lg sm:text-xl italic leading-relaxed text-charcoal mb-4">
              "In ten sessions you will feel the difference, in twenty you will
              see the difference, and in thirty you will have a whole new body."
            </blockquote>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted">
              — Joseph Pilates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
