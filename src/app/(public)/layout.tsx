import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if the user is already logged in
  const token = cookies().get("access_token")?.value;
  if (token) {
    redirect("/app/admin/dashboard", RedirectType.replace);
  }

  return <>{children}</>;
}
