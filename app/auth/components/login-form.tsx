"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  message?: string;
  className?: string;
}

export function LoginForm({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  message,
  className,
  ...props
}: LoginFormProps & React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }
        if (error.message.includes("Email not confirmed")) {
          throw new Error("يرجى تأكيد بريدك الإلكتروني أولاً");
        }
        throw error;
      }

      if (data.user) {
        router.push("/");
        router.refresh();
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams:
            provider === "google"
              ? {
                  access_type: "offline",
                  prompt: "consent",
                }
              : undefined,
        },
      });

      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "حدث خطأ ما");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-lifta text-center">
            تسجيل الدخول
          </CardTitle>
          {/* <CardDescription>
            أدخل بريدك الإلكتروني وكلمة المرور للدخول
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <button
                    type="button"
                    onClick={onSwitchToForgotPassword}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-darkness text-light font-serif font-bold"
                disabled={isLoading}
              >
                {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              ليس لديك حساب؟{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="underline underline-offset-4"
              >
                إنشاء حساب جديد
              </button>
            </div>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                أو استخدم
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthSignIn("facebook")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
