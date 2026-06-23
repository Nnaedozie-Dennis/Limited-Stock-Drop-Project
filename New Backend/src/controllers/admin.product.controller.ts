import { supabase } from "../config/supabase";

// CREATE createProduct
export const createProduct = async (req: any, res: any) => {
  // console.log(req.body);
  try {
    const { name, description, brand, price, image_url, stock } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        price,
        description,
        brand,
        image_url,
        stock,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      product: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update Product
export const updateProduct = async (req: any, res: any) => {
  // console.log(req.body);
  try {
    const { id } = req.params;
    const { name, description, brand, price, image_url, stock } = req.body;

    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        description,
        brand,
        price,
        image_url,
        stock,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      product: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete Product
export const deleteProduct = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
