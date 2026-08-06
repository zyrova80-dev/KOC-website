import "../../styles/ui/emptyState.css";

type EmptyStateProps = {
  title?: string;
  message?: string;
};

function EmptyState({
  title = "Nothing Here",
  message = "There is currently no data to display.",
}: EmptyStateProps) {
  return (
    <div className="zy-empty-state">
      <div className="zy-empty-icon">📂</div>

      <h3>{title}</h3>

      <p>{message}</p>
    </div>
  );
}

export default EmptyState;