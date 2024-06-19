import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";

import { Doc } from "@/convex/_generated/dataModel";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { FileCardActions } from "./file-actions";

/**
 * Renders a file card component with the given file data.
 *
 * @param {Object} props - The properties for the FileCard component.
 * @param {Doc<"files"> & { isFavorited: boolean; url: string | null }} props.file - The file data to render.
 * @return {JSX.Element} The rendered file card component.
 */
export function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean; url: string | null };
}) {
  const userProfile = useQuery(api.users.getUserProfile, { userId: file.userId });

  const getIcon = (type: Doc<"files">["type"]): ReactNode => {
    const icons = {
      image: <ImageIcon />,
      pdf: <FileTextIcon />,
      csv: <GanttChartIcon />,
    };
    return icons[type];
  };

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <div className="flex justify-center">{getIcon(file.type)}</div> {file.name}
        </CardTitle>
        <div className="absolute right-2 top-2">
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex h-[200px] items-center justify-center">
        {file.type === "image" && file.url && (
          <Image alt={file.name} width="200" height="100" src={file.url} />
        )}
        {file.type !== "image" && <div className="h-20 w-20">{getIcon(file.type)}</div>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex w-40 items-center gap-2 text-xs text-gray-500">
          <Avatar className="h-6 w-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-500">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
