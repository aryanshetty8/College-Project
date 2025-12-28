import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

/* ===================== CREATE DOCUMENT ===================== */
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
    reminderTime: v.optional(v.number()),
    reminderEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId: identity.subject,
      isArchived: false,
      isPublished: false,

      // 🔔 Reminder fields
      reminderTime: args.reminderTime,
      reminderEmail: args.reminderEmail,
      reminderSent: false,
    });
  },
});

/* ===================== SIDEBAR ===================== */
export const getSidebar = query({
  args: { parentDocument: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", identity.subject).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
  },
});

/* ===================== GET DOCUMENT BY ID ===================== */
export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Not found");

    if (document.isPublished && !document.isArchived) return document;

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    if (document.userId !== identity.subject)
      throw new Error("Unauthorized");

    return document;
  },
});

/* ===================== UPDATE DOCUMENT ===================== */
export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),

    // 🔔 ADD THESE
    reminderTime: v.optional(v.number()),
    reminderEmail: v.optional(v.string()),
    reminderSent: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Not found");
    if (document.userId !== identity.subject)
      throw new Error("Unauthorized");

    const { id, ...rest } = args;
    return await ctx.db.patch(id, rest);
  },
});

/* ===================== ARCHIVE DOCUMENT ===================== */
export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Not found");
    if (document.userId !== identity.subject)
      throw new Error("Unauthorized");

    return await ctx.db.patch(args.id, { isArchived: true });
  },
});

/* ===================== RESTORE DOCUMENT ===================== */
export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Not found");
    if (document.userId !== identity.subject)
      throw new Error("Unauthorized");

    return await ctx.db.patch(args.id, { isArchived: false });
  },
});

/* ===================== DELETE DOCUMENT ===================== */
export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const document = await ctx.db.get(args.id);
    if (!document) throw new Error("Not found");
    if (document.userId !== identity.subject)
      throw new Error("Unauthorized");

    return await ctx.db.delete(args.id);
  },
});

/* ===================== TRASH ===================== */
export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) =>
        q.eq("userId", identity.subject)
      )
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
  },
});

/* ===================== SEARCH ===================== */
export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) =>
        q.eq("userId", identity.subject)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
  },
});

export const copy = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      content: args.content,
      coverImage: args.coverImage,
      icon: args.icon,
      userId: identity.subject,
      isArchived: false,
      isPublished: false,

      // 🔔 Reminder defaults (important!)
      reminderSent: false,
    });
  },
});
