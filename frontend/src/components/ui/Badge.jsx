// Adapted from a component sourced from 21st.dev for BUS4012 Assignment 2.
// Original integration used the 21st.dev Copy Prompt workflow.
// Adapted: TypeScript converted to JSX, Tailwind utilities converted to plain CSS.

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import "./Badge.css";

function cn(...inputs) {
  return clsx(inputs);
}

const shapeMap = {
  pill: {
    item: "badge-pill",
  },
};

function useShape() {
  return shapeMap.pill;
}

const badgeColors = {
  gray: "#a3a3a3",
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  blue: "#3b82f6",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  pink: "#ec4899",
  rose: "#f43f5e",
};

const badgeVariants = cva("badge-base", {
  variants: {
    variant: {
      solid: "",
      dot: "badge-dot-variant",
    },
    size: {
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

const Badge = forwardRef(function Badge(
  {
    className,
    variant = "solid",
    size = "md",
    color = "gray",
    children,
    style,
    ...props
  },
  ref
) {
  const shape = useShape();
  const colorValue = badgeColors[color];
  const isSolid = variant === "solid";
  const dotSize = size === "sm" ? 6 : size === "lg" ? 8 : 7;

  const colorStyle = isSolid
    ? color === "gray"
      ? {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--foreground))",
      }
      : {
        color: "hsl(var(--foreground))",
        backgroundColor: `color-mix(in srgb, ${colorValue} 15%, hsl(var(--background)))`,
      }
    : {};

  const dotColor = color === "gray" ? "var(--muted-foreground)" : colorValue;

  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), shape.item, className)}
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      {!isSolid && (
        <span
          className="badge-dot"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
          }}
        />
      )}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants, badgeColors };