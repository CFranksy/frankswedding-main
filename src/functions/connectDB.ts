"use server";

import mongoose from "mongoose";

export const connectDB = async () => {
  const URL = process.env.MONGODB_URL; // Access the environment variable directly
  if (!URL) {
    console.error(
      "Please define the process.env.MONGODB_URL environment variable inside .env.local"
    );
    return "Please define the process.env.MONGODB_URL environment variable inside .env.local";
  }

  console.log("[--ATTEMPTING CONNECTION--]");

  try {
    // Check if mongoose is already connected to prevent multiple connections
    if (mongoose.connection.readyState === 0) {
      console.log("[--STARTING CONNECTION--]");
      await mongoose.connect(URL);
      console.log("[--CONNECTION ESTABLISHED--]");
    } else {
      console.log("[--ALREADY CONNECTED--]");
    }

    return;
  } catch (err) {
    console.error("[--CONNECTION ERROR--]", err);
    return err;
  }
};
