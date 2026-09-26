import "../../styles/ui/form.css";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{
    label?:string;
    error?:string;
    children:React.ReactNode;
}

export default function Select({
    label,
    error,
    children,
    ...props
}:Props){

    return(
        <div className="form-group">

            {label && <label className="form-label">{label}</label>}

            <select
                className="form-select"
                {...props}
            >
                {children}
            </select>

            {error && (
                <span className="form-error">
                    {error}
                </span>
            )}

        </div>
    );
}