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
    .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", tokenIdentifier))
    .first();

  if (!user) {
    throw new ConvexError("expected user to be defined");
  }

  return user;
}

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
  /**
   * Inserts a new user into the "users" table in the database.
   *
   * @param {Object} ctx - The context object containing the database connection.
   * @param {Object} args - The arguments object containing the user's token identifier, name, and image.
   * @param {string} args.tokenIdentifier - The unique identifier for the user.
   * @param {string} args.name - The name of the user.
   * @param {string} args.image - The image URL for the user.
   * @return {Promise<void>} A promise that resolves when the user is successfully inserted.
   */
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgIds: [],
      name: args.name,
      image: args.image,
    });
  },
});

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
  /**
   * Updates the user information in the database based on the provided token identifier.
   *
   * @param {QueryCtx | MutationCtx} ctx - The context object containing the database query function.
   * @param {object} args - The arguments object containing the token identifier, name, and image.
   * @param {string} args.tokenIdentifier - The unique identifier for the user.
   * @param {string} args.name - The new name for the user.
   * @param {string} args.image - The new image URL for the user.
   * @return {Promise<void>} A promise that resolves when the user information is successfully updated.
   * @throws {ConvexError} If no user with the provided token identifier is found.
   */
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .first();

    if (!user) {
      throw new ConvexError("no user with this token found");
    }

    await ctx.db.patch(user._id, {
      name: args.name,
      image: args.image,
    });
  },
});

export const addOrgIdToUser = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
  /**
   * Updates the user's organization IDs and role in the database.
   *
   * @param {QueryCtx | MutationCtx} ctx - The context object for the query or mutation.
   * @param {object} args - The arguments object containing the token identifier, organization ID, and role.
   * @param {string} args.tokenIdentifier - The token identifier of the user.
   * @param {string} args.orgId - The ID of the organization to add.
   * @param {string} args.role - The role of the user in the organization.
   * @return {Promise<void>} A promise that resolves when the user's organization IDs and role have been updated.
   * @throws {ConvexError} If the user with the provided token identifier is not found.
   */
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, { orgId: args.orgId, role: args.role }],
    });
  },
});

export const updateRoleInOrgForUser = internalMutation({
  args: { tokenIdentifier: v.string(), orgId: v.string(), role: roles },
  /**
   * Updates the role of a user in an organization in the database.
   *
   * @param {QueryCtx | MutationCtx} ctx - The context object for the query or mutation.
   * @param {object} args - The arguments object containing the token identifier, organization ID, and new role.
   * @param {string} args.tokenIdentifier - The token identifier of the user.
   * @param {string} args.orgId - The ID of the organization.
   * @param {string} args.role - The new role of the user in the organization.
   * @return {Promise<void>} A promise that resolves when the user's role has been updated.
   * @throws {ConvexError} If the user with the provided token identifier is not found, or if the organization is not found on the user.
   */
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);

    const org = user.orgIds.find((org: any) => org.orgId === args.orgId);

    if (!org) {
      throw new ConvexError("expected an org on the user but was not found when updating");
    }

    org.role = args.role;

    await ctx.db.patch(user._id, {
      orgIds: user.orgIds,
    });
  },
});

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
