import type { MutableRefObject, Ref } from "react";

/** Merge multiple refs (callback or object) into a single callback ref. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    const cleanups: (() => void)[] = [];
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        const cleanup = ref(node);
        if (typeof cleanup === "function") {
          cleanups.push(cleanup);
        }
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
    if (cleanups.length > 0) {
      return () => cleanups.forEach((fn) => fn());
    }
  };
}
