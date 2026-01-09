import { useState } from "react";
import { X, Copy, Check, Download, Code2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";

interface CodeViewerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CodeViewer = ({ project, isOpen, onClose }: CodeViewerProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!project) return;
    
    try {
      await navigator.clipboard.writeText(project.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownload = () => {
    if (!project) return;

    const extensions: Record<string, string> = {
      typescript: "ts",
      javascript: "js",
      python: "py",
      css: "css",
      bash: "sh",
      html: "html",
    };

    const ext = extensions[project.language] || "txt";
    const blob = new Blob([project.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, "-")}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-card border-l border-border shadow-2xl animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground truncate">
                {project.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200"
                aria-label="Download code"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  copied
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                aria-label={copied ? "Copied!" : "Copy code"}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 ml-2"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Code */}
          <div className="flex-1 overflow-auto p-6">
            <div className="rounded-xl overflow-hidden border border-border">
              <SyntaxHighlighter
                language={project.language}
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  padding: "1.5rem",
                  background: "hsl(220 35% 7%)",
                  fontSize: "0.875rem",
                  borderRadius: "0.75rem",
                }}
                lineNumberStyle={{
                  color: "hsl(210 25% 35%)",
                  paddingRight: "1.5rem",
                }}
              >
                {project.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeViewer;
