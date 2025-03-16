import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { useAuth } from "../../hooks/use-auth";
import { Icon } from "../ui/icon";
import { IconButton } from "../ui/icon-button";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ConfirmDeleteAccountDialog } from "./confirm-delete-accout-dialog";

export function UserAccountDialog() {
  const [open, setOpen] = useState(false)
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(() => {
      navigate('/auth')
    });
  }

  return (
    <>

      <IconButton onClick={() => setOpen(true)}>
        <Icon name="person" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContainer>
          <DialogHeader>
            <DialogTitle>
              Minha conta
            </DialogTitle>
            <DialogDescription>
              Visualize seus dados, faça logout ou exclua sua conta permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogContent>
            <div className="mt-5 mb-10 flex flex-col space-y-5">
              <Input
                variant="filled"
                placeholder="Nome completo"
                value={loggedInUser?.name}
                disabled
              />
              <Input
                variant="filled"
                placeholder="E-mail"
                value={loggedInUser?.email}
                disabled
              />
            </div>
            <div className="mb-3">
              <ConfirmDeleteAccountDialog
                userId={loggedInUser?.id}
                onConfirm={() => setOpen(false)}
              />
            </div>
            <p className="text-xs mb-10">
              Se você excluir sua conta, todos os dados de contatos serão excluidos permanentemente.
            </p>
          </DialogContent>
          <DialogFooter>
            <Button variant="text" onClick={handleLogout}>
              <Icon name="logout" />
              <span>Sair</span>
            </Button>
            <Button onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContainer>
      </Dialog>

    </>
  )
}