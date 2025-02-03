import axios from "axios";
import dotenv from "dotenv";
import { config } from "./config";

dotenv.config();

const priceUrl = process.env.JUP_HTTPS_PRICE_URI || "";
const tokenMint = "GsCwr8pzpKBfyjToNGRBi8V8mUs39i7rPNbKBW4E4Loh";

async function fetchTokenPrice() {
  while (true) {
    try {
      console.log("Waiting for token price to be called (Rate Limit)...");
      await new Promise(resolve => setTimeout(resolve, 500));
      const priceResponseToken = await axios.get<any>(priceUrl, {
        params: {
          ids: tokenMint,
        },
        timeout: 10000,
      });

      const tokenData = priceResponseToken.data.data[tokenMint];

      if (tokenData && tokenData.price) {
        console.log("👀 Token Preis in USDC: ", tokenData.price);
      } else {
        console.log("⚠️ Kein Preis gefunden für Token: ", tokenMint);
      }
    } catch (error) {
      console.error("❌ Fehler beim Abrufen des Token-Preises: ", error);
    }
  }
}

fetchTokenPrice();
