import React from "react";
import Flex from "../base/center";
import Heading from "../base/typography/heading";
import Paragraph from "../base/typography/paragraph";
import { Button } from "../ui/button";
import Image from "next/image";

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
    <Flex
      className="flex-col-reverse justify-between rounded-xl bg-secondary px-10 py-3 md:flex-row"
      isCol={false}
    >
      <div className="flex flex-col items-start">
        <Heading tag="h3" size="small" align="left" className="max-w-lg pr-3 text-black">
          {title}
        </Heading>
        <Paragraph className="my-5 text-gray-500" size="small" maxWidth="lg" align="left">
          {description}
        </Paragraph>
        <Button color="primary" size="lg">
          Start now
        </Button>
      </div>
      <div>
        <Image src={imageSrc} alt={description} width={515.5} height={494.88} />
      </div>
    </Flex>
  );
};

export default ExplanationCard;
