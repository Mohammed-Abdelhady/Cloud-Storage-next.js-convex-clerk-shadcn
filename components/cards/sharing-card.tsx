import React from "react";
import Center from "../base/center";
import Heading from "../base/heading/heading";
import Paragraph from "../base/heading/paragraph";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SharingCardProps {
  title: string;
  description: string;
  imageURL: string;
  bg: string;
}

const SharingCard = ({ title, description, imageURL, bg }: SharingCardProps) => {
  return (
    <Center className={cn(`${bg} rounded-xl px-3`)}>
      <Heading tag="h3" size="small" className="mt-10 text-primary">
        {title}
      </Heading>
      <Paragraph className="mb-10 text-gray-500" size="small" maxWidth="lg" align="center">
        {description}
      </Paragraph>
      <Image width={479} height={479} src={imageURL} alt={title} />
    </Center>
  );
};

export default SharingCard;
