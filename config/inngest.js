import { Inngest } from "inngest";
import { connectDB } from "./db";
import User from "@/models/User";

// Create Inngest Client
export const inngest = new Inngest({
  id: "quickcart-next",
});


// ================= USER CREATE =================
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    await connectDB();

    await User.create({
      _id: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url,
    });
  }
);


// ================= USER UPDATE =================
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      image_url,
    } = event.data;

    await connectDB();

    await User.findByIdAndUpdate(id, {
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      imageUrl: image_url,
    });
  }
);


// ================= USER DELETE =================
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();

    await User.findByIdAndDelete(id);
  }
);