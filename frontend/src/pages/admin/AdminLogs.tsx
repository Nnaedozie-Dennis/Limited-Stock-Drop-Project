import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-toastify";

interface Log {
  action: string;
  product: string;
  quantity: number | string;
  created_at: string;
}

const AdminLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/admin/logs");
      setLogs(res.data.logs);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load inventory logs");
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "PRODUCT_CREATED":
        return "bg-blue-100 text-blue-700";

      case "RESERVATION_CREATED":
        return "bg-yellow-100 text-yellow-700";

      case "ORDER_COMPLETED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatAction = (action: string) => action.replaceAll("_", " ");

  return (
    <div className="p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Logs</h1>

        <p className="mt-2 text-gray-500">
          View inventory activities across the store.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left">Event</th>

                <th className="px-6 py-4 text-left">Product</th>

                <th className="px-6 py-4 text-left">Quantity</th>

                <th className="px-6 py-4 text-left">Date</th>

                <th className="px-6 py-4 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    Loading logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No activity found.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${getActionColor(
                          log.action,
                        )}`}
                      >
                        {formatAction(log.action)}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-medium">{log.product}</td>

                    <td className="px-6 py-5">{log.quantity}</td>

                    <td className="px-6 py-5">
                      {new Date(log.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      {new Date(log.created_at).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && logs.length > 0 && (
          <div className="flex items-center justify-center gap-2 border-t p-4 text-gray-500">
            <ClipboardList size={18} />
            Showing {logs.length} activity records
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogs;
