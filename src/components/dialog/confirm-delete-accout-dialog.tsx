import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router";
import { DELETE_ACCOUNT_CONFIRM_PASS_REQUIRED } from "../../constants/feedback-messages";

interface ConfirmDeleteAccountDialogProps {
  userId?: string;
  onConfirm: () => void;
}

const deleteAccountSchema = z.object({
  password: z.string().trim().min(1, DELETE_ACCOUNT_CONFIRM_PASS_REQUIRED),
});

export function ConfirmDeleteAccountDialog({ userId, onConfirm }: ConfirmDeleteAccountDialogProps) {
  const [open, setOpen] = useState(false);
  const { deleteAccount } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deleteAccountSchema),
  });

  function handleConfirm(data: { password: string }) {
    if(userId) {
      deleteAccount(userId, data.password, () => {
        setOpen(false);
        onConfirm();
        navigate("/auth");
      });
    }
  }

  return (
    <>
      <Button variant="tonal" onClick={() => setOpen(true)}>
        <Icon name="delete" />
        <span>Excluir minha conta</span>
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContainer>
          <DialogHeader>
            <DialogTitle>Excluir minha conta</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir sua conta? Se você excluir sua conta, todos os dados de contatos serão excluídos permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogContent>
            <form
              id="deleteAccountForm"
              onSubmit={handleSubmit(handleConfirm)}
              className="flex flex-col space-y-5 mb-10"
            >
              <div>
                <Input
                  variant="filled"
                  type="password"
                  placeholder="Senha"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </form>
          </DialogContent>
          <DialogFooter>
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" form="deleteAccountForm">
              Excluir agora
            </Button>
          </DialogFooter>
        </DialogContainer>
      </Dialog>
    </>
  );
}
