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

/**
 * Renders a feature card component with the given title, description, and icon.
 *
 * @param {string} title - The title of the feature card.
 * @param {string} description - The description of the feature card.
 * @param {React.ElementType} icon - The icon component for the feature card.
 * @return {JSX.Element} The rendered feature card component.
 */
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
