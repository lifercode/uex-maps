import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  CONTACT_FORM_NAME_ERROR_MESSAGE,
  CONTACT_FORM_NUMBER_ERROR_MESSAGE,
  CONTACT_FORM_CPF_ERROR_MESSAGE,
  CONTACT_FORM_PHONE_ERROR_MESSAGE,
  CONTACT_FORM_SELECT_STATE_ERROR_MESSAGE,
  CONTACT_FORM_STATE_ERROR_MESSAGE,
  CONTACT_FORM_SELECT_CITY_ERROR_MESSAGE,
  CONTACT_FORM_CITY_ERROR_MESSAGE,
  CONTACT_FORM_ADDRESS_ERROR_MESSAGE,
  CONTACT_FORM_NEIGHBOROOD_ERROR_MESSAGE,
  CONTACT_FORM_CEP_ERROR_MESSAGE,
} from '../../constants/feedback-messages';
import { useLocales } from "../../hooks/use-locales";
import { Contact } from "../../types";
import { LocalesService } from "../../services/locales";
import { useAuth } from "../../hooks/use-auth";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import CPFInput from "../form/cpf-input";
import PhoneInput from "../form/phone-input";
import AddressAutoCompleteInput from "../form/address-auto-complete-input";
import { InputErrorMessage } from "./input-error-message";

const contactSchema = z.object({
  name: z.string().min(1, CONTACT_FORM_NAME_ERROR_MESSAGE),
  number: z.string().min(1, CONTACT_FORM_NUMBER_ERROR_MESSAGE),
  complemento: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  initialValues?: Contact;
  onSubmit: (contact: Omit<Contact, "id">) => void;
}

interface Street {
  logradouro: string;
  bairro: string;
  cep: string;
}

export function ContactForm({ initialValues, onSubmit }: ContactFormProps) {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState<Street | null>(null);
  const {
    estados,
    cidades,
    estadoSelecionado,
    cidadeSelecionada,
    setEstadoSelecionado,
    setCidadeSelecionada,
  } = useLocales();
  const { loggedInUser } = useAuth();

  const [initialCity, setInitialCity] = useState("");
  const [initialState, setInitialState] = useState("");
  const [initialAddress, setInitialAddress] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {},
  });

  async function handleContactSubmit(data: ContactFormValues) {
    const values = {
      name: data?.name,
      userId: loggedInUser?.id as string,
      cpf,
      phone,
      state: estadoSelecionado,
      city: cidadeSelecionada,
      address: street?.logradouro || '',
      number: data?.number,
      complement: data?.complemento,
      neighborhood: street?.bairro || '',
      postalCode: street?.cep || '',
    }
    
    const fullAddress = `${values.address}, ${values.number}, ${values.neighborhood}, ${values.city} - ${values.state}, ${values.postalCode}`

    const coordinates = await LocalesService.getCoordinatesByAddress(fullAddress);

    if(coordinates) {
      onSubmit({ ...values, coordinates })
    }
  }

  const applyInitialValues = useCallback(() => {
    setValue('name', initialValues?.name || '')
    setValue('number', initialValues?.number || '')
    setValue('complemento', initialValues?.complement || '')
    setInitialState(initialValues?.state || '')
    setInitialCity(initialValues?.city || '')
    setEstadoSelecionado(initialValues?.state || '')
    setCidadeSelecionada(initialValues?.city || '')
    setInitialAddress(initialValues?.address || '')
    setCpf(initialValues?.cpf || '')
    setPhone(initialValues?.phone || '')
    setStreet({
      logradouro: initialValues?.address || '',
      bairro: initialValues?.neighborhood || '',
      cep: initialValues?.postalCode || '',
    })

  }, [initialValues, setCidadeSelecionada, setEstadoSelecionado, setValue])

  useEffect(() => {
    if(initialValues) {
      applyInitialValues()
    }
  }, [initialValues, applyInitialValues])

  return (
    <form
      id="contactForm"
      onSubmit={handleSubmit(handleContactSubmit)}
      className="flex flex-col space-y-5 mb-8 pr-2 -mr-5 max-h-96 overflow-y-auto py-2"
    >

      <div>
        <Input
          variant="filled"
          placeholder="Nome completo"
          {...register("name")}
        />
        <InputErrorMessage
          show={Boolean(errors.name)}
          text={errors?.name?.message}
        />
      </div>
      
      <div>
        <CPFInput value={cpf} onChange={setCpf} />
        <InputErrorMessage
          show={isSubmitted && cpf.length < 1}
          text={CONTACT_FORM_CPF_ERROR_MESSAGE}
        />
      </div>

      <div>
        <PhoneInput value={phone} onChange={setPhone} />
        <InputErrorMessage
          show={isSubmitted && phone.length < 1}
          text={CONTACT_FORM_PHONE_ERROR_MESSAGE}
        />
      </div>

      <div>
        <Select
          initialValue={estados.find(({ sigla }) => initialState === sigla)?.nome}
          subValue="sigla"
          label={CONTACT_FORM_SELECT_STATE_ERROR_MESSAGE}
          data={estados}
          value={estadoSelecionado} 
          onChange={(item) => {
            setEstadoSelecionado(item.sigla);
            setCidadeSelecionada("");
          }} 
        />
        <InputErrorMessage
          show={isSubmitted && estadoSelecionado.length < 1}
          text={CONTACT_FORM_STATE_ERROR_MESSAGE}
        />
      </div>
      
      <div>
        <Select
          initialValue={initialCity}
          disabled={!estadoSelecionado}
          subValue="nome"
          label={CONTACT_FORM_SELECT_CITY_ERROR_MESSAGE}
          data={cidades}
          value={cidadeSelecionada} 
          onChange={(item) => {
            setCidadeSelecionada(item.nome);
          }} 
        />
        <InputErrorMessage
          show={isSubmitted && cidadeSelecionada.length < 1}
          text={CONTACT_FORM_CITY_ERROR_MESSAGE}
        />
      </div>
  
      <div className="w-full">
        <AddressAutoCompleteInput
          initialValue={initialAddress}
          disabled={!estadoSelecionado || !cidadeSelecionada}
          subValue="logradouro" 
          value={street?.logradouro || ''}
          onChange={setStreet}
          mountDataUrl={(searchTerm) => `${estadoSelecionado}/${cidadeSelecionada}/${searchTerm}`} 
        />
        <InputErrorMessage
          show={isSubmitted && (street?.logradouro.length || 0) < 1}
          text={CONTACT_FORM_ADDRESS_ERROR_MESSAGE}
        />
      </div>
      
      <div>
        <Input
          variant="filled"
          placeholder="Número"
          type="number" {...register("number")}
        />
        <InputErrorMessage
          show={Boolean(errors.number)}
          text={errors?.number?.message}
        />
      </div>
      
      <Input
        variant="filled"
        placeholder="Complemento"
        {...register("complemento")}
      />

      <div>
        <Input
          variant="filled"
          placeholder="Bairro"
          disabled
          value={street?.bairro}
        />
        <InputErrorMessage
          show={isSubmitted && (street?.bairro?.length || 0) < 1}
          text={CONTACT_FORM_NEIGHBOROOD_ERROR_MESSAGE}
        />
      </div>

      <div>
        <Input
          variant="filled"
          placeholder="CEP"
          disabled
          value={street?.cep}
        />
        <InputErrorMessage
          show={isSubmitted && (street?.cep?.length || 0) < 1}
          text={CONTACT_FORM_CEP_ERROR_MESSAGE}
        />
      </div>

    </form>
  );
}
