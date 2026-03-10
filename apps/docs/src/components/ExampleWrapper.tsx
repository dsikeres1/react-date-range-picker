import type { ReactNode, CSSProperties } from "react";

type Variant = "styled" | "tailwind3" | "tailwind4" | "headless";

interface ExampleWrapperProps {
  children?: ReactNode;
  variant: Variant;
}

export function ExampleWrapper({ children, variant }: ExampleWrapperProps) {
  const style: CSSProperties = {
    padding: "1.5rem",
    minHeight: 500,
    minWidth: "max-content",
  };

  if (variant === "headless") {
    return (
      <div style={{ ...style, fontFamily: "system-ui, sans-serif", fontSize: 14 }}>{children}</div>
    );
  }

  return <div style={style}>{children}</div>;
}
