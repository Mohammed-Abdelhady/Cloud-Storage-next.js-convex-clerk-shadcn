import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIcon, MoreVertical, StarHalf, StarIcon, TrashIcon, UndoIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Protect } from "@clerk/nextjs";

/**
 * Renders the actions for a file card.
 *
 * @param {Object} props - The component props.
 * @param {Doc<"files"> & { url: string | null }} props.file - The file object.
 * @param {boolean} props.isFavorited - Indicates if the file is favorited.
 * @return {JSX.Element} The rendered file card actions.
 */

export function FileCardActions({
  file,
  isFavorited,
}: {
  file: Doc<"files"> & { url: string | null };
  isFavorited: boolean;
}) {
  const deleteFile = useMutation(api.files.deleteFile);
  const restoreFile = useMutation(api.files.restoreFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const { toast } = useToast();
  const currentUser = useQuery(api.users.getMe);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDeleteFile = async () => {
    await deleteFile({ fileId: file._id });
    toast({
      variant: "default",
      title: "File Deletion Scheduled",
      description: "Your file will be deleted shortly.",
    });
  };

  const handleRestoreOrDeleteFile = () => {
    if (file.shouldDelete) {
      restoreFile({ fileId: file._id });
    } else {
      setIsDeleteConfirmOpen(true);
    }
  };

  return (
    <>
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for deletion. Files are deleted periodically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFile}>Proceed</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => file.url && window.open(file.url, "_blank")}
            className="flex cursor-pointer items-center gap-1"
          >
            <FileIcon className="h-4 w-4" /> Download
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => toggleFavorite({ fileId: file._id })}
            className="flex cursor-pointer items-center gap-1"
          >
            {isFavorited ? (
              <div className="flex items-center gap-1">
                <StarIcon className="h-4 w-4" /> Remove from Favorites
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <StarHalf className="h-4 w-4" /> Add to Favorites
              </div>
            )}
          </DropdownMenuItem>

          <Protect
            condition={(check) => check({ role: "org:admin" }) || file.userId === currentUser?._id}
            fallback={<></>}
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleRestoreOrDeleteFile}
              className="flex cursor-pointer items-center gap-1"
            >
              {file.shouldDelete ? (
                <div className="flex cursor-pointer items-center gap-1 text-green-600">
                  <UndoIcon className="h-4 w-4" /> Restore File
                </div>
              ) : (
                <div className="flex cursor-pointer items-center gap-1 text-red-600">
                  <TrashIcon className="h-4 w-4" /> Delete File
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
