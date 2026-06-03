

const ReservationPreview = () => {
  return (
    <div className="rounded-3xl border p-6">
      <p className="text-sm uppercase tracking-widest text-gray-500">
        Reservation Window
      </p>

      <h3 className="mt-3 text-4xl font-bold">05:00</h3>

      <p className="mt-3 text-gray-500">
        Once reserved, you'll have five minutes to complete checkout.
      </p>
    </div>
  );
};

export default ReservationPreview;
