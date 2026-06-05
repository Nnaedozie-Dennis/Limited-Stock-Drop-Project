import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    // Find product
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

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // Reduce stock
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

    // Create expiry (5 mins)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Create reservation
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
