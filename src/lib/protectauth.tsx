import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";

export const ProtectedAdminRoute = ({ children }) => {
  const router: NextRouter = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/auth/signin"); // redirect to the log in page
    },
  });
  if (status === "loading") {
    return <span>Loading...</span>;
  }

  return children;
};
