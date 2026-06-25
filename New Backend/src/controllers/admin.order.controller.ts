import { supabase } from "../config/supabase";

export const getAllOrders = async (req: any, res: any) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabase
      .from("orders")
      .select(
        `
        *,
        reservations (
          quantity,
          products (
            name,
            image_url,
            price
          )
        ),
        profiles!user_id (
    full_name,
    email
    ) 
      `,
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(start, end);


    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      orders: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
