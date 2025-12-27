"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Flex from "@/components/base/center";
import Heading from "@/components/base/typography/heading";
import Paragraph from "@/components/base/typography/paragraph";
import { cn } from "@/lib/utils";
import { CodeXml, DoorOpen, Router, ShieldCheck, TreePalm } from "lucide-react";

const LEFT_SIDE_FEATURE = [
  {
    title: "Upgrade your storage.",
    description: "Better security, performance and cost, Deupload is the better way to store data.",
    icon: Router,
    theme: "bg-green-400",
  },
  {
    title: "Carbon neutral storage.",
    description:
      "Utilizing existing unused storage capacity on recycled hardware around the world.",
    icon: TreePalm,
    theme: "bg-blue-400",
  },
];
const RIGHT_SIDE_FEATURE = [
  {
    title: "Private by design",
    description:
      "We believe data privacy is a human right, which is why Deupload is built on a decentralized architecture that makes data breaches a thing of the past.",
    icon: DoorOpen,
    theme: "bg-secondary text-primary",
  },
  {
    title: "Distributed network",
    description:
      "An object is never in one place. Data is split into 80 pieces, and distributed to uncorrelated Nodes. When you call for the data, it's automatically reconstituted in an instant.",
    icon: ShieldCheck,
    theme: "bg-secondary text-primary",
  },
  {
    title: "Worldwide availability",
    description:
      "Data is stored on Nodes that are selected by reputation and local latency. The fastest Nodes from this set are chosen to store pieces, ensuring quick access to your data.",
    icon: CodeXml,
    theme: "bg-secondary text-primary",
  },
];

const Availability = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Flex
      isCol={false}
      className="flex-col justify-between gap-8 py-10 md:flex-row md:gap-12 md:py-20"
      id="availability"
      ref={ref}
    >
      {/* Left Section */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Heading tag="h2" size="medium">
          Decentralized storage built for <span className="text-primary">better privacy</span>.
        </Heading>
        <Paragraph size="medium" className="my-6">
          Store data securely on over 13k nodes worldwide instead of just a few vulnerable data
          centers with privacy. Every file is encrypted, split into pieces, and stored on a global
          network of nodes, making data breaches and downtime a thing of the past.
        </Paragraph>
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          {LEFT_SIDE_FEATURE?.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <div className="flex flex-col justify-between gap-8 md:gap-10">
          {RIGHT_SIDE_FEATURE?.map((feature, index) => (
            <Feature key={feature.title} {...feature} isRow index={index} />
          ))}
        </div>
      </motion.div>
    </Flex>
  );
};

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  theme: string;
  isRow?: boolean;
  index?: number;
}

/**
 * Renders a feature component with the given title, description, icon, icon style, and row layout option.
 *
 * @param {FeatureProps} props - The props for the feature component.
 * @return {JSX.Element} The rendered feature component.
 */
const Feature = ({ title, description, icon: Icon, theme, isRow = false, index = 0 }: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.02, x: isRow ? 4 : 0 }}
      className={cn(
        "group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-secondary/30",
        isRow ? "flex-row" : "flex-col",
      )}
    >
      <motion.div
        className={cn(
          "h-fit w-fit rounded-full bg-primary shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
          isRow ? "mr-2 p-4 md:p-5" : "mb-2 p-3 md:p-4",
          theme,
        )}
        whileHover={{ rotate: 5 }}
      >
        <Icon className={cn(isRow ? "h-8 w-8 md:h-10 md:w-10" : "h-6 w-6 md:h-8 md:w-8")} />
      </motion.div>
      {/* Content */}
      <div className="flex-1">
        <Heading tag="h3" size="small">
          {title}
        </Heading>
        <Paragraph maxWidth="md" size="small" className="mt-2">
          {description}
        </Paragraph>
      </div>
    </motion.div>
  );
};

export default Availability;
