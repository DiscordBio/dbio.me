import { PageProvider } from "@/context/page";
import { ThemeProvider } from "@/context/theme";
import { UserProvider } from "@/context/user";
import { LanguageProvider } from "@/context/language";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Transition } from "@headlessui/react";
import Button from "@/components/Global/Button";

export const GlobalProvider = ({ children }) => {
  let [isAlive, setIsAlive] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api').then(() => {
      setIsAlive(true);
      document.documentElement.style.overflowY = 'auto';
    }).catch(() => {
      setIsAlive(false);
      document.documentElement.style.overflowY = 'hidden';
      if (router.asPath !== '/') {
        router.push('/');
      }
    });
  }, [router.asPath]);

  return (
    <>
      <Transition show={!isAlive} enter="transition-opacity duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div className="fixed inset-0 z-[999999] flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-50 blur-lg z-[8000]" />
          <div className="z-[999999] flex flex-col items-center justify-center w-full px-6 py-12 space-y-4 bg-primary">
            <div className="flex items-center justify-center gap-4">
              <i className="fas fa-exclamation-triangle text-5xl" />
              <p className="text-xl font-semibold">We are currently down for maintenance. Please try again later.</p>
            </div>
            <button onClick={() => open('https://dbio.me/discord', '_blank')} className="px-4 py-2 text-lg font-semibold bg-black/20 hover:bg-black/50 transition-all duration-200 rounded-md">
              <i className="fab fa-discord mr-2" />
              Join our Discord
            </button>
          </div>
        </div>
      </Transition>

      <UserProvider>
        <PageProvider>
          <ThemeProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </PageProvider>
      </UserProvider>
    </>
  );
};
