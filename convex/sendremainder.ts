import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminderEmail = mutation({
  args: {
    email: v.string(),
    title: v.string(),
  },

  handler: async (_, args) => {
    await resend.emails.send({
      from: "Quickflow <onboarding@resend.dev>",
      to: args.email,
      subject: "⏰ Task Reminder",
      text: `Reminder for your task:\n\n${args.title}`,
    });
  },
});
