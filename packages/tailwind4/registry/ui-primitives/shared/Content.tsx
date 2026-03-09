import { type ReactNode, forwardRef, useRef } from "react";
import { usePickerContext } from "react-date-range-picker-headless";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react";
import { mergeRefs } from "../../utils/mergeRefs";

export interface ContentProps {
  className?: string;
  inlineClassName?: string;
  children?: ReactNode;
  cn?: (...args: unknown[]) => string;
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ className, inlineClassName, children, cn: cnFn }, forwardedRef) => {
    const context = usePickerContext();
    const cn = cnFn ?? ((...args: unknown[]) => args.filter(Boolean).join(" "));

    const {
      isOpen,
      inline,
      containerRef,
      popupRef,
      handleKeyDown,
      locale,
      focusedDate,
      calendars,
    } = context;
    const localPopupRef = useRef<HTMLDivElement>(null);
    const showContent = inline || isOpen;

    const {
      refs,
      floatingStyles,
      context: floatingContext,
    } = useFloating({
      open: !inline && isOpen,
      placement: "bottom-start",
      middleware: [offset(8), flip(), shift({ padding: 8 })],
      whileElementsMounted: autoUpdate,
    });

    if (!inline && containerRef?.current && !refs.reference.current) {
      refs.setPositionReference(containerRef.current);
    }

    if (!showContent) return null;

    // Find which calendar "owns" the focused date (matching month) for unique id
    let focusedCalIdx = 0;
    if (focusedDate && calendars.length > 1) {
      const idx = calendars.findIndex(
        (cal) =>
          cal.month.getFullYear() === focusedDate.getFullYear() &&
          cal.month.getMonth() === focusedDate.getMonth(),
      );
      if (idx >= 0) focusedCalIdx = idx;
    }
    const activeDescendant = focusedDate
      ? `rdrp-day-${focusedCalIdx}-${locale.formatDate(focusedDate)}`
      : undefined;

    if (inline) {
      return (
        <div
          ref={mergeRefs(forwardedRef, popupRef, localPopupRef)}
          className={cn(className, inlineClassName)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="group"
          aria-label={locale.placeholder}
          aria-activedescendant={activeDescendant}
        >
          {children}
        </div>
      );
    }

    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext} initialFocus={localPopupRef} returnFocus>
          <div
            ref={mergeRefs(forwardedRef, refs.setFloating, popupRef, localPopupRef)}
            style={floatingStyles}
            className={cn(className)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-label={locale.placeholder}
            aria-activedescendant={activeDescendant}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
Content.displayName = "Content";
