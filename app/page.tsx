import Center from "@/components/base/center";
import GuestWrapper from "@/components/layout/wrappers/guest-wrapper";
import Productivity from "@/components/screens/home/productivity";
import Features from "@/components/screens/home/features";
import Hero from "@/components/screens/home/hero";
import Availability from "@/components/screens/home/availability";

export default function Home() {
  return (
    <GuestWrapper>
      <Center className="px-3">
        {/* Hero Section */}
        <Hero />
        {/* Feature Section */}
        <Features />
        {/* Productivity Section */}
        <Productivity />
        {/* Availability Section */}
        <Availability />
      </Center>
    </GuestWrapper>
  );
}
