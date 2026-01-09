import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectItemProps {
  title: string;
  onClick: () => void;
  className?: string;
}

const ProjectItem = ({ title, onClick, className }: ProjectItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full group flex items-center justify-between p-5 bg-card border border-border rounded-xl text-left transition-all duration-300",
        "hover:border-primary/40 hover:bg-card/80 hover:glow-primary",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
        className
      )}
      aria-label={`View ${title}`}
    >
      <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
        {title}
      </span>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
    </button>
  );
};

export default ProjectItem;
