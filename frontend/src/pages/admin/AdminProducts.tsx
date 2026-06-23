import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  image_url: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [saving, setSaving] = useState(false);



  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    stock: "",
    image_url: "",
  });

  const createProduct = async () => {
    try {
      await api.post("/products", {
        name: form.name,
        description: form.description,
        brand: form.brand,
        price: Number(form.price),
        stock: Number(form.stock),
        image_url: form.image_url,
      });

      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }

    toast.success("Product created successfully");
  };

  const deleteProduct = async (id: string) => {
    const prev = products;

    setProducts((p) => p.filter((item) => item.id !== id));

    try {
      await api.delete(`/products/${id}`);
    } catch (err) {
      console.error(err);
      setProducts(prev); // rollback
    }

    toast.success("Product deleted successfully");
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      description: product.description || "",
      brand: product.brand || "",
      price: String(product.price || ""),
      stock: String(product.stock || ""),
      image_url: product.image_url || "",
    });
    setShowModal(true);
  };

  const updateProduct = async () => {
      if (!editingProduct) return; 

      console.log("Editing product:", editingProduct);
      console.log("Payload:", form);
    try {
      await api.put(`/products/${editingProduct?.id}`, {
        name: form.name,
        description: form.description,
        brand: form.brand,
        price: Number(form.price),
        stock: Number(form.stock),
        image_url: form.image_url,
      });

      // console.log(res.data);

      setShowModal(false);
      setSaving(true);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }

    toast.success("Product updated successfully");
  };



  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/products?page=${page}&limit=10`);

      setProducts(res.data.products);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500">Manage your store products</p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setForm({
              name: "",
              description: "",
              brand: "",
              price: "",
              stock: "",
              image_url: "",
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* TABLE WRAPPER */}
      <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
            <thead className="border-b bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Stock</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  {/* PRODUCT CELL */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          product.image_url ||
                          "https://placehold.co/400x400?text=No+Image"
                        }
                        alt={product.name}
                        className="h-12 w-12 rounded-xl object-cover border"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold">${product.price}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(product)}
                        className="rounded-lg border p-2 hover:bg-blue-50"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-lg border p-2 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* MODAL (KEEP YOUR EXISTING ONE) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-sm dark:bg-slate-900 p-6">
            <h2 className="mb-4 text-xl font-bold">
              {editingProduct ? "Edit Product" : "Create Product"}
            </h2>

            <input
              placeholder="Name"
              className="mb-2 w-full rounded-lg border p-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
            placeholder="Description"
            rows={4}
            className="mb-2 w-full rounded-lg border p-2"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            />

            <input
              placeholder="Brand"
              className="mb-2 w-full rounded-lg border p-2"
              value={form.brand}
              onChange={(e) =>
                setForm({
                  ...form,
                  brand: e.target.value,
                })
              }
            />

            <input
              placeholder="Price"
              className="mb-2 w-full rounded-lg border p-2"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              placeholder="Stock"
              className="mb-2 w-full rounded-lg border p-2"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />

            <input
              placeholder="Image URL"
              className="mb-4 w-full rounded-lg border p-2"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />

            <div className="flex gap-2">
              <button
                disabled={saving}
                onClick={editingProduct ? updateProduct : createProduct}
                className="flex-1 rounded-lg bg-black px-4 py-2 text-white"
              >
                {saving
                  ? "Saving..."
                  : editingProduct
                    ? "Update Product"
                    : "Create Product"}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg border px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );


};

export default AdminProducts;