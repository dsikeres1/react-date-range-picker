import type { Ref, MutableRefObject } from "react";

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
  };
}
