"use server";
import { connectDB } from "./connectDB";
import mongoose from "mongoose";
import { response } from "./util";
import { Guest } from "../../types";

// Check if model is already registered
const GuestSchema = new mongoose.Schema({
  guests: [
    {
      name: { type: String, default: "" },
      type: { type: String, default: "original" },
      allergies: { type: String, default: "" },
      allergyDetails: { type: String, default: "" },
    },
  ],
  songs: [
    {
      albumCover: String,
      albumName: String,
      artist: String,
      id: String,
      name: String,
    },
  ],
  attending: String,
  allowedPlusOne: String,
});

const GuestPartyList =
  mongoose.models.GuestPartyList ||
  mongoose.model("GuestPartyList", GuestSchema);

export const GET_Guests = async () => {
  try {
    await connectDB(); // Ensure this manages a single connection
    const guestList = await GuestPartyList.find({}).lean();

    return response(guestList);
  } catch (err) {
    console.error("Error fetching guest list:", err);
    throw err; // Throw the error or handle it properly based on your app's needs
  }
};

export const NEW_Guest = async (guest: Guest) => {
  try {
    await connectDB();
    const newItem = new GuestPartyList(guest);

    console.log("New Item:", newItem); // Log the newItem object to check the structure

    // Save without validation
    await newItem.save();

    // Fetch updated list of guest entries
    const newGuestList = await GuestPartyList.find({});
    return { data: newGuestList, error: null };
  } catch (err) {
    console.error("Error creating new guest:", err);
    return { data: null, error: err };
  }
};

export const GET_SpecificGuest = async (name?: string, id?: string) => {
  try {
    const searchFunction = id
      ? { _id: id }
      : {
          "guests.name": new RegExp(`^${name}`, "i"),
          "guests.type": "original",
        };

    await connectDB(); // Ensure this manages a single connection
    const foundGuest = await GuestPartyList.findOne(searchFunction).lean();

    return response(foundGuest);
  } catch (err) {
    console.error("Error fetching guest list:", err);
    throw err; // Throw the error or handle it properly based on your app's needs
  }
};

type Guests = Record<string, string>;

export const UPDATE_Guests = async (details: any) => {
  try {
    await connectDB();

    if (!details._id) {
      const newPartyGuests = await NEW_Guest(details as Guest);
      return response(newPartyGuests);
    }

    const updatedGuest = await GuestPartyList.updateOne(
      { _id: details._id },
      {
        $set: {
          guests: details.guests,
          attending: details.attending,
          allowedPlusOne: details.allowedPlusOne,
          songs: details.songs || [],
        },
      }
    );

    console.log("Guest updated successfully:", updatedGuest);
    return response(updatedGuest);
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error;
  }
};
