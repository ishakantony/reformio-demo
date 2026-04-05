import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { getUser, logout } from "../auth";

const adminNav = [
  { to: "/manage/dashboard", label: "Overview", icon: OverviewIcon, end: true },
  { to: "/manage/classes", label: "Classes", icon: ClassesIcon, end: false },
  { to: "/manage/students", label: "Students", icon: StudentsIcon, end: false },
  { to: "/manage/schedule", label: "Schedule", icon: ScheduleIcon, end: false },
  { to: "/manage/bookings", label: "Bookings", icon: BookingsIcon, end: false },
];

const studentNav = [
  { to: "/dashboard", label: "My Dashboard", icon: OverviewIcon, end: true },
  { to: "/dashboard/bookings", label: "My Bookings", icon: BookingsIcon, end: false },
];

export default function DashboardLayout() {
  const user = getUser()!;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = user.role === "admin" ? adminNav : studentNav;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-dvh bg-cream">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-60 bg-white border-r border-divider flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b border-divider">
          <Link
            to="/manage/dashboard"
            className="font-serif text-2xl font-semibold tracking-tight text-charcoal"
            onClick={() => setSidebarOpen(false)}
          >
            Reformio
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-cream text-warm-brown"
                    : "text-muted hover:text-charcoal hover:bg-cream/50"
                }`
              }
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info at bottom */}
        <div className="border-t border-divider px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-warm-brown text-cream flex items-center justify-center text-sm font-semibold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-charcoal truncate">{user.name}</p>
              <p className="text-xs text-muted capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 w-full text-left text-sm font-medium text-muted hover:text-charcoal transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-divider bg-white/80 backdrop-blur-lg">
          <div className="flex items-center justify-between px-6 py-4 lg:px-10">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden -ml-1 p-1 text-muted hover:text-charcoal"
              aria-label="Open sidebar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="lg:hidden" />

            {/* Right side — user info (desktop) */}
            <div className="ml-auto flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-charcoal">{user.name}</p>
                <p className="text-xs text-muted capitalize">{user.role}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-warm-brown text-cream flex items-center justify-center text-sm font-semibold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-6 py-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav Icons (simple SVGs)
// ---------------------------------------------------------------------------

function OverviewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ClassesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function StudentsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ScheduleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function BookingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
