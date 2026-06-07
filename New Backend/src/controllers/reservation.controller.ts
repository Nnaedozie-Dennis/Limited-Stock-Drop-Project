// import { Request, Response } from "express";
// import { supabase } from "../config/supabase";

// export const createReservation = async (req: Request, res: Response) => {
//   try {
//     const { productId, quantity } = req.body;

//     // Find product
//     const { data: product, error: productError } = await supabase
//       .from("products")
//       .select("*")
//       .eq("id", productId)
//       .single();

//     if (productError || !product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Check stock
//     if (product.stock < quantity) {
//       return res.status(400).json({
//         success: false,
//         message: "Not enough stock available",
//       });
//     }

//     // Reduce stock
//     const { error: stockError } = await supabase
//       .from("products")
//       .update({
//         stock: product.stock - quantity,
//       })
//       .eq("id", productId);

//     if (stockError) {
//       return res.status(500).json({
//         success: false,
//         message: stockError.message,
//       });
//     }

//     // Create expiry (5 mins)
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

//     // Create reservation
//     const { data: reservation, error: reservationError } = await supabase
//       .from("reservations")
//       .insert({
//         product_id: productId,
//         quantity,
//         status: "PENDING",
//         expires_at: expiresAt,
//       })
//       .select()
//       .single();

//     if (reservationError) {
//       return res.status(500).json({
//         success: false,
//         message: reservationError.message,
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       reservation,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export const getReservationById = async (req: any, res: any) => {
//   const { id } = req.params;

//   const { data, error } = await supabase
//     .from("reservations")
//     .select(`*, products(*)`)
//     .eq("id", id)
//     .single();

//   if (error) {
//     return res.status(404).json({
//       success: false,
//       message: "Reservation not found",
//     });
//   }

//   return res.json({
//     success: true,
//     reservation: data,
//   });
// };

// export const getReservations = async (req: any, res: any) => {
//   const { data, error } = await supabase
//     .from("reservations")
//     .select(
//       `
//       *,
//       products (
//         name,
//         image_url,
//         price
//       )
//     `,
//     )
//     .order("created_at", {
//       ascending: false,
//     });

//   if (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

//   return res.json({
//     success: true,
//     reservations: data,
//   });
// };





















import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      
      .single();

    if (productError || !product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    const { error: stockError } = await supabase
      .from("products")
      .update({
        stock: product.stock - quantity,
      })
      .eq("id", productId);

    if (stockError) {
      return res.status(500).json({
        success: false,
        message: stockError.message,
      });
    }

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .insert({
        product_id: productId,
        quantity,
        status: "PENDING",
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (reservationError) {
      return res.status(500).json({
        success: false,
        message: reservationError.message,
      });
    }

    return res.status(201).json({
      success: true,
      reservation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      products (*)
    `,
    )
    .eq("id", id)
    // .eq("user_id", req.user.id)
    .single();

  if (error) {
    return res.status(404).json({
      success: false,
      message: "Reservation not found",
    });
  }

  return res.json({
    success: true,
    reservation: data,
  });
};

export const getReservations = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("reservations")
    .select(
      `
      *,
      products (
        name,
        image_url,
        price
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  return res.json({
    success: true,
    reservations: data,
  });
};