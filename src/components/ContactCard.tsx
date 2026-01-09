import { Mail, Instagram, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

const ContactCard = () => {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:callmers5.5@gmail.com",
      color: "hover:bg-primary/10 hover:text-primary hover:border-primary/40",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/rst.siu/",
      color: "hover:bg-secondary/10 hover:text-secondary hover:border-secondary/40",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://www.youtube.com/@rejoan-siyam",
      color: "hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40",
    },
  ];

  return (
    <div className="animate-fade-up">
      <div className="flex flex-col items-center text-center p-8 bg-card border border-border rounded-2xl">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 glow-primary">
          <span className="text-3xl font-bold text-primary-foreground">RS</span>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-foreground mb-8">
          Rejoan Siyam
        </h1>

        {/* Contact Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card/50 text-muted-foreground font-medium transition-all duration-300",
                contact.color,
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
              aria-label={`Contact via ${contact.label}`}
            >
              <contact.icon className="w-5 h-5" />
              <span>{contact.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
