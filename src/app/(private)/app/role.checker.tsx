"use client";

import { useUser } from "@/app/hooks/use-user";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const RoleChecker = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return;

    const roleRoutes = {
      admin: "/app/admin/dashboard",
      faculty: "/app/faculty",
      student: "/app/student",
    };

    if (user.user_role in roleRoutes) {
      const targetRoute = roleRoutes[user.user_role as keyof typeof roleRoutes];
      if (targetRoute && !pathname.startsWith(targetRoute)) {
        router.replace(targetRoute);
      }
    }
  }, [user, pathname]);
  return <>{children}</>;
};

export default RoleChecker;
