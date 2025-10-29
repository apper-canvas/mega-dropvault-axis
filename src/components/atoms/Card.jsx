import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({
  children,
  className,
  variant = "default",
  hover = true,
  padding = "md",
  ...props
}, ref) => {
  const baseStyles = "rounded-xl border backdrop-blur-sm";
  
  const variants = {
    default: "glass-morphism shadow-lg",
    solid: "bg-gray-800 border-gray-700 shadow-lg",
    gradient: "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 shadow-xl",
    glass: "glass-morphism shadow-2xl border-white/10"
  };
  
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  const Component = hover ? motion.div : "div";
  const motionProps = hover ? {
    whileHover: { y: -2, scale: 1.01 },
    transition: { duration: 0.2 }
  } : {};
  
  return (
    <Component
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        hover && "cursor-pointer",
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = "Card";

export default Card;