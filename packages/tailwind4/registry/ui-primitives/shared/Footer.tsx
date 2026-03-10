import { type ReactNode, forwardRef } from "react";

export interface FooterProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <div ref={ref} className={cn("rdrp-footer", className)}>
        {children}
      </div>
    );
  },
);
Footer.displayName = "Footer";
