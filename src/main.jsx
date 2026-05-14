import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Suppliers from "./pages/Suppliers";
import SupplierProfile from "./pages/SupplierProfile";
import RFQs from "./pages/RFQs";
import RFQDetail from "./pages/RFQDetail";
import CreateRFQ from "./pages/CreateRFQ";
import Verification from "./pages/Verification";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import Deals from "./pages/Deals";
import Escrow from "./pages/Escrow";
import Financing from "./pages/Financing";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/:id" element={<SupplierProfile />} />
        <Route path="/rfqs" element={<RFQs />} />
        <Route path="/rfqs/:id" element={<RFQDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/buyer-verification" element={<Verification type="buyer" />} />
        <Route path="/supplier-verification" element={<Verification type="supplier" />} />

        {/* Protected routes */}
        <Route path="/create-rfq" element={<ProtectedRoute><CreateRFQ /></ProtectedRoute>} />
        <Route path="/buyer-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/supplier-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/deals" element={<ProtectedRoute><Deals /></ProtectedRoute>} />
        <Route path="/escrow" element={<ProtectedRoute><Escrow /></ProtectedRoute>} />
        <Route path="/financing" element={<ProtectedRoute><Financing /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
