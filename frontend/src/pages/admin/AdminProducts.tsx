import { Link } from "react-router-dom";

const AdminProducts = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Products</h1>

        <Link
          to="/admin/products/new"
          className="rounded-full bg-black px-6 py-3 text-white"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-8 rounded-3xl border">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-4">Image</td>
              <td className="p-4">Nike Dunk</td>
              <td className="p-4">$120</td>
              <td className="p-4">20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProducts;
