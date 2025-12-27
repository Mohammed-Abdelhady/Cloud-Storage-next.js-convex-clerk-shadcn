"use client";

import React from "react";
import { motion } from "framer-motion";
import Flex from "../base/center";
import Heading from "../base/typography/heading";
import Paragraph from "../base/typography/paragraph";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SharingCardProps {
  title: string;
  description: string;
  imageSrc: string;
  bg: string;
  index?: number;
}

/**
 * Renders a sharing card component with the provided title, description, image URL, and background color.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the sharing card.
 * @param {string} props.description - The description of the sharing card.
 * @param {string} props.imageSrc - The URL of the image for the sharing card.
 * @param {string} props.bg - The background color of the sharing card.
 * @param {number} props.index - The index of the card for stagger animation.
 * @return {JSX.Element} The sharing card component.
 */
const SharingCard = ({ title, description, imageSrc, bg, index = 0 }: SharingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="h-full"
    >
      <Flex
        className={cn(
          `${bg} h-full rounded-2xl px-4 shadow-lg ring-1 ring-border/20 transition-all duration-300 hover:shadow-xl hover:ring-border/40 md:px-6`,
        )}
      >
        <Heading tag="h3" size="small" className="mt-8 text-primary md:mt-10">
          {title}
        </Heading>
        <Paragraph className="mb-8 text-gray-600" size="small" maxWidth="lg" align="center">
          {description}
        </Paragraph>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-lg"
        >
          <Image width={479} height={479} src={imageSrc} alt={title} className="object-cover" />
        </motion.div>
      </Flex>
    </motion.div>
  );
};

export default SharingCard;
