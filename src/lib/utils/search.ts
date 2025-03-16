function normalizeName(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export function searchByName(itemName: string, searchTerm: string) {
  const searchLower = normalizeName(searchTerm.toLowerCase());
  return normalizeName(itemName.toLowerCase()).includes(searchLower);
};

function normalizeCPF(str: string) {
  return str.replace(/[.-]/g, "");
};

export function searchByCPF(itemCPF: string, searchTerm: string) {
  const searchNumeric = normalizeCPF(searchTerm);
  return normalizeCPF(itemCPF).includes(searchNumeric);
};