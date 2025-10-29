import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const ProgressBar = React.forwardRef(({
  value = 0,
  max = 100,
  variant = "primary",
  size = "md",
  showLabel = true,
  label,
  animated = true,
  className,
  ...props
}, ref) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
    error: "bg-gradient-to-r from-red-500 to-pink-500"
  };
  
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };
  
  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">
            {label || `${Math.round(percentage)}%`}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={cn(
        "bg-gray-700 rounded-full overflow-hidden",
        sizes[size]
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }}
          className={cn(
            "h-full rounded-full relative overflow-hidden",
            variants[variant]
          )}
        >
          {animated && percentage > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          )}
        </motion.div>
      </div>
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;