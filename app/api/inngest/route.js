import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
} from "@/config/inngest/functions";

export const { GET, POST } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
  ],
});