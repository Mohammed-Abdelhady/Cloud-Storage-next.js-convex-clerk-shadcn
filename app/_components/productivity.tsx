"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Flex from "@/components/base/center";
import Heading from "@/components/base/typography/heading";
import ExplanationCard from "@/components/cards/explanation-card";
import SharingCard from "@/components/cards/sharing-card";

const SHARING = [
  {
    title: "File Sharing",
    description:
      "Securely share files within or outside your organization, and control access, track edits, and analyze the shared content stats.",
    imageSrc: "/images/file-sharing.png",
    bg: "bg-cream",
  },
  {
    title: "Collect Files",
    description:
      "You can collect and receive files in a secure environment, even if the other person doesn't have a Deupload account.",
    imageSrc: "/images/collect-files.png",
    bg: "bg-light-blue",
  },
];
const EXPLANATION = {
  title: (
    <>
      <span className="text-primary">Team collaboration</span> in one simple place with privacy come
      first.
    </>
  ),
  description:
    "Securely share and work together with Deupload's simple file storage and sharing, easy user management, unlimited file size, password protected links and more.",
  imageSrc: "/images/explanation.png",
};
/**
 * Renders the Productivity component with a lightweight design suitable for team productivity.
 *
 * @return {JSX.Element} The rendered Productivity component.
 */
const Productivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Flex isCol className="items-start gap-8 py-10 md:gap-10 md:py-20" id="productivity" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Heading tag="h2" size="medium" align="left">
          Lightweight design, ready to
          <br />
          use for <span className="text-primary">team productivity</span>.
        </Heading>
      </motion.div>
      <Flex className="w-full gap-6 md:flex-row">
        {SHARING.map((data, index) => {
          return <SharingCard key={data.title} {...data} index={index} />;
        })}
      </Flex>
      <ExplanationCard {...EXPLANATION} />
    </Flex>
  );
};

export default Productivity;
