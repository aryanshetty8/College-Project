import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const checkAndSendReminders = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    const documents = await ctx.db
      .query("documents")
      .filter((q) =>
        q.and(
          q.lte(q.field("reminderTime"), now),
          q.eq(q.field("reminderSent"), false)
        )
      )
      .collect();

    for (const doc of documents) {
      if (!doc.reminderEmail) continue;

      await resend.emails.send({
        from: "Quickflow <onboarding@resend.dev>",
        to: doc.reminderEmail,
        subject: "⏰ Task Reminder",
        text: `Reminder for task:\n\n${doc.title}`,
      });

      await ctx.db.patch(doc._id, {
        reminderSent: true,
      });
    }
  },
});
