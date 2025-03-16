import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Contact } from '../types'

type ContactsStoreState = {
  selectedContact: Contact | null
  contacts: Contact[]
}

type ContactsStoreActions = {
  setContacts: (nextContacts: ContactsStoreState['contacts']) => void
  addContact: (newContact: Contact) => void
  updateContact: (contactId: string, newContact: Omit<Contact, "id">) => void
  removeContact: (contactId: string) => void
  selectContact: (contact: Contact | null) => void
  removeAllContactsByUser: (userId: string) => void
}

export const useContactsStore = create<ContactsStoreState & ContactsStoreActions>()(
  persist(
    (set) => ({
      selectedContact: null,
      contacts: [],
      setContacts: (contacts) => set({ contacts }),
      addContact: (contact) => set((state) => ({
        contacts: [...state.contacts, contact]
      })),
      updateContact: (contactId, updatedContact) => set((state) => ({
        contacts: [
          ...state.contacts.map(
            contact => contact.id === contactId
              ? { ...contact, ...updatedContact }
              : contact
          )
        ]
      })),
      removeContact: (contactId) => set((state) => ({
        contacts: [
          ...state.contacts.filter(({ id }) => id !== contactId)
        ]
      })),
      selectContact: (selectedContact) => set({ selectedContact }),
      removeAllContactsByUser: (id) => set((state) => ({
        contacts: [
          ...state.contacts.filter(({ userId }) => userId !== id)
        ]
      })),
    }),
    { name: 'uex-maps@contacts-storage' },
  ),
)
