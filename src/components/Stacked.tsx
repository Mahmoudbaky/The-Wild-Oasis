import React from "react";

interface StackedProps {
  children: React.ReactNode;
  className?: string;
}

function Stacked({ children, className = "" }: StackedProps) {
  return (
    <div
      className={`flex flex-col gap-1 [&>span:first-child]:font-medium [&>span:last-child]:text-gray-500 [&>span:last-child]:text-xs ${className}`}
    >
      {children}
    </div>
  );
}
export default Stacked;
