import { useRouter } from "expo-router";

import AuthScreen from "@/components/AuthScreen";

export default function SignUp() {
  const router = useRouter();

  return (
    <AuthScreen
      title="Create your account"
      subtitle="Start your language journey today ✨"
      submitLabel="Sign Up"
      withPassword
      footerText="Already have an account?"
      footerLink="Log in"
      onFooterPress={() => router.replace("/sign-in")}
    />
  );
}
