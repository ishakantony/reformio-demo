import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../auth";

export default function Dashboard() {
  const user = getUser()!;
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-dvh bg-cream">
      {/* Top bar */}
      <header className="border-b border-divider bg-white">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-10">
          <Link
            to="/dashboard"
            className="font-serif text-2xl font-semibold tracking-tight text-charcoal"
          >
            Reformio
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-charcoal">{user.name}</p>
              <p className="text-xs text-muted capitalize">{user.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-warm-brown text-cream flex items-center justify-center text-sm font-semibold">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-muted hover:text-charcoal transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Placeholder content */}
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="font-serif text-4xl font-medium text-charcoal mb-2">
          Dashboard
        </h1>
        <p className="text-muted text-lg">
          Welcome back, {user.name}. This page is under construction.
        </p>
      </main>
    </div>
  );
}
