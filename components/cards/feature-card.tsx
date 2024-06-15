import React from "react";
import Center from "../base/center";
import Heading from "../base/heading/heading";
import Paragraph from "../base/heading/paragraph";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Center className="cursor-pointer items-start gap-3 overflow-hidden rounded-xl bg-primary p-6 md:p-14">
      <div className="rounded-full bg-secondary p-3 md:p-5">
        <Icon className="h-8 w-8 text-primary md:h-12 md:w-12" />
      </div>
      <Heading tag="h3" size="small">
        {title}
      </Heading>
      <Paragraph size="small" maxWidth="md">
        {description}
      </Paragraph>
    </Center>
  );
};

export default FeatureCard;
