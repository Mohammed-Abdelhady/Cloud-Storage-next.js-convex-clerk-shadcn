"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { useQuery } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardActions } from "./file-actions";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

/**
 * Renders a user cell with the user's profile information.
 *
 * @param {Object} props - The props object.
 * @param {Id<"users">} props.userId - The ID of the user.
 * @return {JSX.Element} The user cell component.
 */
function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, { userId });

  return (
    <div className="flex items-center gap-2 text-xs text-gray-700">
      <Avatar>
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
}

export const columns: ColumnDef<Doc<"files"> & { url: string; isFavorited: boolean }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    /**
     * Renders a user cell with the user's profile information.
     *
     * @param {Object} props - The props object.
     * @param {Object} props.row - The row object containing the data for the current row.
     * @return {JSX.Element} The user cell component.
     */
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />;
    },
  },
  {
    header: "Uploaded On",
    /**
     * Renders the cell for the "Uploaded On" column in a table.
     *
     * @param {Object} props - The props object.
     * @param {Object} props.row - The row object containing the data for the current row.
     * @return {JSX.Element} The rendered cell component.
     */
    cell: ({ row }) => {
      return <div>{formatRelative(new Date(row.original._creationTime), new Date())}</div>;
    },
  },
  {
    header: "Actions",
    /**
     * Renders a cell with the FileCardActions component for the given row.
     *
     * @param {Object} props - The props object.
     * @param {Object} props.row - The row object containing the data for the current row.
     * @return {JSX.Element} The rendered cell component.
     */
    cell: ({ row }) => {
      return (
        <div>
          <FileCardActions file={row.original} isFavorited={row.original.isFavorited} />
        </div>
      );
    },
  },
];
