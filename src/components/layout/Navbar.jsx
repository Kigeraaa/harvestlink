import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { isLoggedIn, logout, getRole } from "../../lib/api";

const navItems = [
  ["Products", "/products"],
  ["RFQ Market", "/rfqs"],
  ["Suppliers", "/suppliers"],
  ["Deals", "/deals"],
  ["Escrow", "/escrow"],
  ["Financing", "/financing"],
  ["Pricing", "/pricing"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loggedIn = isLoggedIn();
  const role = getRole();
  const navigate = useNavigate();

  const dashboardPath = role === "admin" ? "/admin-dashboard"
    : role === "buyer" ? "/buyer-dashboard"
    : "/supplier-dashboard";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-green-900/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-harvest-green text-white">
            <Leaf size={22} />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-harvest-green">HARVEST<span className="text-harvest-orange">LINK</span></div>
            <div className="text-xs text-gray-500">Connecting Global Agriculture</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? "text-harvest-leaf" : "text-gray-700 hover:text-harvest-leaf"}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {loggedIn ? (
            <>
              <Link to={dashboardPath} className="flex items-center gap-2 rounded-xl border border-harvest-green px-4 py-2 text-sm font-semibold text-harvest-green hover:bg-harvest-soft">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl bg-harvest-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-900">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-xl border border-harvest-green px-5 py-2 text-sm font-semibold text-harvest-green hover:bg-harvest-soft">Login</Link>
              <Link to="/register" className="rounded-xl bg-harvest-green px-5 py-2 text-sm font-semibold text-white shadow-soft hover:bg-green-900">Join Now</Link>
            </>
          )}
        </div>

        <button className="rounded-xl border p-2 lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-green-900/10 bg-white px-4 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navItems.map(([label, path]) => (
              <NavLink key={path} to={path} onClick={() => setOpen(false)}
                className={({ isActive }) => isActive ? "text-harvest-leaf font-bold" : "text-gray-700"}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            {loggedIn ? (
              <>
                <Link to={dashboardPath} onClick={() => setOpen(false)} className="rounded-xl border border-harvest-green px-5 py-3 text-center text-sm font-semibold text-harvest-green">Dashboard</Link>
                <button onClick={handleLogout} className="rounded-xl bg-harvest-green px-5 py-3 text-sm font-semibold text-white">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl border border-harvest-green px-5 py-3 text-center text-sm font-semibold text-harvest-green">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="rounded-xl bg-harvest-green px-5 py-3 text-center text-sm font-semibold text-white">Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
