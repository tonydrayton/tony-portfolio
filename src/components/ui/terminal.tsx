"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useInView } from "framer-motion";
import { ForwardRefExoticComponent, useEffect, useRef, useState } from "react";

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -5 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: ForwardRefExoticComponent<any>;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = motion.span,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  
  // Use more aggressive intersection observer settings
  const isInView = useInView(elementRef, { 
    once: true,
    margin: "-50px 0px -50px 0px",
    amount: 0 // Trigger as soon as any part is visible
  });

  // Fallback: Also trigger after a timeout in case intersection observer fails
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!hasTriggered) {
        setHasTriggered(true);
      }
    }, 3000); // Fallback after 3 seconds

    return () => clearTimeout(fallbackTimeout);
  }, [hasTriggered]);

  // Start animation when in view OR fallback triggers
  useEffect(() => {
    if (!isInView && !hasTriggered) return;
    
    if (!hasTriggered) {
      setHasTriggered(true);
    }

    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    
    return () => clearTimeout(startTimeout);
  }, [delay, isInView, hasTriggered]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      style={{ minHeight: "1.25rem" }} // Ensure the element has height even when empty
      {...props}
    >
      {displayedText}
      {/* Add a cursor effect while typing */}
      {started && displayedText.length < children.length && (
        <span className="animate-pulse">|</span>
      )}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

export const Terminal = ({ children, className }: TerminalProps) => {
  return (
    <div
      className={cn(
        "z-0 h-full max-h-[400px] w-full max-w-lg rounded-xl border border-border bg-[linear-gradient(134deg,hsla(0,0%,100%,.08),hsla(0,0%,100%,.02),hsla(0,0%,100%,0)_55%)]",
        className,
      )}
    >
      <div className="flex flex-col gap-y-2 border-b border-border p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre className="p-4">
        <code className="grid gap-y-1 overflow-auto">{children}</code>
      </pre>
    </div>
  );
};
