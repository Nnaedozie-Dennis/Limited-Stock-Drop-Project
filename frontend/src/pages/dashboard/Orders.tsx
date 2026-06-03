const Orders = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Orders</h1>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <table className="w-full">
          <thead>
            <tr>
              <th align="left">Order</th>
              <th align="left">Status</th>
              <th align="left">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#ATH-102938</td>
              <td>Completed</td>
              <td>$220</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
