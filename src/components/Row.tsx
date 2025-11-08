type RowType = "horizontal" | "vertical";

interface RowProps {
  type?: RowType;
  children: React.ReactNode;
  className?: string;
}

const Row: React.FC<RowProps> = ({
  type = "vertical",
  children,
  className = "",
}) => {
  const baseStyles = "flex";

  const typeStyles: Record<RowType, string> = {
    horizontal: "justify-between items-center",
    vertical: "flex-col gap-6",
  };

  const combinedClassName = `${baseStyles} ${typeStyles[type]} ${className}`;

  return <div className={combinedClassName}>{children}</div>;
};

export default Row;
