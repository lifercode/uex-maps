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
import {
  SIGNIN_EMAIL_INVALID,
  SIGNIN_EMAIL_REQUIRED,
  SIGNIN_PASS_REQUIRED
} from "../../constants/feedback-messages";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router";
import { InputErrorMessage } from "../form/input-error-message";

interface SignInDialogProps {
  open: boolean;
  goSignUp: () => void;
}

const signInSchema = z.object({
  email: z.string().trim().min(1, SIGNIN_EMAIL_REQUIRED).email(SIGNIN_EMAIL_INVALID),
  password: z.string().trim().min(1, SIGNIN_PASS_REQUIRED),
});

export function SignInDialog({ open, goSignUp }: SignInDialogProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  function handleSignIn(data: { email: string; password: string }) {
    login(data.email, data.password, () => {
      navigate('/');
    });
  }

  return (
    <Dialog open={open}>
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Entrar</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ab
            necessitatibus porro quasi, numquam enim.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form
            id="signInForm"
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col space-y-5 mb-10"
          >
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
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
              <InputErrorMessage
                show={Boolean(errors.password)}
                text={errors.password?.message}
              />
            </div>
          </form>
        </DialogContent>
        <DialogFooter>
          <Button variant="text" onClick={goSignUp}>
            Não tenho uma conta
          </Button>
          <Button type="submit" form="signInForm">
            Entrar
          </Button>
        </DialogFooter>
      </DialogContainer>
    </Dialog>
  );
}
