import Flex from "@/components/base/center";
import Heading from "@/components/base/typography/heading";
import ExplanationCard from "@/components/cards/explanation-card";
import SharingCard from "@/components/cards/sharing-card";
import React from "react";

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
      "You can collect and receive files in a secure environment, even if the other person doesn’t have a Deupload account.",
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
    "Securely share and work together with Deupload’s simple file storage and sharing, easy user management, unlimited file size, password protected links and more.",
  imageSrc: "/images/explanation.png",
};
/**
 * Renders the Productivity component with a lightweight design suitable for team productivity.
 *
 * @return {JSX.Element} The rendered Productivity component.
 */
const Productivity = () => {
  return (
    <Flex isCol className="items-start gap-4 py-10 md:py-20" id="productivity">
      <Heading tag="h2" size="medium" align="left">
        Lightweight design, ready to
        <br />
        use for <span className="text-primary">team productivity</span>.
      </Heading>
      <Flex className="gap-6 md:flex-row">
        {SHARING.map((data) => {
          return <SharingCard key={data.title} {...data} />;
        })}
      </Flex>
      <ExplanationCard {...EXPLANATION} />
    </Flex>
  );
};

export default Productivity;
