import React, { useEffect, useState } from "react";
import Notfound from "@/pages/notfound";
import authService from "@/services/auth.service";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
const RouteProtector = ({ children, only }: any) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (authService.isLoggedIn() ) {
          setLoading(false)
      } else {
          await router.push("/auth/login")
      }
    }) ()
  }, [])

  if (loading) return <div/>
  if (!only.includes(jwtDecode<any>(authService.getDecToken() as string).user.role.role)) return <Notfound />

  return children
}
export default RouteProtector