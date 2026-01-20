import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function EmailConfirmation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">شكراً لتسجيلك!</CardTitle>
        <CardDescription>تفقد بريدك الإلكتروني للتأكيد</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          لقد قمت بالتسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك
          قبل تسجيل الدخول.
        </p>
      </CardContent>
    </Card>
  );
}
