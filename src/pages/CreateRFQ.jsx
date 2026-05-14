import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import { Input, Select } from "../components/forms/Input";
import { apiPost } from "../lib/api";

export default function CreateRFQ() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    product_category: "Fruits",
    product_name: "",
    quantity: "",
    unit: "Metric Tons",
    target_price: "",
    destination_country: "",
    additional_notes: "",
    delivery_timeline: "",
  });

  function set(key) {
    return (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiPost('/rfqs', {
        ...form,
        quantity: Number(form.quantity),
        target_price: form.target_price ? Number(form.target_price) : null,
      });
      navigate('/rfqs');
    } catch (err) {
      setError(`Failed to submit RFQ. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <main className="mx-auto max-w-5xl px-4 py-12 lg:px-6">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-harvest-green">Create Request for Quote</h1>
          <p className="mt-3 text-gray-600">Get competitive quotes from verified suppliers. Fill out your requirements and HarvestLink will match you with relevant suppliers.</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Product Category</label>
              <select value={form.product_category} onChange={set('product_category')} className="w-full rounded-2xl border border-gray-200 p-3">
                <option>Fruits</option><option>Grains & Cereals</option><option>Oils & Fats</option><option>Coffee and Tea</option><option>Flowers</option><option>Nuts and Oil Seeds</option><option>Herbs and Spices</option>
              </select>
            </div>
            <Input label="Product Name" placeholder="e.g. Hass Avocados" value={form.product_name} onChange={set('product_name')} required />
            <Input label="Required Quantity" type="number" placeholder="Enter quantity" value={form.quantity} onChange={set('quantity')} required />
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Unit</label>
              <select value={form.unit} onChange={set('unit')} className="w-full rounded-2xl border border-gray-200 p-3">
                <option>Metric Tons</option><option>KG</option><option>Cartons</option><option>Liters</option><option>boxes</option>
              </select>
            </div>
            <Input label="Target Price (USD)" type="number" placeholder="e.g. 1500" value={form.target_price} onChange={set('target_price')} />
            <Input label="Destination Country" placeholder="e.g. United Arab Emirates" value={form.destination_country} onChange={set('destination_country')} required />
            <Input label="Delivery Timeline" placeholder="e.g. Within 14 days" value={form.delivery_timeline} onChange={set('delivery_timeline')} />
            <Input label="Additional Notes" textarea placeholder="Grade, variety, certifications, packaging..." value={form.additional_notes} onChange={set('additional_notes')} />
          </div>
          {error && <div className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <button disabled={loading} className="mt-8 rounded-2xl bg-harvest-green px-8 py-4 font-black text-white disabled:opacity-60">
            {loading ? "Submitting..." : "Submit RFQ"}
          </button>
        </form>
      </main>
    </PageShell>
  );
}
