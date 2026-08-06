import "../../styles/ui/search.css";

type SearchBarProps = {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
};

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <input
      className="zy-search"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default SearchBar;