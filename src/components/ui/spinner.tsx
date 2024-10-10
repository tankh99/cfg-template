import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("flex-col items-center justify-center", {
  defaultVariants: {
    show: true,
  },
  variants: {
    show: {
      false: "hidden",
      true: "flex",
    },
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  defaultVariants: {
    size: "medium",
  },
  variants: {
    size: {
      large: "size-12",
      medium: "size-8",
      small: "size-6",
    },
  },
});

type SpinnerContentProps = VariantProps<typeof loaderVariants> &
  VariantProps<typeof spinnerVariants> & {
    children?: React.ReactNode;
    className?: string;
  };

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
