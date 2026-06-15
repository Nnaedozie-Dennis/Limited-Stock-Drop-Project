import { supabase } from "../config/supabase";

export const getAdminStats = async (req: any, res: any) => {
  try {
    const { count: products } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: reservations } = await supabase
      .from("reservations")
      .select("*", { count: "exact", head: true });

    const { count: orders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    const { data: allOrders } = await supabase.from("orders").select(`
        quantity,
        reservations (
          products (
            price
          )
        )
      `);

    let revenue = 0;

    allOrders?.forEach((order: any) => {
      revenue += order.quantity * (order.reservations?.products?.price || 0);
    });

    return res.json({
      success: true,
      stats: {
        products: products || 0,
        reservations: reservations || 0,
        orders: orders || 0,
        revenue,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
