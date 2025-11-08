type HeadingLevel = "h1" | "h2" | "h3";

interface HeadingProps {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  as = "h1",
  children,
  className = "",
}) => {
  const Component = as;

  const baseStyles = "leading-normal";

  const sizeStyles: Record<HeadingLevel, string> = {
    h1: "text-5xl font-semibold",
    h2: "text-3xl font-semibold",
    h3: "text-3xl font-medium",
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[as]} ${className}`;

  return <Component className={combinedClassName}>{children}</Component>;
};

export default Heading;
