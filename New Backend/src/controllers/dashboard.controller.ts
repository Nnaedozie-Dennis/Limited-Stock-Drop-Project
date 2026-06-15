import { supabase } from "../config/supabase";

export const getDashboardStats = async (req: any, res: any) => {
  const userId = req.user?.id;
  try {
    const { count: reservationsCount } = await supabase
      .from("reservations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { count: ordersCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    const { data: orders } = await supabase
      .from("orders")
      .select(
        `
        *,
        reservations (
          quantity,
          products (
            price
          )
        )
      `,
      )
      .eq("user_id", userId);

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












// import { supabase } from "../config/supabase";

// export const getDashboardStats = async (req: any, res: any) => {
//   const userId = req.user?.id;

//   try {
//     // 1. Stats (same logic you already have)
//     const { count: reservationsCount } = await supabase
//       .from("reservations")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId);

//     const { count: ordersCount } = await supabase
//       .from("orders")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId);

//     const { data: ordersForCalc } = await supabase
//       .from("orders")
//       .select(
//         `
//         *,
//         reservations (
//           quantity,
//           products (
//             price
//           )
//         )
//       `,
//       )
//       .eq("user_id", userId);

//     let totalSpent = 0;

//     ordersForCalc?.forEach((order: any) => {
//       totalSpent +=
//         order.reservations.quantity * order.reservations.products.price;
//     });

//     // 2. Recent orders
//     const { data: recentOrders } = await supabase
//       .from("orders")
//       .select(
//         `
//         *,
//         reservations (
//           quantity,
//           products (
//             name,
//             price,
//             image_url
//           )
//         )
//       `,
//       )
//       .eq("user_id", userId)
//       .order("created_at", { ascending: false })
//       .limit(5);

//     // 3. Recent reservations
//     const { data: recentReservations } = await supabase
//       .from("reservations")
//       .select(
//         `
//         *,
//         products (
//           name,
//           image_url,
//           price
//         )
//       `,
//       )
//       .eq("user_id", userId)
//       .order("created_at", { ascending: false })
//       .limit(5);

//     return res.json({
//       success: true,
//       stats: {
//         reservations: reservationsCount || 0,
//         orders: ordersCount || 0,
//         totalSpent,
//       },
//       recentOrders,
//       recentReservations,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };