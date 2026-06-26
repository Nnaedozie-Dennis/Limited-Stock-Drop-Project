// import { supabase } from "../config/supabase";

// export const getAllReservations = async (req: any, res: any) => {
//   try {
//     const { data, error } = await supabase
//       .from("reservations")
//       .select(
//         `
//         *,
//         profiles!user_id (
//           full_name,
//           email
//         ),
//         products (
//           name,
//           image_url,
//           price,
//           stock
//         )
//       `,
//       )
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.log("ADMIN RESERVATIONS ERROR:", error);

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     return res.json({
//       success: true,
//       reservations: data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

import { supabase } from "../config/supabase";

export const getAllReservations = async (req: any, res: any) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabase
      .from("reservations")
      .select(
        `
        *,
        profiles!user_id (
          full_name,
          email
        ),
        products (
          id,
          name,
          image_url,
          price,
          stock,
          brand
        )
        `,
        { count: "exact" },
      )
      .order("created_at", { ascending: false })
      .range(start, end);

    console.log("ADMIN RESERVATIONS ERROR:", error);
    console.log("ADMIN RESERVATIONS DATA:", data);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      reservations: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};