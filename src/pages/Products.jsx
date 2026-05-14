import { useEffect, useMemo, useState } from "react";
import PageShell from "../components/layout/PageShell";
import ProductCard from "../components/cards/ProductCard";
import { categories, products as fallbackProducts } from "../data/mockData";
import { apiGet, mapProduct } from "../lib/api";

const COUNTRIES = ["All Countries", "Kenya", "Tanzania", "Ethiopia", "United Arab Emirates", "Netherlands"];

export default function Products() {
  const [products, setProducts] = useState(fallbackProducts);
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [apiProducts, companies] = await Promise.all([apiGet('/products'), apiGet('/companies')]);
        if (apiProducts) setProducts(apiProducts.map((p) => mapProduct(p, companies)));
      } catch (error) {
        console.warn('Using fallback products:', error.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function toggleCategory(name) {
    setSelectedCategories(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = !query || [p.name, p.category, p.country, p.seller].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesCountry = selectedCountry === "All Countries" || p.country === selectedCountry;
      return matchesQuery && matchesCategory && matchesCountry;
    });
  }, [products, query, selectedCategories, selectedCountry]);

  return (
    <PageShell>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="inline-flex rounded-full bg-harvest-soft px-4 py-2 text-sm font-bold text-harvest-green">Marketplace + Supplier Discovery</div>
          <h1 className="mt-4 text-5xl font-black text-harvest-green">Product Marketplace</h1>
          <p className="mt-3 max-w-2xl text-gray-600">Browse export-ready agricultural products from verified suppliers.</p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 rounded-2xl border border-gray-200 px-5 py-3" placeholder="Search products, suppliers, country..." />
            <button onClick={() => { setQuery(""); setSelectedCategories([]); setSelectedCountry("All Countries"); }} className="rounded-2xl border border-gray-300 px-6 py-3 font-bold text-gray-600 hover:bg-gray-50">
              Clear
            </button>
          </div>
        </div>
      </section>
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-4 lg:px-6">
        <aside className="rounded-3xl bg-white p-5 shadow-sm">
          <h3 className="font-black text-harvest-green">Filters</h3>
          <div className="mt-5 space-y-5">
            <div>
              <label className="text-sm font-bold">Category</label>
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                {categories.map(c => (
                  <label key={c.name} className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="mr-1" checked={selectedCategories.includes(c.name)} onChange={() => toggleCategory(c.name)} />
                    {c.name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-bold">Country</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="mt-2 w-full rounded-xl border p-3">
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </aside>
        <section className="lg:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-gray-500">{loading ? 'Loading products...' : `Showing ${filtered.length} products`}</p>
            <select className="rounded-xl border bg-white p-3 text-sm"><option>Sort by Latest</option><option>Lowest MOQ</option><option>Verified Suppliers</option></select>
          </div>
          {filtered.length === 0 && !loading && (
            <div className="rounded-3xl bg-white p-12 text-center text-gray-500 shadow-sm">No products match your filters.</div>
          )}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
