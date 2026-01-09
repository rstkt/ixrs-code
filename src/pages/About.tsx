import Navigation from "@/components/Navigation";
import ContactCard from "@/components/ContactCard";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-md mx-auto">
          <ContactCard />
        </div>
      </main>
    </div>
  );
};

export default About;
