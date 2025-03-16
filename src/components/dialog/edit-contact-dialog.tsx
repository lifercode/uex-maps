import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { useContacts } from "../../hooks/use-contacts";
import { Contact } from "../../types";
import { ContactForm } from "../form/contact-form";
import { Button } from "../ui/button";
import { ConfirmDeleteContactDialog } from "./confirm-delete-contact-dialog";

interface EditContactDialogProps {
  data: Contact | null;
  open: boolean;
  onClose: () => void;
}

export function EditContactDialog({ data, open, onClose }: EditContactDialogProps) {
  const { updateContact } = useContacts();

  function handleSuccess() {
    onClose();
  }

  function onSubmit(contact: Omit<Contact, "id">) {
    if(data?.id) {
      updateContact(data?.id, contact, handleSuccess);
    }
  }

  if(!data) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContainer className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar contato</DialogTitle>
            <DialogDescription>
              Aqui você pode visualizar, editar ou excluir os dados deste contato.
            </DialogDescription>
          </DialogHeader>
          <DialogContent>
            <ContactForm initialValues={data} onSubmit={onSubmit} />
          </DialogContent>
          <DialogFooter>
            <ConfirmDeleteContactDialog
              contactId={data?.id}
              onConfirm={handleSuccess}
            />
            <div className="flex-1" />
            <Button type="submit" form="contactForm">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContainer>
      </Dialog>
    </>
  )
}
