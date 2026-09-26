import "../../styles/ui/form.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
    label,
    error,
    ...props
}: InputProps) {
    return (
        <div className="form-group">
            {label && <label className="form-label">{label}</label>}

            <input
                className="form-input"
                {...props}
            />

            {error && (
                <span className="form-error">
                    {error}
                </span>
            )}
        </div>
    );
}