import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/25 focus:ring-primary-500",
    secondary: "bg-gradient-secondary text-white hover:shadow-lg hover:shadow-secondary-500/25 focus:ring-secondary-500",
    success: "bg-gradient-success text-white hover:shadow-lg hover:shadow-green-500/25 focus:ring-green-500",
    outline: "border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white focus:ring-primary-500",
    ghost: "text-gray-400 hover:text-white hover:bg-white/10 focus:ring-white/20",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/25 focus:ring-red-500"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm space-x-2",
    md: "px-6 py-3 text-base space-x-2",
    lg: "px-8 py-4 text-lg space-x-3",
    icon: "p-3"
  };
  
  const isDisabled = disabled || loading;
  
  return (
    <motion.button
      ref={ref}
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className="w-4 h-4 animate-spin" 
        />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;