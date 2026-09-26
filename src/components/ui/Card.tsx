import "../../styles/ui/card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  flat?: boolean;
}

export default function Card({
  children,
  className = "",
  clickable = false,
  flat = false,
}: CardProps) {
  return (
    <div
      className={`card ${clickable ? "card-clickable" : ""} ${
        flat ? "card-flat" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="card-header">
      <div>
        <h2 className="card-title">{title}</h2>

        {subtitle && (
          <p className="card-subtitle">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  );
}

export function CardBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="card-body">
      {children}
    </div>
  );
}

export function CardFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="card-footer">
      {children}
    </div>
  );
}