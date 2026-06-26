import { supabase } from "../config/supabase";

export const getAllUsers = async (req: any, res: any) => {
  try {
    // Fetch every profile
    const { data: users, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // Count reservations + orders for each user
    const usersWithStats = await Promise.all(
      (users || []).map(async (user) => {
        const { count: reservations } = await supabase
          .from("reservations")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id);

        const { count: orders } = await supabase
          .from("orders")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id);

        return {
          ...user,
          reservations: reservations || 0,
          orders: orders || 0,
        };
      }),
    );

    return res.json({
      success: true,
      users: usersWithStats,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
