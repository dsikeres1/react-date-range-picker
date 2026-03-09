import { type ReactNode, forwardRef } from "react";

export interface HeaderProps {
  className?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, children, cn: cnFn }, ref) => {
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  },
);
Header.displayName = "Header";
