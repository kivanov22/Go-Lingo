import { useState } from "react";
import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";

import AuthScreen from "@/components/AuthScreen";
import { useSocialAuth } from "@/hooks/useSocialAuth";

export default function SignIn() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Step 1: email the user a sign-in code
  const sendCode = async (emailAddress: string) => {
    setError("");
    const { error: sendError } = await signIn.emailCode.sendCode({ emailAddress });
    if (sendError) {
      setError(sendError.message);
      return;
    }
    setEmail(emailAddress);
    setVerifying(true);
  };

  // Step 2: check the code and start the session
  const verifyCode = async (code: string) => {
    setError("");
    const { error: verifyError } = await signIn.emailCode.verifyCode({ code });
    if (verifyError) {
      setError(verifyError.message);
      return;
    }
    if (signIn.status === "complete") {
      // Activates the session; the route guards then move the user to home
      await signIn.finalize();
      setVerifying(false);
    }
  };

  const handleSocialPress = useSocialAuth(setError);

  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Continue your language journey 👋"
      submitLabel="Sign In"
      withPassword={false}
      footerText="Don't have an account?"
      footerLink="Sign up"
      onFooterPress={() => router.replace("/sign-up")}
      loading={fetchStatus === "fetching"}
      error={error}
      verifying={verifying}
      onSubmit={(emailAddress) => sendCode(emailAddress)}
      onVerify={verifyCode}
      onResend={() => sendCode(email)}
      onCloseVerify={() => setVerifying(false)}
      onSocialPress={handleSocialPress}
    />
  );
}
