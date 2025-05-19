import { type ChangeEvent } from "react";

interface TextareaProps {
  id: string;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export const Textarea = ({
  id,
  rows = 3,
  placeholder,
  value,
  onChange,
  className = "",
}: TextareaProps) => {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={onChange}
      className={`w-full rounded-xl border-gray-200 bg-white/80 shadow-sm px-4 py-3 text-lg placeholder-gray-400 transition-shadow text-gray-900 ${className}`}
      placeholder={placeholder}
    />
  );
};
