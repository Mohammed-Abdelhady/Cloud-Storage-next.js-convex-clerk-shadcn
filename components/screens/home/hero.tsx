import React from "react";
import Heading from "../../base/heading/heading";
import Paragraph from "../../base/heading/paragraph";
import { Button } from "../../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 px-3 pt-20 text-center">
      <Heading align="center" size="large" className="max-w-4xl">
        Effortless file collaboration in the Cloud for remote teams.
      </Heading>
      <Paragraph align="center" size="medium">
        Elevate collaboration with effortless Cloud-based file sharing and storage. Enhance team
        productivity and securely manage your documents from any device, anywhere.
      </Paragraph>
      <Button size="lg">Get Started</Button>
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
    </div>
  );
};

export default Hero;
