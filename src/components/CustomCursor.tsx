import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hasPointer, setHasPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  // Position of actual mouse cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the outer cursor ring (with a subtle luxury lag/trail)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 25 });

  // Springs for the central fast dot
  const dotX = useSpring(cursorX, { stiffness: 450, damping: 35 });
  const dotY = useSpring(cursorY, { stiffness: 450, damping: 35 });

  useEffect(() => {
    // Only enable custom cursor on desktop pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }
    setHasPointer(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if mouse is hovering over an interactive element
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable");

      if (isInteractive) {
        setIsHovered(true);
        // Custom branding or style based on element type
        if (target.classList.contains("liquid-glass") || target.closest(".liquid-glass")) {
          setHoverType("glass-pill");
        } else {
          setHoverType("default");
        }
      } else {
        setIsHovered(false);
        setHoverType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!hasPointer) return null;

  return (
    <>
      {/* 1. Leading Centre Dot */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* 2. Soft Trailing Cinematic Hover Ring */}
      <motion.div
        className="fixed rounded-full z-[9998] pointer-events-none border border-white/20 flex items-center justify-center bg-white/[0.015]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (hoverType === "glass-pill" ? 48 : 40) : 24,
          height: isHovered ? (hoverType === "glass-pill" ? 48 : 40) : 24,
          backdropFilter: isHovered ? "blur(3px)" : "blur(0px)",
          WebkitBackdropFilter: isHovered ? "blur(3px)" : "blur(0px)",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.015)",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.2)",
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
          mass: 0.8,
        }}
      >
        {/* Subtle inner core glow inside the ring when hovering */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-2.5 h-2.5 rounded-full bg-white/20 blur-[1px]"
          />
        )}
      </motion.div>
    </>
  );
}
