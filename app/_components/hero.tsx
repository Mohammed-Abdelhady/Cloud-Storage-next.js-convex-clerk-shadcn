import React from "react";
import Heading from "../../components/base/typography/heading";
import Paragraph from "../../components/base/typography/paragraph";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import Flex from "@/components/base/center";
import LoginAction from "@/components/auth/login-action";

const Hero = () => {
  return (
    <Flex className="min-h-[calc(100vh-64px)] gap-4 py-10 text-center md:py-20">
      <Heading align="center" size="large" className="max-w-4xl">
        Effortless file collaboration in the Cloud for remote teams.
      </Heading>
      <Paragraph align="center" size="medium">
        Elevate collaboration with effortless Cloud-based file sharing and storage. Enhance team
        productivity and securely manage your documents from any device, anywhere.
      </Paragraph>
      <LoginAction>Get Started</LoginAction>
      <>
        <Image
          priority
          src="/images/hero-screen.png"
          alt="Effortless file collaboration in the Cloud for remote teams"
          width={1127}
          height={769}
          className="object-cover"
        />
      </>
    </Flex>
  );
};

export default Hero;
