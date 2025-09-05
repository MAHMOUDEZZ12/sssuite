
"use client";

import { cn } from "@/lib/utils"
import React from "react";
import { Button, ButtonProps } from "./button";

export const ShinyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          "relative overflow-hidden group",
          "text-lg py-7 px-8",
          "bg-accent text-accent-foreground hover:bg-accent/90",
          className
        )}
      >
        <span className="relative z-10">{props.children}</span>
        <span
          className={cn(
            "absolute inset-x-0 -bottom-1/2 h-full w-full",
            "bg-[radial-gradient(150%_150%_at_50%_100%,#fff_20%,rgba(255,255,255,0)_80%)]",
            "opacity-0 transition-opacity duration-500 group-hover:opacity-30"
          )}
        />
      </Button>
    )
});
ShinyButton.displayName = "ShinyButton";
