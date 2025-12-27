"use client";

import React from "react";
import { motion } from "framer-motion";
import Flex from "../base/center";
import Heading from "../base/typography/heading";
import Paragraph from "../base/typography/paragraph";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  index?: number;
}

/**
 * Renders a feature card component with the given title, description, and icon.
 *
 * @param {string} title - The title of the feature card.
 * @param {string} description - The description of the feature card.
 * @param {React.ElementType} icon - The icon component for the feature card.
 * @param {number} index - The index of the card for stagger animation.
 * @return {JSX.Element} The rendered feature card component.
 */
const FeatureCard = ({ title, description, icon: Icon, index = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="h-full"
    >
      <Flex className="group h-full cursor-pointer items-start gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-6 shadow-lg ring-1 ring-border/20 transition-all duration-300 hover:shadow-xl hover:ring-border/40 md:gap-6 md:p-10">
        <motion.div
          className="rounded-full bg-secondary/90 p-3 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary md:p-5"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="h-8 w-8 text-primary md:h-12 md:w-12" />
        </motion.div>
        <div className="flex-1 space-y-2">
          <Heading tag="h3" size="small" className="text-white">
            {title}
          </Heading>
          <Paragraph size="small" maxWidth="md" className="text-gray-200">
            {description}
          </Paragraph>
        </div>
      </Flex>
    </motion.div>
  );
};

export default FeatureCard;
