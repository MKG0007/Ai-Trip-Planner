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

      
      // Insert new user
      if(existingUsers?.length == 0){
        
        const insertedId = await ctx.db.insert("UserTable", {
          name: args.name,
          email: args.email,
          imageUrl: args.imageUrl,
        });
        const newUser = await ctx.db.get(insertedId);
        return newUser;
      }
      
      // Fetch the newly inserted document to return consistent format
      return existingUsers[0];
  },
});
