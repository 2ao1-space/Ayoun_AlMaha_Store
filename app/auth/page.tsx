import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthContainer } from "./components/auth-container";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: { mode?: string; message?: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-0 bg-light">
      <div className="w-full max-w-md bg-white">
        <AuthContainer
          initialMode={searchParams.mode || "login"}
          message={searchParams.message}
        />
      </div>
    </div>
  );
}
