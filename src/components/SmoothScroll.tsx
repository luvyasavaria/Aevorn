import React, { useEffect, useRef } from "react";

/**
 * High-performance momentum smooth scrolling.
 * Emulates the signature inertial feel of premium design agencies.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const targetRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const isMoving = useRef<boolean>(false);

  useEffect(() => {
    // Only apply wheel inertia on desktop non-touch fine pointers
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    targetRef.current = window.scrollY;
    currentRef.current = window.scrollY;

    const smooth = () => {
      // Linear interpolation (lerp): current = current + (target - current) * ease
      const ease = 0.075; // Buttery-smooth speed coefficient
      const diff = targetRef.current - currentRef.current;
      
      currentRef.current += diff * ease;

      // When the difference is minuscule, snap and stop animating
      if (Math.abs(diff) < 0.3) {
        currentRef.current = targetRef.current;
        window.scrollTo(0, Math.round(currentRef.current));
        isMoving.current = false;
      } else {
        window.scrollTo(0, Math.round(currentRef.current));
        requestAnimationFrame(smooth);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Let standard native browser handling do its thing if Ctrl is pressed (for zooming)
      if (e.ctrlKey) return;

      e.preventDefault();

      // Adjust delta based on scroll direction & dynamic scroll wheel speed
      const scrollMultiplier = 1.6;
      targetRef.current = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          targetRef.current + e.deltaY * scrollMultiplier
        )
      );

      // Start the animation loop if it's not already running
      if (!isMoving.current) {
        isMoving.current = true;
        requestAnimationFrame(smooth);
      }
    };

    // Keep target synchronized when the user presses keyboard arrows, page-up, page-down or clicks an anchor link
    const handleScrollSync = () => {
      // If we are not currently animating smoothly, update variables to actual document position
      if (!isMoving.current) {
        targetRef.current = window.scrollY;
        currentRef.current = window.scrollY;
      }
    };

    // Passive listener for standard scrolls, non-passive for wheel intercepts
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScrollSync, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScrollSync);
    };
  }, []);

  return <>{children}</>;
}
