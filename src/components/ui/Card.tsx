import "../../styles/ui/card.css";

type CardProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

function Card({
  children,
  title,
  className = "",
}: CardProps) {
  return (
    <div className={`zy-card ${className}`}>
      {title && (
        <div className="zy-card-header">
          <h2>{title}</h2>
        </div>
      )}

      <div className="zy-card-body">
        {children}
      </div>
    </div>
  );
}

export default Card;