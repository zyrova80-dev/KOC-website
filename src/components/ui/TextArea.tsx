import "../../styles/ui/form.css";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?:string;
    error?:string;
}

export default function TextArea({
    label,
    error,
    ...props
}:Props){

    return(
        <div className="form-group">

            {label && <label className="form-label">{label}</label>}

            <textarea
                className="form-textarea"
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