"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { SearchBar } from "./search-bar";
import { useState } from "react";
import { DataTable } from "./file-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

/**
 * Renders a placeholder component for when there are no files uploaded yet.
 *
 * @return {JSX.Element} A div containing an image, a heading, and an UploadButton.
 */
const NoFilesPlaceholder = () => (
  <div className="mt-24 flex flex-col items-center gap-4">
    <Image alt="Empty folder illustration" width={300} height={300} src="/images/empty.svg" />
    <h3 className="text-2xl">No files uploaded yet</h3>
    <UploadButton />
  </div>
);

/**
 * FileBrowser component displays a list of files in either grid or table view,
 * with options to filter and search files.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the file browser.
 * @param {boolean} [props.showFavoritesOnly] - Whether to show only favorite files.
 * @param {boolean} [props.showDeletedOnly] - Whether to show only deleted files.
 * @return {JSX.Element} The rendered file browser component.
 */
export function FileBrowser({
  title,
  showFavoritesOnly,
  showDeletedOnly,
}: {
  title: string;
  showFavoritesOnly?: boolean;
  showDeletedOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [fileType, setFileType] = useState<Doc<"files">["type"] | "all">("all");

  const orgId =
    organization.isLoaded && user.isLoaded
      ? organization.organization?.id ?? user.user?.id
      : undefined;

  const favoriteFiles = useQuery(api.files.getAllFavorites, orgId ? { orgId: orgId } : "skip");

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: fileType === "all" ? undefined : fileType,
          query: searchQuery,
          favorites: showFavoritesOnly,
          deletedOnly: showDeletedOnly,
        }
      : "skip",
  );

  const isLoading = files === undefined;

  const fileList =
    files?.map((file: any) => ({
      ...file,
      isFavorited: favoriteFiles?.some((favorite: any) => favorite.fileId === file._id) ?? false,
    })) ?? [];

  return (
    <div>
      <div className="my-10 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex gap-3">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          <UploadButton />
        </div>
      </div>
      <Tabs defaultValue="grid">
        <div className="mb-2 flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <RowsIcon /> Table
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Label htmlFor="file-type-select">Filter by Type</Label>
            <Select value={fileType} onValueChange={(newType) => setFileType(newType as any)}>
              <SelectTrigger id="file-type-select" className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading && (
          <div className="mt-24 flex w-full flex-col items-center gap-8">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading your files...</div>
          </div>
        )}
        <TabsContent value="grid">
          <div className="grid grid-cols-3 gap-4">
            {fileList.map((file: any) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={fileList} />
        </TabsContent>
      </Tabs>
      {fileList.length === 0 && <NoFilesPlaceholder />}
    </div>
  );
}
