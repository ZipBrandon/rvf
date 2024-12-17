import * as React from "react";
import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, "aria-invalid": ariaInvalid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          type !== "file" &&
            "flex h-10 w-full rounded-md border dark:border-white/15 dark:bg-zinc-800 border-zinc-900/25 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          !!ariaInvalid &&
            "border-red-600 dark:border-red-500 text-red-900 dark:text-red-100 focus-visible:ring-red-600",
          ["checkbox", "radio"].includes(type ?? "") && "h-4",
          className,
        )}
        ref={ref}
        aria-invalid={ariaInvalid}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
