export type ServiceResponse = {
  success?: string;
  error?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Contact = {
  id: string;
  userId: string;
  name: string;
  cpf: string;
  phone: string;
  state: string;
  city: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  postalCode: string;
  coordinates: [number, number];
};
