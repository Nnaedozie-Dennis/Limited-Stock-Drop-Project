import { supabase } from "../config/supabase";

export const getDashboardStats = async (req: any, res: any) => {
  try {
    const { count: reservationsCount } = await supabase
      .from("reservations")
      .select("*", { count: "exact", head: true });

    const { count: ordersCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    const { data: orders } = await supabase.from("orders").select(`
        *,
        reservations (
          quantity,
          products (
            price
          )
        )
      `);

    let totalSpent = 0;

    orders?.forEach((order: any) => {
      totalSpent +=
        order.reservations.quantity * order.reservations.products.price;
    });

    return res.json({
      success: true,
      stats: {
        reservations: reservationsCount || 0,
        orders: ordersCount || 0,
        totalSpent,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
