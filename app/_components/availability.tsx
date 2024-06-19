import Flex from "@/components/base/center";
import Heading from "@/components/base/typography/heading";
import Paragraph from "@/components/base/typography/paragraph";
import { cn } from "@/lib/utils";
import { CodeXml, DoorOpen, Router, ShieldCheck, TreePalm } from "lucide-react";
import React from "react";

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
      "An object is never in one place. Data is split into 80 pieces, and distributed to uncorrelated Nodes. When you call for the data, it’s automatically reconstituted in an instant.",
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
  return (
    <Flex
      isCol={false}
      className="flex-col justify-between gap-6 py-10 md:flex-row md:py-20"
      id="availability"
    >
      {/* Left Section */}
      <div className="flex-1">
        <Heading tag="h2" size="medium">
          Decentralized storage built for <span className="text-primary">better privacy</span>.
        </Heading>
        <Paragraph size="medium" className="my-5">
          Store data securely on over 13k nodes worldwide instead of just a few vulnerable data
          centers with privacy. Every file is encrypted, split into pieces, and stored on a global
          network of nodes, making data breaches and downtime a thing of the past.
        </Paragraph>
        <div className="flex justify-between">
          {LEFT_SIDE_FEATURE?.map((feature) => <Feature key={feature.title} {...feature} />)}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <div className="flex flex-col justify-between gap-10">
          {RIGHT_SIDE_FEATURE?.map((feature) => <Feature key={feature.title} {...feature} isRow />)}
        </div>
      </div>
    </Flex>
  );
};

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  theme: string;
  isRow?: boolean;
}

/**
 * Renders a feature component with the given title, description, icon, icon style, and row layout option.
 *
 * @param {FeatureProps} props - The props for the feature component.
 * @return {JSX.Element} The rendered feature component.
 */
const Feature = ({ title, description, icon: Icon, theme, isRow = false }: FeatureProps) => {
  return (
    <div className={`flex ${isRow ? "flex-row" : "flex-col"} items-start gap-3`}>
      <div
        className={cn(
          `h-fit w-fit rounded-full bg-primary ${isRow ? "mr-3 p-5" : "mb-3 p-3"}`,
          theme,
        )}
      >
        <Icon className={`${isRow ? "h-8 w-8 md:h-10 md:w-10" : "h-6 w-6 md:h-8 md:w-8"} `} />
      </div>
      {/* Content */}
      <div>
        <Heading tag="h3" size="small">
          {title}
        </Heading>
        <Paragraph maxWidth="md" size="small" className="">
          {description}
        </Paragraph>
      </div>
    </div>
  );
};

export default Availability;
