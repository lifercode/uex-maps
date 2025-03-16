import { useState } from "react";

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
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

interface ConfirmDeleteContactDialogProps {
  contactId: string;
  onConfirm: () => void;
}

export function ConfirmDeleteContactDialog({ contactId, onConfirm }: ConfirmDeleteContactDialogProps) {
  const [open, setOpen] = useState(false)
  const { removeContact } = useContacts();

  function handleConfirm() {
    removeContact(contactId)
    setOpen(false)
    onConfirm()
  }

  return (
    <>
      <Button variant="tonal" onClick={() => setOpen(true)}>
        <Icon name="delete" />
        <span>Excluir contato</span>
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContainer>
          <DialogHeader>
            <DialogTitle>Excluir contato</DialogTitle>
            <DialogDescription>Tem certeza que deseja exluir este contato? Essa ação é irreversível, estes dados serão excluídos permanentemente.</DialogDescription>
          </DialogHeader>
          <DialogContent />
          <DialogFooter>
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>
              Excluir agora
            </Button>
          </DialogFooter>
        </DialogContainer>
      </Dialog>
    </>
  )
}
