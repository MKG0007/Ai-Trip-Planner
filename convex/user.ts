import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUsers = await ctx.db
      .query("UserTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (existingUsers.length > 0) {
      return existingUsers[0];
    }

    // Insert new user
    const insertedId = await ctx.db.insert("UserTable", {
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
    });

    // Fetch the newly inserted document to return consistent format
    const newUser = await ctx.db.get(insertedId);
    return newUser;
  },
});
