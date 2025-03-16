/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
import { Input } from "./input";

type AutocompleteProps = {
  disabled?: boolean;
  label: string;
  initialValue?: string;
  value: string;
  onChange: (item: any) => void;
  data: any[];
  subValue?: string;
};

export function Select({ disabled, label, initialValue, value, onChange, data, subValue }: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(initialValue) {
      setQuery(initialValue)
    }
  }, [initialValue])

  const filteredData = data.filter((item) =>
    item.nome.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative inline-block w-full" ref={ref}>
      <Input
        disabled={disabled}
        type="text"
        variant="filled"
        placeholder={label}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <ul className={`absolute top-[3rem] z-30 transition duration-400 ease-in-out left-0 min-w-[200px] inline-flex flex-col py-2 rounded bg-white shadow-md max-h-44 overflow-y-auto`}>
          {filteredData.length < 1 && (
            <li className="w-full min-h-[3rem] flex flex-row items-center justify-center py-2 px-3 text-center text-gray-500">
              <span className="opacity-60 cursor-not-allowed">Nenhum resultado</span>
            </li>
          )}
          {filteredData.map((item: any) => (
            <li className="relative w-full" key={item.id}>
              <button
                onClick={() => {
                  onChange(item);
                  setQuery(item.nome);
                  setOpen(false);
                }}
                className="w-full min-h-[3rem] flex flex-row items-center gap-4 py-2 px-3 hover:bg-gray-200"
              >
                {item?.icon && <Icon name={item.icon} />}
                {item.nome}
                {(value === (subValue ? item[subValue] : item)) && <Icon name="check" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
