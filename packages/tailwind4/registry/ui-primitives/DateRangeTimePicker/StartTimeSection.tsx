import { type ReactNode, forwardRef } from "react";

export interface StartTimeSectionProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const StartTimeSection = forwardRef<HTMLDivElement, StartTimeSectionProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <div ref={ref} className={cn("rdrp-time-section", className)}>
        {children}
      </div>
    );
  },
);
StartTimeSection.displayName = "StartTimeSection";
