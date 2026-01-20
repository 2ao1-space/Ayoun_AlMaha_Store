"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginForm } from "./login-form";
import { SignupForm } from "./sign-up-form";
import { EmailConfirmation } from "./email-confirmation";
import { ForgotPasswordForm } from "./forgot-password-form";
import { UpdatePasswordForm } from "./update-password-form";

type AuthMode =
  | "login"
  | "signup"
  | "forgot-password"
  | "update-password"
  | "confirm-email";

interface AuthContainerProps {
  initialMode: string;
  message?: string;
}

export function AuthContainer({ initialMode, message }: AuthContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(initialMode as AuthMode);

  useEffect(() => {
    const currentMode = searchParams.get("mode") || "login";
    setMode(currentMode as AuthMode);
  }, [searchParams]);

  const switchMode = (newMode: AuthMode) => {
    router.push(`/auth?mode=${newMode}`);
  };

  switch (mode) {
    case "signup":
      return <SignupForm onSwitchToLogin={() => switchMode("login")} />;

    case "forgot-password":
      return <ForgotPasswordForm onBackToLogin={() => switchMode("login")} />;

    case "update-password":
      return <UpdatePasswordForm />;

    case "confirm-email":
      return <EmailConfirmation />;

    case "login":
    default:
      return (
        <LoginForm
          onSwitchToSignup={() => switchMode("signup")}
          onSwitchToForgotPassword={() => switchMode("forgot-password")}
          message={message}
        />
      );
  }
}
