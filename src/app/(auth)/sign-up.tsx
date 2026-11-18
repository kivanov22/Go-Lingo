import { useState } from "react";
import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";

import AuthScreen from "@/components/AuthScreen";
import { useSocialAuth } from "@/hooks/useSocialAuth";

export default function SignUp() {
  const router = useRouter();
  const { signUp, fetchStatus } = useSignUp();
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Step 1: create the account, then email a verification code
  const createAccount = async (emailAddress: string, password: string) => {
    setError("");
    const { error: createError } = await signUp.password({ emailAddress, password });
    if (createError) {
      setError(createError.message);
      return;
    }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setError(sendError.message);
      return;
    }
    setVerifying(true);
  };

  // Step 2: check the code and start the session
  const verifyCode = async (code: string) => {
    setError("");
    const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code });
    if (verifyError) {
      setError(verifyError.message);
      return;
    }
    if (signUp.status === "complete") {
      // Activates the session; the route guards then move the user to home
      await signUp.finalize();
      setVerifying(false);
    }
  };

  const handleSocialPress = useSocialAuth(setError);

  const resendCode = async () => {
    setError("");
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) setError(sendError.message);
  };

  return (
    <AuthScreen
      title="Create your account"
      subtitle="Start your language journey today ✨"
      submitLabel="Sign Up"
      withPassword
      footerText="Already have an account?"
      footerLink="Log in"
      onFooterPress={() => router.replace("/sign-in")}
      loading={fetchStatus === "fetching"}
      error={error}
      verifying={verifying}
      onSubmit={createAccount}
      onVerify={verifyCode}
      onResend={resendCode}
      onCloseVerify={() => setVerifying(false)}
      onSocialPress={handleSocialPress}
    />
  );
}
