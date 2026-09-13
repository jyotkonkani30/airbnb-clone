"use client";

import { useEffect } from "react";

const selector = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "[tabindex]:not([tabindex=\"-1\"])"
].join(",");

export function useFocusTrap(active: boolean, container: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active || !container.current) return;
    const node = container.current;
    const focusable = () => Array.from(node.querySelectorAll<HTMLElement>(selector));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", onKeyDown);
    focusable()[0]?.focus();
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [active, container]);
}
