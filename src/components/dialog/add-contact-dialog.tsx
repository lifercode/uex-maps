import { useState } from "react";

import { IconButton } from "../ui/icon-button";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { useContacts } from "../../hooks/use-contacts";
import { Contact } from "../../types";
import { ContactForm } from "../form/contact-form";
import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export function AddContactDialog() {
  const [open, setOpen] = useState(false);
  const { addContact } = useContacts();

  function onSubmit(data: Omit<Contact, "id">) {
    addContact(data, () => {
      setOpen(false);
    });
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Icon name="add" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContainer className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Novo contato</DialogTitle>
            <DialogDescription>
              Preencha os dados para adicionar um novo contato.
            </DialogDescription>
          </DialogHeader>
          <DialogContent>
            <ContactForm onSubmit={onSubmit} />
          </DialogContent>
          <DialogFooter>
            <Button variant="text" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit" form="contactForm">Salvar</Button>
          </DialogFooter>
        </DialogContainer>
      </Dialog>
    </>
  );
}
