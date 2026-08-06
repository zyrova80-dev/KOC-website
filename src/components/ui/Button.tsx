import "../../styles/ui/button.css";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outline";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
};

function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`zy-btn zy-btn-${variant}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;