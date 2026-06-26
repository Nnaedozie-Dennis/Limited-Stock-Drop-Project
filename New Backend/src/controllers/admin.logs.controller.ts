import { supabase } from "../config/supabase";

export const getInventoryLogs = async (req: any, res: any) => {
  try {
    // Products
    const { data: products } = await supabase
      .from("products")
      .select("id, name, created_at");

    // Reservations
    const { data: reservations } = await supabase.from("reservations").select(`
        quantity,
        created_at,
        products (
          name
        )
      `);

    // Orders
    const { data: orders } = await supabase.from("orders").select(`
        quantity,
        created_at,
        reservations (
          products (
            name
          )
        )
      `);

    const logs: any[] = [];

    products?.forEach((product: any) => {
      logs.push({
        action: "PRODUCT_CREATED",
        product: product.name,
        quantity: "-",
        created_at: product.created_at,
      });
    });

    reservations?.forEach((reservation: any) => {
      logs.push({
        action: "RESERVATION_CREATED",
        product: reservation.products?.name,
        quantity: reservation.quantity,
        created_at: reservation.created_at,
      });
    });

    orders?.forEach((order: any) => {
      logs.push({
        action: "ORDER_COMPLETED",
        product: order.reservations?.products?.name,
        quantity: order.quantity,
        created_at: order.created_at,
      });
    });

    logs.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    return res.json({
      success: true,
      logs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
