import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return user ? (
    <div className="flex items-center gap-4">
      مرحباً، {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth?mode=login">تسجيل الدخول</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/auth?mode=signup">إنشاء حساب</Link>
      </Button>
    </div>
  );
}
