import { type ReactNode, forwardRef } from "react";

export interface CalendarsProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const Calendars = forwardRef<HTMLDivElement, CalendarsProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <div ref={ref} className={cn("rdrp-calendars-container", className)}>
        {children}
      </div>
    );
  },
);
Calendars.displayName = "Calendars";
