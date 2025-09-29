"use client";

import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "default",
      size = "default",
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizeClasses = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-8",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
