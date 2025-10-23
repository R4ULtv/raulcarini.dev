"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";

const CopyButton = ({
  text,
  className,
  ...props
}: React.ComponentProps<"button"> & { text: string }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("size-8 group", className)}
      onClick={copyToClipboard}
      {...props}
    >
      {copied ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <CopyIcon
          aria-hidden="true"
          className="opacity-50 group-hover:opacity-90 transition-opacity duration-150 ease-out"
        />
      )}
    </Button>
  );
};

export default CopyButton;
