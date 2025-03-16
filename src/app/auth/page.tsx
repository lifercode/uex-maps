import { useState } from "react";
import { SignInDialog } from "../../components/dialog/signin-dialog";
import { SignUpDialog } from "../../components/dialog/signup-dialog";

export default function Page() {
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin')

  return (
    <>
      <SignInDialog
        open={authType === 'signin'}
        goSignUp={() => setAuthType('signup')}
      />
      <SignUpDialog
        open={authType === 'signup'}
        goSignIn={() => setAuthType('signin')}
      />
    </>
  )
}
