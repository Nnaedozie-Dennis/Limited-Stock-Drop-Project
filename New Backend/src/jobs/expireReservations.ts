import { supabase } from "../config/supabase";

export const expireReservationsJob = async () => {
  try {
    const now = new Date().toISOString();

    // 1. Get expired reservations still pending
    const { data: expiredReservations, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("status", "PENDING")
      .lt("expires_at", now);

    if (error) {
      console.error("Expiration fetch error:", error.message);
      return;
    }

    if (!expiredReservations || expiredReservations.length === 0) {
      return;
    }

    for (const reservation of expiredReservations) {
      // 2. Get product
      const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", reservation.product_id)
        .single();

      if (!product) continue;

      // 3. Restore stock
      await supabase
        .from("products")
        .update({
          stock: product.stock + reservation.quantity,
        })
        .eq("id", product.id);

      // 4. Mark reservation as expired
      await supabase
        .from("reservations")
        .update({
          status: "EXPIRED",
        })
        .eq("id", reservation.id);
    }

    console.log(`Expired ${expiredReservations.length} reservations`);
  } catch (error) {
    console.error("Expiration job error:", error);
  }
};
