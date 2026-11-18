import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthInput from "@/components/AuthInput";
import SocialButton, { type SocialProvider } from "@/components/SocialButton";
import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/theme";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  withPassword: boolean;
  footerText: string;
  footerLink: string;
  onFooterPress: () => void;
  loading: boolean;
  error: string;
  verifying: boolean;
  onSubmit: (email: string, password: string) => void;
  onVerify: (code: string) => void;
  onResend: () => void;
  onCloseVerify: () => void;
  onSocialPress: (provider: SocialProvider) => void;
};

export default function AuthScreen({
  title,
  subtitle,
  submitLabel,
  withPassword,
  footerText,
  footerLink,
  onFooterPress,
  loading,
  error,
  verifying,
  onSubmit,
  onVerify,
  onResend,
  onCloseVerify,
  onSocialPress,
}: AuthScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingBottom: 24,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            className="mt-2 size-10 justify-center"
          >
            <View className="ml-2 size-3.5 rotate-[-45deg] border-b-2 border-l-2 border-ink" />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="heading-1 mt-6 text-[28px]">{title}</Text>
          <Text className="body-large mt-1 text-ink-muted">{subtitle}</Text>

          {/* Mascot */}
          <Image
            source={images.mascotLogo}
            className="my-1 h-[150px] w-full"
            resizeMode="contain"
          />

          {/* Email */}
          <AuthInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            keyboardType="email-address"
            autoCorrect={false}
          />

          {/* Password (sign up only) */}
          {withPassword && (
            <AuthInput
              label="Password"
              className="mt-4"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              right={
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={12}
                >
                  {/* Simple eye icon: outline + pupil, slashed when hidden */}
                  <View className="h-4 w-7 items-center justify-center rounded-full border-2 border-ink-muted">
                    <View className="size-2 rounded-full bg-ink-muted" />
                    {!showPassword && (
                      <View className="absolute h-0.5 w-8 rotate-[-30deg] bg-ink-muted" />
                    )}
                  </View>
                </TouchableOpacity>
              }
            />
          )}

          {/* Error from Clerk (hidden while the code modal is open) */}
          {!verifying && error !== "" && (
            <Text className="body-medium mt-3 text-red-500">{error}</Text>
          )}

          {/* Clerk bot protection mount point (required on sign up) */}
          {withPassword && <View nativeID="clerk-captcha" />}

          {/* Main button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={loading}
            onPress={() => {
              Keyboard.dismiss();
              onSubmit(email.trim(), password);
            }}
            className={`mt-5 h-[60px] items-center justify-center rounded-2xl bg-lingua-deep-purple ${
              loading ? "opacity-60" : ""
            }`}
            style={{
              shadowColor: colors.linguaDeepPurple,
              shadowOpacity: 0.3,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 5,
            }}
          >
            <Text className="heading-3 text-white">{submitLabel}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="my-5 flex-row items-center gap-3">
            <View className="divider flex-1" />
            <Text className="body-medium text-ink-muted">or continue with</Text>
            <View className="divider flex-1" />
          </View>

          {/* Social buttons */}
          <View className="gap-3">
            <SocialButton provider="Google" onPress={() => onSocialPress("Google")} />
            <SocialButton provider="Facebook" onPress={() => onSocialPress("Facebook")} />
            <SocialButton provider="Apple" onPress={() => onSocialPress("Apple")} />
          </View>

          {/* Footer */}
          <View className="flex-1 flex-row items-end justify-center pt-8">
            <Text className="body-medium text-ink-muted">{footerText} </Text>
            <TouchableOpacity onPress={onFooterPress}>
              <Text className="body-medium font-poppins-medium text-lingua-deep-purple">
                {footerLink}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <VerificationModal
        visible={verifying}
        email={email}
        error={error}
        onClose={onCloseVerify}
        onSubmitCode={onVerify}
        onResend={onResend}
      />
    </View>
  );
}
