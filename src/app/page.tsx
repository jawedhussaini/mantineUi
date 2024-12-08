
import { Footer } from "@/components/Footer/Footer";
import { FeaturesSection } from "@/components/Landing/FeaturesSection";
import { Header } from "@/components/Landing/Header";
import { LandingContainer } from "@/components/Landing/LandingContainer";


export default function Page() {
  return (
    <LandingContainer>
      <Header
        links={[
          {
            link: "/about",
            label: "Home",
          },
          {
            link: "/learn",
            label: "Features",
          },
          {
            link: "/pricing",
            label: "Pricing",
          },
           {
            link: "/dashboard",
            label: "dashboard",
          },
        ]}
      />
  
      <FeaturesSection
        title="ALL TASKS"
        description="Find Your favorite Tasks and take Reply to increase your productivity."
      />
      <Footer />
    </LandingContainer>
  );
}


