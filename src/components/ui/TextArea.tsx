import "../../styles/ui/form.css";

type TextAreaProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
};

function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
}: TextAreaProps) {
  return (
    <div className="zy-form-group">
      {label && <label>{label}</label>}

      <textarea
        className="zy-textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </div>
  );
}

export default TextArea;