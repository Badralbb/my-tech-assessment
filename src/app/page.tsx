"use client";

import { SearchInput } from "@/components/searchInput";
import { useEffect, useState } from "react";

import { CountryType } from "@/components/CountreisType";
import { SelectInput } from "@/components/selectInput";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [filterText, setFilterText] = useState("");
  const [countriesState, setCountriesState] = useState<CountryType[]>([]);
  const [open, setOpen] = useState(false);

  const getCountries = async () => {
    const response = await fetch("/api/get-items");
    const data = await response.json();
    setCountriesState(data);
  };

  const addItem = async () => {
    const myCountriesNameArray = countriesState.map((country) =>
      country.countryName.toLowerCase()
    );
    if (myCountriesNameArray.includes(filterText.toLowerCase())) {
      alert("already exist");
      afterEach();
      return;
    }

    await fetch("/api/add-item", {
      method: "POST",
      body: JSON.stringify({
        countryName: filterText,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    afterEach();
  };
  const removeItem = async (id: string) => {
    await fetch(`/api/delete-item/${id}`, {
      method: "DELETE",
    });
    afterEach();
  };

  const afterEach = () => {
    setFilterText("");
    getCountries();
  };
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="max-w-[500px] w-full mx-auto">
      <header className="font-bold text-3xl text-center">
        My-Tech-Assessment
      </header>

      <div className="mt-8 w-full">
        <div className="flex gap-4">
          <SearchInput
            setOpen={setOpen}
            open={open}
            setFilterText={setFilterText}
            filterText={filterText}
          />
          <Button disabled={!filterText} onClick={addItem}>
            Add Item
          </Button>
        </div>
        <div className="flex gap-4 items-center mt-6">
          <SelectInput
            open={open}
            setOpen={setOpen}
            filterText={filterText}
            setFilterText={setFilterText}
          />
        </div>
        <div className="mt-8">
          <header className="text-center">My Countries</header>
          <section>
            {countriesState.map((country) => (
              <div
                key={country._id}
                className="flex gap-4 mt-4
                 border border-black pl-4 items-center rounded-lg"
              >
                <div className="flex-1">{country.countryName}</div>
                <Button onClick={() => removeItem(country._id)}>
                  Remove Item
                </Button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
