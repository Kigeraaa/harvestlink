import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
        <div className="text-8xl font-black text-harvest-green">404</div>
        <h1 className="mt-4 text-3xl font-black text-harvest-green">Page not found</h1>
        <p className="mt-3 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-8 rounded-2xl bg-harvest-green px-8 py-3 font-bold text-white">Go home</Link>
      </main>
    </PageShell>
  );
}
