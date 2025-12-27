"use client";

import { Icon } from "@iconify/react";
import { type MotionProps, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/helper";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const DarkModeButton = ({ className, onClick, ...rest }: Props & MotionProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
      className={cn(
        "rounded-lg p-1 hover:text-accent focus:text-accent focus:outline-none focus:bg-bg-secondary cursor-pointer w-fit duration-200",
        className,
      )}
      onClick={toggleTheme}
      {...rest}
    >
      <Icon icon={theme === "dark" ? "carbon:sun" : "ph:moon"} width="26" height="26" />
    </motion.button>
  );
};

export default DarkModeButton;
