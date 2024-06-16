import React from "react";
import Flex from "../base/center";
import Heading from "../base/heading/heading";
import Paragraph from "../base/heading/paragraph";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SharingCardProps {
  title: string;
  description: string;
  imageSrc: string;
  bg: string;
}

/**
 * Renders a sharing card component with the provided title, description, image URL, and background color.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the sharing card.
 * @param {string} props.description - The description of the sharing card.
 * @param {string} props.imageSrc - The URL of the image for the sharing card.
 * @param {string} props.bg - The background color of the sharing card.
 * @return {JSX.Element} The sharing card component.
 */
const SharingCard = ({ title, description, imageSrc, bg }: SharingCardProps) => {
  return (
    <Flex className={cn(`${bg} rounded-xl px-3`)}>
      <Heading tag="h3" size="small" className="mt-10 text-primary">
        {title}
      </Heading>
      <Paragraph className="mb-10 text-gray-500" size="small" maxWidth="lg" align="center">
        {description}
      </Paragraph>
      <Image width={479} height={479} src={imageSrc} alt={title} />
    </Flex>
  );
};

export default SharingCard;
