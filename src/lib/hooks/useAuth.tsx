import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../components/Auth/authSlice";
import { useMemo } from "react";
//import { cookies } from "next/headers";
//import { auth } from "../auth";
import { useSession } from "next-auth/react";

export const useAuth = async () => {
  const user = useSelector(selectCurrentUser);

  //const cookieStore = await cookies();
  //const authToken = cookieStore.get("authcookie");
  //console.log(authToken);
  //console.log("signIn end");
  /*const session = await useSession();
  console.log(session);
  const user = JSON.stringify({
    user: session!.user,
    token: session!.token,
  });*/

  return useMemo(() => ({ user }), [user]);
};
