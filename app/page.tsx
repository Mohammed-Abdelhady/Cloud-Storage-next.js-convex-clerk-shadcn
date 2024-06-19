import Flex from "@/components/base/center";
import GuestWrapper from "@/components/layout/wrappers/guest-wrapper";
import Productivity from "@/app/_components/productivity";
import Features from "@/app/_components/features";
import Hero from "@/app/_components/hero";
import Availability from "@/app/_components/availability";

export default function Home() {
  return (
    <GuestWrapper>
      <Flex className="px-3">
        {/* Hero Section */}
        <Hero />
        {/* Feature Section */}
        <Features />
        {/* Productivity Section */}
        <Productivity />
        {/* Availability Section */}
        <Availability />
      </Flex>
    </GuestWrapper>
  );
}
