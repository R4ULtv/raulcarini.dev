"use client";

import * as React from "react";
import { CheckIcon, Link2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ShareButton = ({ slug }: { slug: string }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://shrly.cc/${slug}`);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "c"
      ) {
        event.preventDefault();
        copyToClipboard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slug]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={copyToClipboard}
      className="!pl-8 place-items-center relative text-muted-foreground"
    >
      <CheckIcon
        className={cn(
          "absolute left-2 will-change-auto transition-[scale,opacity,filter] ease-out",
          copied
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-95 blur-[2px]",
        )}
      />
      <Link2Icon
        className={cn(
          "absolute left-2 will-change-auto transition-[scale,opacity,filter] ease-out",
          copied
            ? "opacity-0 scale-95 blur-[2px]"
            : "opacity-100 scale-100 blur-0",
        )}
      />
      Copy Link
    </Button>
  );
};

export default ShareButton;
