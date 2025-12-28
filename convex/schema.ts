import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
    userId: v.string(),

    isArchived: v.boolean(),
    isPublished: v.boolean(),

    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),

    // 🔔 Reminder fields (FIXED)
    reminderTime: v.optional(v.number()),
    reminderEmail: v.optional(v.string()),
    reminderSent: v.optional(v.boolean()),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});
