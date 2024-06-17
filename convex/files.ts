import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";

/**
 * Checks if the user identified by ctx has access to the organization with the provided orgId.
 *
 * @param {QueryCtx | MutationCtx} ctx - The query or mutation context containing user information.
 * @param {string} orgId - The organization ID to check access for.
 * @return {Object | null} Returns the user object if access is granted, otherwise null.
 */
export async function hasAccessToOrg(ctx: QueryCtx | MutationCtx, orgId: string) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    // @ts-ignore
    .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  if (!user) {
    return null;
  }

  const hasAccess =
    user.orgIds.some((item: any) => item.orgId === orgId) || user.tokenIdentifier.includes(orgId);

  if (!hasAccess) {
    return null;
  }

  return { user };
}
export const createFile = mutation({
  args: {
    name: v.string(),
    fileId: v.id("_storage"),
    orgId: v.string(),
    type: fileTypes,
  },

  /**
   * Handles the creation of a file in the database.
   *
   * @param {object} ctx - The context object containing information about the current request.
   * @param {object} args - The arguments object containing the file information.
   * @param {string} args.name - The name of the file.
   * @param {string} args.fileId - The ID of the file.
   * @param {string} args.orgId - The ID of the organization.
   * @param {string} args.type - The type of the file.
   * @return {Promise<void>} - A promise that resolves when the file is successfully created.
   * @throws {ConvexError} - If the user does not have access to the organization.
   */
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) {
      throw new ConvexError("you do not have access to this org");
    }

    await ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
      fileId: args.fileId,
      type: args.type,
      userId: hasAccess.user._id,
    });
  },
});
