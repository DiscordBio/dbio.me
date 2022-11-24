import { useContext, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "@/hooks/useSWR";
import axios from "axios";
import dbioConfig from "../../dbio.config";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  let router = useRouter();

  const { data } = useSWR("/api/v1/auth/@me");
  const user = data?.data;

  const logout = () => {
    axios.get("/api/v1/auth/logout").then(() => {
      router.reload();
    });
  };

  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dbioConfig.authRequired.includes(router.pathname)) {
      setIsLoading(true);
      if (data) {
        if (!user) {
          router.push("/api/v1/auth/login?next=" + router.pathname);
        } else {
          setIsLoading(false);
        }
      }
    }
  }, [router, router.pathname, user, data]);

  return (
    <UserContext.Provider value={{ user, logout }}>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="pointer-events-none text-black dark:text-white font-semibold text-2xl animate-pulse">
            dbio<span className="text-primary">.</span>me
          </p>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
