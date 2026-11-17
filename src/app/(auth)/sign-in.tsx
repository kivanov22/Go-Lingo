import { useRouter } from "expo-router";

import AuthScreen from "@/components/AuthScreen";

export default function SignIn() {
  const router = useRouter();

  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Continue your language journey 👋"
      submitLabel="Sign In"
      withPassword={false}
      footerText="Don't have an account?"
      footerLink="Sign up"
      onFooterPress={() => router.replace("/sign-up")}
    />
  );
}
