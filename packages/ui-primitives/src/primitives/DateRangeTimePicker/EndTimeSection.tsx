import { type ReactNode, forwardRef } from "react";

export interface EndTimeSectionProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const EndTimeSection = forwardRef<HTMLDivElement, EndTimeSectionProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  },
);
EndTimeSection.displayName = "EndTimeSection";
