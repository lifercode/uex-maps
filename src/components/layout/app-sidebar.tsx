import { useState } from "react";

import { searchByCPF, searchByName } from "../../lib/utils/search";
import { useContacts } from "../../hooks/use-contacts";
import { Input } from "../ui/input";

export function AppSidebar() {
  const { contacts, selectContact, selectedContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = contacts.filter((item) => {
    return (
      searchByName(item.name, searchTerm) || searchByCPF(item.cpf, searchTerm)
    );
  });

  return (
    <>
      <div className="h-[96px]">
        <div className="p-5">
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar"
            icon="search"
          />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-96px-4rem)]">
        <div className="flex flex-col">
          {filteredData.length < 1 && (
            <div className="flex items-center justify-center opacity-60 py-5">
              <p>Nenhum contato encontrado.</p>
            </div>
          )}
          {filteredData.map((item) => (
            <button
              key={item.id}
              onClick={() => selectContact(selectedContact?.id === item.id ? null : item)}
              className={`min-h-[72px] flex flex-row items-center text-left gap-4 py-2 pl-4 pr-6 hover-icon hover:bg-secondary-100 dark:hover:bg-secondary-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 ${
                selectedContact?.id === item.id &&
                "bg-secondary-100 dark:bg-secondary-700 bg-opacity-30 dark:bg-opacity-30"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full text-base tracking-[0.15px] bg-primary-600 text-white dark:bg-primary-200 dark:text-neutral-900 uppercase font-normal">
                {item.name[0]}
              </div>
              <div className="flex flex-col flex-grow">
                <p className="tracking-[.03125em]">{item.name}</p>
                <span className="text-sm tracking-[0.25px]">
                  {`${item.address}, ${item.number}, ${item.city} - ${item.state}`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
