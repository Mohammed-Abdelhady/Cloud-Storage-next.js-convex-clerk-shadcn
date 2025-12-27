"use client";

import React from "react";
import { motion } from "framer-motion";
import Heading from "../../components/base/typography/heading";
import Paragraph from "../../components/base/typography/paragraph";
import Image from "next/image";
import Flex from "@/components/base/center";
import LoginAction from "@/components/auth/login-action";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Hero = () => {
  return (
    <Flex className="relative min-h-[calc(100vh-64px)] gap-6 py-10 text-center md:gap-8 md:py-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={fadeInUp.transition}
      >
        <Heading align="center" size="large" className="max-w-4xl">
          Effortless file collaboration in the Cloud for remote teams.
        </Heading>
      </motion.div>
      
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ ...fadeInUp.transition, delay: 0.2 }}
      >
        <Paragraph align="center" size="medium" className="max-w-2xl">
          Elevate collaboration with effortless Cloud-based file sharing and storage. Enhance team
          productivity and securely manage your documents from any device, anywhere.
        </Paragraph>
      </motion.div>
      
      <motion.div
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ ...fadeInUp.transition, delay: 0.4 }}
      >
        <LoginAction>Get Started</LoginAction>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...fadeInUp.transition, delay: 0.6 }}
        className="relative mt-4 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border/50 md:mt-8"
      >
        <Image
          priority
          src="/images/hero-screen.png"
          alt="Effortless file collaboration in the Cloud for remote teams"
          width={1127}
          height={769}
          className="object-cover"
        />
      </motion.div>
    </Flex>
  );
};

export default Hero;
