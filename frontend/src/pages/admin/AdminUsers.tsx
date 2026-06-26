// const AdminUsers = () => {
//   return (
//     <>
//       <h1 className="text-4xl font-bold">Users</h1>

//       <div className="mt-8 rounded-3xl border p-8">Users table goes here.</div>
//     </>
//   );
// };

// export default AdminUsers;



import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-toastify";

interface User {
  id: string;
  full_name: string;
  email: string;
  created_at: string;

  reservations: number;
  orders: number;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>

        <p className="mt-2 text-gray-500">View all registered users.</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Reservations</th>
                <th className="px-6 py-4 text-left">Orders</th>
                <th className="px-6 py-4 text-left">Joined</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-5 font-semibold">
                      {user.full_name}
                    </td>

                    <td className="px-6 py-5">{user.email}</td>

                    <td className="px-6 py-5">{user.reservations}</td>

                    <td className="px-6 py-5">{user.orders}</td>

                    <td className="px-6 py-5">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <button className="rounded-lg border p-2 hover:bg-blue-50">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
