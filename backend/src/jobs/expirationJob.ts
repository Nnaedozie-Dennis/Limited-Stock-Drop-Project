import { ExpirationService } from "../services/expirationService";

const expirationService = new ExpirationService();

export const startExpirationJob = () => {
  console.log("🕒 Expiration job started - checking every 30 seconds");

  setInterval(async () => {
    try {
      await expirationService.expireReservations();
    } catch (error) {
      console.error("Expiration job failed:", error);
    }
  }, 30 * 1000); // Run every 30 seconds (good for testing)
};
