import "../../styles/ui/spinner.css";

type SpinnerProps = {
  text?: string;
};

function Spinner({
  text = "Loading...",
}: SpinnerProps) {
  return (
    <div className="zy-spinner-container">
      <div className="zy-spinner"></div>

      <p>{text}</p>
    </div>
  );
}

export default Spinner;