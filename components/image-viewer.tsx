"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  src: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  placeholder?: "blur" | "empty";
  className?: string;
  objectFit?: "cover" | "contain";
}

export function ImageViewer({
  src,
  alt,
  width = 320,
  height,
  placeholder,
  className,
  objectFit,
}: ImageViewerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleClose]);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={cn(
          "relative group overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        aria-label={`View ${alt} in fullscreen`}
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          placeholder={placeholder}
          className={cn(
            "transition-transform duration-300 ease-out group-hover:scale-110",
            objectFit && "absolute inset-0 size-full object-center",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
          )}
          priority
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen view of ${alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleClose}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            aria-hidden="true"
          />

          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 top-4 z-50 rounded-full bg-background/10 text-foreground hover:bg-background/20"
            onClick={handleClose}
            aria-label="Close fullscreen image"
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Button>

          <div
            className="relative max-h-[90vh] max-w-[90vw] animate-in zoom-in-95 fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              placeholder={placeholder}
              className="h-auto w-auto max-h-[90vh] max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
