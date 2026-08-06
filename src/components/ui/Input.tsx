import "../../styles/ui/form.css";

type InputProps = {
  label?: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

function Input({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}: InputProps) {
  return (
    <div className="zy-form-group">
      {label && <label>{label}</label>}

      <input
        className="zy-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Input;