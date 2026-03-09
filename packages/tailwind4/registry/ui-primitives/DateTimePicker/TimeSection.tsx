import { type ReactNode, forwardRef } from "react";

export interface TimeSectionProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const TimeSection = forwardRef<HTMLDivElement, TimeSectionProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  },
);
TimeSection.displayName = "TimeSection";
