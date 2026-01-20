"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  className?: string;
}

export function ForgotPasswordForm({
  onBackToLogin,
  className,
  ...props
}: ForgotPasswordFormProps & React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth?mode=update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">تفقد بريدك الإلكتروني</CardTitle>
            <CardDescription>
              تم إرسال تعليمات إعادة تعيين كلمة المرور
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              إذا قمت بالتسجيل باستخدام بريدك الإلكتروني وكلمة المرور، ستتلقى
              رسالة لإعادة تعيين كلمة المرور.
            </p>
            <Button onClick={onBackToLogin} className="w-full">
              العودة لتسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">إعادة تعيين كلمة المرور</CardTitle>
            <CardDescription>
              أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
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

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                لديك حساب؟{" "}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="underline underline-offset-4"
                >
                  تسجيل الدخول
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
