import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, mutation, query } from "./_generated/server";
import { fileTypes } from "./schema";
import { Doc, Id } from "./_generated/dataModel";

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

// Upload File URL
export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("you must be logged in to upload a file");
  }

  return await ctx.storage.generateUploadUrl();
});

/**
 * Checks if the user identified by ctx has access to the specified file.
 *
 * @param {QueryCtx | MutationCtx} ctx - The query or mutation context containing user information.
 * @param {Id<"files">} fileId - The ID of the file to check access for.
 * @return {Promise<{ user: any, file: Doc<"files"> } | null>} Returns an object containing the user and file if access is granted, otherwise null.
 */
async function hasAccessToFile(ctx: QueryCtx | MutationCtx, fileId: Id<"files">) {
  const file = await ctx.db.get(fileId);

  if (!file) {
    return null;
  }

  const hasAccess = await hasAccessToOrg(ctx, file.orgId);

  if (!hasAccess) {
    return null;
  }

  return { user: hasAccess.user, file };
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
export const getFiles = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
    favorites: v.optional(v.boolean()),
    deletedOnly: v.optional(v.boolean()),
    type: v.optional(fileTypes),
  },
  /**
   * Handles the retrieval of files from the database based on the provided arguments.
   *
   * @param {object} ctx - The context object containing information about the current request.
   * @param {object} args - The arguments object containing the file information.
   * @param {string} args.orgId - The ID of the organization.
   * @param {string} [args.query] - The query string to filter files by name.
   * @param {boolean} [args.favorites] - Whether to filter files by favorites.
   * @param {boolean} [args.deletedOnly] - Whether to filter files by deletion status.
   * @param {string} [args.type] - The type of files to filter by.
   * @return {Promise<Array<object>>} - A promise that resolves to an array of files with URLs.
   */
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) {
      return [];
    }

    let files = await ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    const query = args.query;

    if (query) {
      files = files.filter((file) => file.name.toLowerCase().includes(query.toLowerCase()));
    }

    if (args.favorites) {
      const favorites = await ctx.db
        .query("favorites")
        .withIndex("by_userId_orgId_fileId", (q: any) =>
          q.eq("userId", hasAccess.user._id).eq("orgId", args.orgId),
        )
        .collect();

      files = files.filter((file) => favorites.some((favorite) => favorite.fileId === file._id));
    }

    if (args.deletedOnly) {
      files = files.filter((file) => file.shouldDelete);
    } else {
      files = files.filter((file) => !file.shouldDelete);
    }

    if (args.type) {
      files = files.filter((file) => file.type === args.type);
    }

    const filesWithUrl = await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file.fileId),
      })),
    );

    return filesWithUrl;
  },
});
/**
 * Asserts whether the user can delete a file based on certain criteria.
 *
 * @param {Doc<"users">} user - The user trying to delete the file.
 * @param {Doc<"files">} file - The file to be deleted.
 * @return {void} Throws an error if the user does not have permission to delete the file.
 */
function assertCanDeleteFile(user: Doc<"users">, file: Doc<"files">) {
  const canDelete =
    file.userId === user._id ||
    user.orgIds.find((org: any) => org.orgId === file.orgId)?.role === "admin";

  if (!canDelete) {
    throw new ConvexError("you have no acces to delete this file");
  }
}
export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  async handler(ctx, args) {
    const access = await hasAccessToFile(ctx, args.fileId);

    if (!access) {
      throw new ConvexError("no access to file");
    }

    assertCanDeleteFile(access.user, access.file);

    await ctx.db.patch(args.fileId, {
      shouldDelete: true,
    });
  },
});
export const deleteAllFiles = internalMutation({
  args: {},
  /**
   * Asynchronously handles the deletion of all files marked for deletion.
   *
   * @param {MutationCtx<DataModel>} ctx - The mutation context containing the database connection.
   * @return {Promise<void>} A promise that resolves when all files have been deleted.
   */
  async handler(ctx) {
    const files = await ctx.db
      .query("files")
      .withIndex("by_shouldDelete", (q) => q.eq("shouldDelete", true))
      .collect();

    await Promise.all(
      files.map(async (file) => {
        await ctx.storage.delete(file.fileId);
        return await ctx.db.delete(file._id);
      }),
    );
  },
});

export const restoreFile = mutation({
  args: { fileId: v.id("files") },
  /**
   * Handles the deletion of a file.
   *
   * @param {MutationCtx} ctx - The mutation context containing the database connection.
   * @param {object} args - The arguments object containing the file ID.
   * @param {string} args.fileId - The ID of the file to be deleted.
   * @return {Promise<void>} A promise that resolves when the file is successfully deleted.
   * @throws {ConvexError} If the user does not have access to the file or if the file cannot be deleted.
   */
  async handler(ctx, args) {
    const access = await hasAccessToFile(ctx, args.fileId);

    if (!access) {
      throw new ConvexError("no access to file");
    }

    assertCanDeleteFile(access.user, access.file);

    await ctx.db.patch(args.fileId, {
      shouldDelete: false,
    });
  },
});

export const toggleFavorite = mutation({
  args: { fileId: v.id("files") },
  /**
   * Handles the logic for checking access to a file, adding it to favorites if not already favorited, and removing it from favorites if already favorited.
   *
   * @param {any} ctx - The query or mutation context.
   * @param {any} args - The arguments passed to the function.
   */
  async handler(ctx, args) {
    const access = await hasAccessToFile(ctx, args.fileId);

    if (!access) {
      throw new ConvexError("no access to file");
    }

    const favorite = await ctx.db
      .query("favorites")
      .withIndex("by_userId_orgId_fileId", (q: any) =>
        q
          .eq("userId", access.user._id)
          .eq("orgId", access.file.orgId)
          .eq("fileId", access.file._id),
      )
      .first();

    if (!favorite) {
      await ctx.db.insert("favorites", {
        fileId: access.file._id,
        userId: access.user._id,
        orgId: access.file.orgId,
      });
    } else {
      await ctx.db.delete(favorite._id);
    }
  },
});

export const getAllFavorites = query({
  args: { orgId: v.string() },
  /**
   * Handles fetching favorites for a specific organization after checking user access.
   *
   * @param {QueryCtx | MutationCtx} ctx - The query or mutation context.
   * @param {object} args - The arguments object containing the organization ID.
   * @return {Promise<any[]>} An array of favorites if access is granted, otherwise an empty array.
   */
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) {
      return [];
    }

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_userId_orgId_fileId", (q: any) =>
        q.eq("userId", hasAccess.user._id).eq("orgId", args.orgId),
      )
      .collect();

    return favorites;
  },
});
