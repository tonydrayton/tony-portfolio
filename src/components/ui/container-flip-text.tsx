"use client";

import React, { useState, useEffect, useId } from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWindowSize } from "@/hooks";
import { MinimumWidth } from "@/lib/types";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef(null);
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width > MinimumWidth.Large;

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width
      // @ts-ignore
      const textWidth = isDesktop ? textRef.current.scrollWidth + 30 : textRef.current.scrollWidth + 15;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex, isDesktop, windowSize]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pb-0.5 lg:pt-2 lg:pb-3 text-center text-4xl font-semibold text-black dark:text-white backdrop-blur-3xl",
        "[background:linear-gradient(to_bottom,#fdfdfe52,#eff1f455)]",
        "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
        "dark:[background:linear-gradient(to_bottom,#20212324,#1d1e2023)]",
        "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsl(204.98deg,33.59%,74.79%,.24),_0_4px_8px_#00000052]",
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
