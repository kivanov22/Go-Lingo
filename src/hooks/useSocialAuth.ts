import { useSSO } from "@clerk/expo";

import type { SocialProvider } from "@/components/SocialButton";

const strategies = {
  Google: "oauth_google",
  Facebook: "oauth_facebook",
  Apple: "oauth_apple",
} as const;

// Opens the provider's login in a browser session and starts the Clerk session.
// The route guards in the root layout take care of navigating to home.
export function useSocialAuth(onError: (message: string) => void) {
  const { startSSOFlow } = useSSO();

  return async (provider: SocialProvider) => {
    onError("");
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: strategies[provider],
      });
      // No session id means the user closed the browser: not an error
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : `Could not sign in with ${provider}`);
    }
  };
}
