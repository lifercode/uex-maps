import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  SIGNUP_NAME_REQUIRED,
  SIGNUP_EMAIL_REQUIRED,
  SIGNUP_INVALID_EMAIL_REQUIRED,
  SIGNUP_PASS_REQUIRED,
  SIGNUP_CONFIRM_REQUIRED,
} from '../../constants/feedback-messages'
import {
  Dialog,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { InputErrorMessage } from "../form/input-error-message";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SignUpDialogProps {
  open: boolean;
  goSignIn: () => void;
}

const signUpSchema = z
  .object({
    fullName: z.string().trim().min(1, SIGNUP_NAME_REQUIRED),
    email: z.string().trim().min(1, SIGNUP_EMAIL_REQUIRED).email(SIGNUP_INVALID_EMAIL_REQUIRED),
    password: z.string().trim().min(1, SIGNUP_PASS_REQUIRED),
    confirmPassword: z.string().trim().min(1, SIGNUP_CONFIRM_REQUIRED),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export function SignUpDialog({ open, goSignIn }: SignUpDialogProps) {
  const { createAccount } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  function handleSignUp(data: { fullName: string; email: string; password: string }) {
    createAccount(data.fullName, data.email, data.password, () => {
      goSignIn();
    });
  }

  return (
    <Dialog open={open}>
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Cadastro</DialogTitle>
          <DialogDescription>
            Crie sua conta preenchendo as informações abaixo.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form
            id="signUpForm"
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col space-y-5 mb-10"
          >
            <div>
              <Input
                variant="filled"
                placeholder="Nome completo"
                {...register("fullName")}
              />
              <InputErrorMessage
                show={Boolean(errors.fullName)}
                text={errors.fullName?.message}
              />
            </div>
            <div>
              <Input
                variant="filled"
                placeholder="E-mail"
                {...register("email")}
              />
              <InputErrorMessage
                show={Boolean(errors.email)}
                text={errors.email?.message}
              />
            </div>
            <div>
              <Input
                variant="filled"
                type="password" placeholder="Senha"
                {...register("password")}
              />
              <InputErrorMessage
                show={Boolean(errors.password)}
                text={errors.password?.message}
              />
            </div>
            <div>
              <Input
                variant="filled"
                type="password" placeholder="Senha novamente"
                {...register("confirmPassword")}
              />
              <InputErrorMessage
                show={Boolean(errors.confirmPassword)}
                text={errors.confirmPassword?.message}
              />
            </div>
          </form>
        </DialogContent>
        <DialogFooter>
          <Button variant="text" onClick={goSignIn}>
            Já tenho uma conta
          </Button>
          <Button type="submit" form="signUpForm">
            Cadastrar
          </Button>
        </DialogFooter>
      </DialogContainer>
    </Dialog>
  );
}
