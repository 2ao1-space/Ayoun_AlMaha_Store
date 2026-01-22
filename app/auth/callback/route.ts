import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          `${requestUrl.origin}/auth/error?error=${encodeURIComponent(error.message)}`,
        );
      }

      const redirectUrl = new URL(next, requestUrl.origin);
      return NextResponse.redirect(redirectUrl.toString());
    } catch (error) {
      console.error("Unexpected error in auth callback:", error);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/error?error=Unexpected+error+occurred`,
      );
    }
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/auth?mode=login&message=${encodeURIComponent("حدث خطأ في المصادقة")}`,
  );
}
