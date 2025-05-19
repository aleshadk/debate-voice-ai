import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
};
