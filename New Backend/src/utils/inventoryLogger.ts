





// import { supabase } from "../config/supabase";

// interface InventoryLog {
//   product_id: string;
//   action: string;
//   quantity: number;
//   stock_before: number;
//   stock_after: number;
// }

// export const logInventoryChange = async ({
//   product_id,
//   action,
//   quantity,
//   stock_before,
//   stock_after,
// }: InventoryLog) => {
//   const { error } = await supabase.from("inventory_logs").insert({
//     product_id,
//     action,
//     quantity,
//     stock_before,
//     stock_after,
//   });

//   if (error) {
//     console.error("Inventory Log Error:", error);
//   }
// };
