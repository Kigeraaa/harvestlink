import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import { Input } from "../components/forms/Input";
import { login, register, getRole } from "../lib/api";

export default function Auth({ mode = "login" }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const [email, setEmail] = useState(isLogin ? "exporter@greenvalley.co.ke" : "");
  const [password, setPassword] = useState(isLogin ? "password123" : "");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("exporter");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, fullName, role);
      }
      const userRole = getRole();
      if (userRole === "admin") navigate("/admin-dashboard");
      else if (userRole === "buyer") navigate("/buyer-dashboard");
      else navigate("/supplier-dashboard");
    } catch (error) {
      setMessage(isLogin
        ? `Login failed. Check your credentials. ${error.message}`
        : `Registration failed. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <main className="mx-auto max-w-lg px-4 py-16">
        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-soft">
          {isLogin && (
            <div className="inline-flex rounded-full bg-harvest-soft px-4 py-2 text-sm font-bold text-harvest-green">Demo: password123</div>
          )}
          <h1 className="mt-4 text-4xl font-black text-harvest-green">{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p className="mt-2 text-gray-600">{isLogin ? "Login to manage marketplace, RFQs, deals, escrow, and financing." : "Join HarvestLink as a buyer, exporter, or finance partner."}</p>
          <div className="mt-8 space-y-4">
            {!isLogin && (
              <Input label="Full Name" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            )}
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            {!isLogin && (
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-2xl border border-gray-200 p-3">
                  <option value="buyer">Buyer</option>
                  <option value="exporter">Exporter</option>
                  <option value="finance_partner">Finance Partner</option>
                </select>
              </div>
            )}
            {message && <div className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{message}</div>}
            <button disabled={loading} className="w-full rounded-2xl bg-harvest-green px-5 py-3 font-black text-white disabled:opacity-60">
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href={isLogin ? "/register" : "/login"} className="font-bold text-harvest-green">{isLogin ? "Sign up" : "Login"}</a>
          </p>
        </form>
      </main>
    </PageShell>
  );
}
