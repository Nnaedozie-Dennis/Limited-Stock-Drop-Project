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

export const getOrders = async (req: any, res: any) => {

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      reservations (
        quantity,
        products (
          name,
          price,
          image_url
        )
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  return res.json({
    success: true,
    orders: data,
  });
};

export const getOrderById = async (req: any, res: any) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  return res.json({
    success: true,
    orders: data,
  });
};