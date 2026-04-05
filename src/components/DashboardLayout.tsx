import { useState, useRef, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutGrid, BookOpen, Users, Calendar, FileText, Menu, LogOut } from "lucide-react";
import { getUser, logout } from "../auth";

const adminNav = [
  { to: "/manage/dashboard", label: "Overview", icon: <LayoutGrid size={20} strokeWidth={1.5} />, end: true },
  { to: "/manage/classes", label: "Classes", icon: <BookOpen size={20} strokeWidth={1.5} />, end: false },
  { to: "/manage/students", label: "Students", icon: <Users size={20} strokeWidth={1.5} />, end: false },
  { to: "/manage/schedule", label: "Schedule", icon: <Calendar size={20} strokeWidth={1.5} />, end: false },
  { to: "/manage/bookings", label: "Bookings", icon: <FileText size={20} strokeWidth={1.5} />, end: false },
];

const studentNav = [
  { to: "/dashboard", label: "My Dashboard", icon: <LayoutGrid size={20} strokeWidth={1.5} />, end: true },
  { to: "/classes", label: "Classes", icon: <BookOpen size={20} strokeWidth={1.5} />, end: false },
  { to: "/bookings", label: "My Bookings", icon: <FileText size={20} strokeWidth={1.5} />, end: false },
];

export default function DashboardLayout() {
  const user = getUser()!;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems = user.role === "admin" ? adminNav : studentNav;

  function handleLogout() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen]);

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
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

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
              <Menu size={24} />
            </button>

            <div className="lg:hidden" />

            {/* Right side — user menu */}
            <div className="ml-auto relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-3 rounded-lg px-2 py-1.5 -mr-2 hover:bg-cream/60 transition-colors duration-200"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-charcoal">{user.name}</p>
                  <p className="text-xs text-muted capitalize">{user.role}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-warm-brown text-cream flex items-center justify-center text-sm font-semibold">
                  {user.name.charAt(0)}
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-divider shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium text-muted hover:text-charcoal hover:bg-cream/50 transition-colors duration-200"
                  >
                    <LogOut size={16} strokeWidth={1.5} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-6 py-8 lg:px-10 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

