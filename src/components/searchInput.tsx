import { ChangeEvent } from "react";
import { InputType } from "./selectInput";
import { Input } from "./ui/input";

export const SearchInput = ({
  filterText,
  setOpen,
  open,
  setFilterText,
}: InputType) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setOpen(true);
  };
  return (
    <div className="flex-1">
      <Input
        placeholder="search countries"
        onChange={handleInput}
        value={filterText}
      />
    </div>
  );
};
