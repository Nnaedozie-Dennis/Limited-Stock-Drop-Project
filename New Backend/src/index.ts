import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import reservationRoutes from "./routes/reservation.routes";
import orderRoutes from "./routes/order.routes";
import { expireReservationsJob } from "./jobs/expireReservations";


const app = express();

app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:3000"], // Vite default + React
//     credentials: true,
//   }),
// );
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "aether-backend" });
});

app.use("/api/products", productRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/orders", orderRoutes);

setInterval(() => {
  expireReservationsJob();
}, 60 * 1000); // runs every 1 minute

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
