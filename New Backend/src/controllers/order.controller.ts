import { supabase } from "../config/supabase";

export const checkoutReservation = async (req: any, res: any) => {
  const { reservationId } = req.body;

  const { data: reservation } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", reservationId)
    .single();

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: "Reservation not found",
    });
  }

  if (reservation.status !== "PENDING") {
    return res.status(400).json({
      success: false,
      message: "Reservation invalid",
    });
  }

  const { data: order, error } = await supabase
    .from("orders")
    .insert([
      {
        reservation_id: reservation.id,
        quantity: reservation.quantity,
        status: "COMPLETED",
      },
    ])
    .select()
    .single();

  if (error) {
    console.log("ORDER INSERT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  await supabase
    .from("reservations")
    .update({
      status: "COMPLETED",
    })
    .eq("id", reservation.id);

  return res.json({
    success: true,
    order,
  });
};
