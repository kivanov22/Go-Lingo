import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  error: string;
  onClose: () => void;
  onSubmitCode: (code: string) => void;
  onResend: () => void;
};

export default function VerificationModal({
  visible,
  email,
  error,
  onClose,
  onSubmitCode,
  onResend,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleClose = () => {
    setCode("");
    onClose();
  };

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (digits.length === CODE_LENGTH) {
      setCode("");
      onSubmitCode(digits);
      return;
    }
    setCode(digits);
  };

  // Rendered as an in-tree overlay instead of React Native's <Modal>, which
  // never gets painted on some Android emulators. Android resizes the window
  // for the keyboard, so the centered card stays visible above it.
  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: "rgba(13,19,43,0.5)",
        }}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 32,
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
        >
          <Text className="heading-2 text-center">Check your email</Text>
          <Text className="body-medium mt-2 text-center text-ink-muted">
            We sent a verification code to{"\n"}
            <Text className="font-poppins-semibold text-ink">
              {email || "your email"}
            </Text>
            {"\n"}Enter the 6-digit code below.
          </Text>

          {/* Six boxes drawn over one hidden number-pad input */}
          <Pressable
            className="mt-6 flex-row justify-between"
            onPress={() => inputRef.current?.focus()}
          >
            {Array.from({ length: CODE_LENGTH }).map((_, index) => {
              const isActive = index === Math.min(code.length, CODE_LENGTH - 1);
              return (
                <View
                  key={index}
                  className={`h-14 w-12 items-center justify-center rounded-2xl border bg-surface ${
                    isActive ? "border-lingua-deep-purple" : "border-border"
                  }`}
                >
                  <Text className="heading-2">{code[index] ?? ""}</Text>
                </View>
              );
            })}
          </Pressable>

          {error !== "" && (
            <Text className="body-medium mt-4 text-center text-red-500">{error}</Text>
          )}

          <View className="mt-6 flex-row items-center justify-center">
            <Text className="body-medium text-ink-muted">Didn&apos;t receive it? </Text>
            <Pressable
              hitSlop={8}
              onPress={() => {
                setCode("");
                onResend();
                inputRef.current?.focus();
              }}
            >
              <Text className="body-medium font-poppins-medium text-lingua-deep-purple">
                Resend
              </Text>
            </Pressable>
          </View>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={CODE_LENGTH}
            autoFocus
            textContentType="oneTimeCode"
            style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
