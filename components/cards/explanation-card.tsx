"use client";

import React from "react";
import { motion } from "framer-motion";
import Flex from "../base/center";
import Heading from "../base/typography/heading";
import Paragraph from "../base/typography/paragraph";
import { Button } from "../ui/button";
import Image from "next/image";
import LoginAction from "../auth/login-action";

interface ExplanationCardProps {
  title: React.ReactNode;
  description: string;
  imageSrc: string;
}

/**
 * Renders an Explanation Card component with the given title, description, and image source.
 *
 * @param {React.ReactNode} title - The title of the card.
 * @param {string} description - The description text of the card.
 * @param {string} imageSrc - The image source for the card.
 * @return {JSX.Element} The rendered Explanation Card component.
 */
const ExplanationCard = ({ title, description, imageSrc }: ExplanationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
    >
      <Flex
        className="flex-col-reverse justify-between rounded-2xl bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 px-6 py-6 shadow-lg ring-1 ring-border/20 transition-all duration-300 hover:shadow-xl hover:ring-border/40 md:flex-row md:px-10 md:py-8"
        isCol={false}
      >
        <motion.div
          className="flex flex-col items-start"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Heading tag="h3" size="small" align="left" className="max-w-lg pr-3 text-black">
            {title}
          </Heading>
          <Paragraph className="my-5 text-gray-600" size="small" maxWidth="lg" align="left">
            {description}
          </Paragraph>
          <LoginAction>Start now</LoginAction>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image src={imageSrc} alt={description} width={515.5} height={494.88} />
        </motion.div>
      </Flex>
    </motion.div>
  );
};

export default ExplanationCard;
