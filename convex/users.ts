import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, query } from "./_generated/server";
import { roles } from "./schema";
import { hasAccessToOrg } from "./files";

/**
 * Retrieves a user from the database based on the provided token identifier.
 *
 * @param {QueryCtx | MutationCtx} ctx - The context object containing the database query function.
 * @param {string} tokenIdentifier - The token identifier used to identify the user.
 * @return {Promise<object>} The user object if found, otherwise throws a ConvexError.
 * @throws {ConvexError} If the user is not found.
 */
export async function getUser(ctx: QueryCtx | MutationCtx, tokenIdentifier: string) {
  const user = await ctx.db
    .query("users")
    // @ts-ignore
    .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", tokenIdentifier))
    .first();

  if (!user) {
    throw new ConvexError("expected user to be defined");
  }

  return user;
}

export const getUserProfile = query({
  args: { userId: v.id("users") },
  /**
   * Retrieves the user profile information based on the provided user ID.
   *
   * @param {QueryCtx | MutationCtx} ctx - The context object for the query or mutation.
   * @param {object} args - The arguments object containing the user ID.
   * @param {string} args.userId - The ID of the user.
   * @return {Promise<object>} A promise that resolves to an object containing the user's name and image.
   * @throws {ConvexError} If the user with the provided ID is not found.
   */
  async handler(ctx, args) {
    const user = await ctx.db.get(args.userId);

    return {
      name: user?.name,
      image: user?.image,
    };
  },
});

export const getMe = query({
  args: {},
  /**
   * Retrieves the user associated with the provided context's authenticated user identity.
   *
   * @param {QueryCtx | MutationCtx} ctx - The context object containing the authentication information.
   * @return {Promise<object|null>} The user object if found, otherwise null.
   */
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const user = await getUser(ctx, identity.tokenIdentifier);

    if (!user) {
      return null;
    }

    return user;
  },
});
