import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "default";
  size?: "sm" | "md" | "lg" | "xl3";
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = "transition-transform p-3 rounded-full shadow-sm";
  const variantStyles = {
    primary:
      "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-md",
    default: "bg-white/80 text-gray-800 hover:bg-white/90 hover:shadow-md",
  };
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl3: "text-3xl",
  };

  const disabledStyles = props.disabled
    ? "opacity-50 cursor-not-allowed hover:shadow-sm pointer-events-none"
    : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};