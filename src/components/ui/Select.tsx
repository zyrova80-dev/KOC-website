import "../../styles/ui/form.css";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  options: Option[];
  required?: boolean;
};

function Select({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: SelectProps) {
  return (
    <div className="zy-form-group">
      {label && <label>{label}</label>}

      <select
        className="zy-select"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;