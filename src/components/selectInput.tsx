import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryType } from "./CountreisType";
import { useState } from "react";

const countries = [
  "United States",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "India",
  "China",
  "Brazil",
  "Russia",
];
export type InputType = {
  setFilterText: (_value: string) => void;
  filterText: string;
  open: boolean;
  setOpen: (_value: boolean) => void;
};

export const SelectInput = ({
  setFilterText,
  filterText,
  setOpen,
  open,
}: InputType) => {
  const handleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
  };
  const setFieldValues = (country: string) => {
    setFilterText(country);
    setOpen(false);
  };
  return (
    <div className="flex-1">
      <div>
        <div
          className="border border-black rounded-sm p-2 hover:cursor-pointer"
          onClick={handleOpen}
        >
          Suggess countries drop down
        </div>

        {open && (
          <div>
            {countries.map(
              (country) =>
                country.toLowerCase().includes(filterText.toLowerCase()) && (
                  <div
                    onClick={() => setFieldValues(country)}
                    className="flex justify-between border cursor-pointer border-black rounded-sm p-2"
                    key={country}
                  >
                    {country}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
