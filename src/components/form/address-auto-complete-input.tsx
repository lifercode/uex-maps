/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Input } from "../ui/input";
import { Icon } from "../ui/icon";
import { LocalesService } from "../../services/locales";

export default function AddressAutoCompleteInput({
  initialValue,
  disabled,
  subValue,
  mountDataUrl,
  value,
  onChange
}: {
  initialValue?: string;
  disabled: boolean;
  subValue: string;
  mountDataUrl: (value: string) => string;
  value: string;
  onChange: (value: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    setLoading(true);
    const response = await LocalesService.getFullAddressBySearchTerm(mountDataUrl(searchTerm))
    setResults(response);
    setLoading(false);
  };

  const debouncedFetch = debounce(fetchResults, 500);

  useEffect(() => {
    debouncedFetch(query);
    return () => {
      debouncedFetch.cancel();
    };
  }, [query]);
  
  const updateQuery = useCallback(() => {
    if(!open && !value) {
      setQuery('')
    }
  }, [open, value])

  useEffect(() => {
    updateQuery()
  }, [open, updateQuery])

  useEffect(() => {
    if(initialValue) {
      setQuery(initialValue)
    }
  }, [initialValue])

  return (
    <div className="relative inline-block w-full">
      <Input variant="filled"
        disabled={disabled}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Endereço"
        onFocus={() => setOpen(true)}
      />
      {open && (
        <>
          <ul className="absolute top-[3.1rem] z-30 transition duration-400 min-h-32 ease-in-out left-0 inline-flex flex-col py-2 rounded bg-surface-200 dark:bg-surfacedark-200 shadow-md dark:shadow-gray-50/10 l max-h-44 overflow-y-auto">
            {loading && <li>Carregando...</li>}
            {results.map((item) => (
              <li className="relative w-ful" key={item.id}>
                <button type="button" onClick={() => {
                  if(value === item[subValue]){
                    onChange(null)
                  } else {
                    onChange(item)
                    setQuery(item[subValue])
                  }
                  setOpen(false)
                }} className="w-full min-h-[3rem] flex flex-row text-left items-center gap-4 py-2 px-3 hover-icon hover:bg-secondary-100 dark:hover:bg-secondary-700 hover:bg-opacity-30 dark:hover:bg-opacity-30">
                  {(item[subValue])}
                  {value === item[subValue] && <Icon name="check" />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

    </div>
  );
}
