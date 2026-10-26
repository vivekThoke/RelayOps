"use-client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not laod product");
      }

      return response.json();
    })
    .then((data) => setProducts(data.products))
    .catch(() => {
      setError("Could not connect to RelayOps API, Is backend running?")
    })
    .finally(() => setLoading(false));
  }, [])

   return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900 md:p-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
            RelayOps
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Operations Dashboard
          </h1>
          <p className="mt-2 text-slate-600">
            Monitor inventory and prepare customer orders.
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Products available</p>
            <p className="mt-2 text-3xl font-bold">{products.length}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total units in stock</p>
            <p className="mt-2 text-3xl font-bold">
              {products.reduce((total, product) => total + product.stock, 0)}
            </p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Inventory</h2>

          {loading && <p>Loading products...</p>}

          {error && (
            <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="py-3 pr-4">Product</th>
                    <th className="py-3 pr-4">SKU</th>
                    <th className="py-3 pr-4">Price</th>
                    <th className="py-3">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="py-4 pr-4 font-medium">{product.name}</td>
                      <td className="py-4 pr-4">{product.id}</td>
                      <td className="py-4 pr-4">
                        ₹{product.price.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4">
                        <span
                          className={
                            product.stock < 10
                              ? "font-semibold text-red-600"
                              : "font-semibold text-green-700"
                          }
                        >
                          {product.stock} units
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="mt-6 text-xs text-slate-500">
          Demo environment · Sample inventory · No live orders are being placed
        </p>
      </div>
    </main>
  );
}