import Center from "@/components/base/center";
import GuestWrapper from "@/components/layout/wrappers/guest-wrapper";
import Features from "@/components/screens/home/features";
import Hero from "@/components/screens/home/hero";

export default function Home() {
  return (
    <GuestWrapper>
      <Center className="gap-20 px-3 py-10 md:py-20">
        {/* Hero Section */}
        <Hero />
        {/* Feature Section */}
        <Features />
      </Center>
    </GuestWrapper>
  );
}
