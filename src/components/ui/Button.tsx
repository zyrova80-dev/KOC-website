import "../../styles/ui/button.css";

interface ButtonProps
{
    children: React.ReactNode;
    onClick?: () => void;

    type?: "button" | "submit";

    variant?:
        | "primary"
        | "secondary"
        | "danger"
        | "success"
        | "ghost";

    disabled?: boolean;

    fullWidth?: boolean;
}

export default function Button({
    children,
    onClick,
    type="button",
    variant="primary",
    disabled=false,
    fullWidth=false
}:ButtonProps){

    return(
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`btn btn-${variant} ${fullWidth ? "btn-full" : ""}`}
        >
            {children}
        </button>
    );
}