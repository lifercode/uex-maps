import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  ADD_CONTACT_SUCCESS_MESSAGE,
  UPDATE_CONTACT_SUCCESS_MESSAGE,
  DELETE_CONTACT_SUCCESS_MESSAGE,
  ADD_CONTACT_CPF_ERROR_MESSAGE,
} from "../constants/feedback-messages";
import { useContactsStore } from "../store/contacts";
import { toast } from "../lib/utils/toast";
import { Contact } from "../types";
import { useAuth } from "./use-auth";

export const useContacts = () => {
  const {
    contacts: allContacts,
    addContact: addContactStore,
    updateContact: updateContactStore,
    removeContact: removeContactStore,
    selectedContact,
    selectContact,
  } = useContactsStore()
  const { loggedInUser } = useAuth()

  const contacts = allContacts.filter(({ userId }) => userId === loggedInUser?.id)

  const addContact = useCallback(
    (contact: Omit<Contact, "id" | "userId">, onSuccess: () => void) => {
      if(loggedInUser) {
        if(contacts.find(({ userId, cpf }) => userId === loggedInUser.id && cpf === contact.cpf)) {
          toast(ADD_CONTACT_CPF_ERROR_MESSAGE);
        } else {
          addContactStore({ id: uuidv4(), userId: loggedInUser.id, ...contact });
          toast(ADD_CONTACT_SUCCESS_MESSAGE);
          onSuccess();
        }
      }
    }, [addContactStore, contacts, loggedInUser]
  );

  const updateContact = useCallback(
    (id: string, updatedContact: Omit<Contact, "id">, onSuccess: () => void) => {
      updateContactStore(id, updatedContact);
      onSuccess();
      toast(UPDATE_CONTACT_SUCCESS_MESSAGE);
    }, [updateContactStore]
  );

  const removeContact = useCallback(
    async (id: string) => {
      selectContact(null);
      removeContactStore(id);
      toast(DELETE_CONTACT_SUCCESS_MESSAGE);
    }, [removeContactStore, selectContact]
  );

  return {
    contacts,
    addContact,
    updateContact,
    removeContact,
    selectedContact,
    selectContact,
  };
};
