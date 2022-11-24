import '@/styles/globals.css'
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/themes/light.css';

import 'react-multi-carousel/lib/styles.css';
import '@sergeymyssak/swipeable-bottom-sheet/lib/min.css';
import Navbar from '@/components/Static/Navbar'
import Footer from '@/components/Static/Footer';
import { GlobalProvider } from '@/context/global';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { DefaultSeo, NextSeo } from 'next-seo';
import seoConfig from '../../seo.config';
import dbioConfig from '../../dbio.config';
import toast, { Toaster } from 'react-hot-toast';
import NextNProgress from '@/libraries/nprogress';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const { action, access_token, next } = router.query;
    const saveToken = async () => {
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        await axios
          .get("/api/hello?access_token=" + access_token, {
            withCredentials: true,
          })
          .then((res) => {
            let data = res.data;
            const hasWindow = typeof window !== "undefined";

            if (data.status === "ok") {
              if (hasWindow) {
                if (window.opener) {
                  window.opener.location.href = next || "/";
                  window.close();
                } else {
                  window.location.href = next || "/";
                }
              } else {
                router.push(next || "/");
              }
            } else {
              if (hasWindow) {
                if (window.opener) {
                  window.location.href =
                    "/api/v1/auth/login?next=" + next || "/";
                } else {
                  window.location.href =
                    "/api/v1/auth/login?next=" + next || "/";
                }
              } else {
                router.push("/api/v1/auth/login?next=" + next || "/");
              }
            }
          });
      }
    };

    const destroyToken = async () => {
      localStorage.removeItem("access_token");
      axios.defaults.headers.common["Authorization"] = ``;
      await axios
        .get("/api/hello?access_token=" + "destroyed", {
          withCredentials: true,
        })
        .then((res) => {
          let data = res.data;
          const hasWindow = typeof window !== "undefined";

          if (hasWindow) {
            if (window.opener) {
              window.opener.location.href = next || "/";
              window.close();
            } else {
              window.location.href = next || "/";
            }
          } else {
            router.push(next || "/");
          }
        });
    };

    if (!action || action === "login") {
      saveToken();
    } else if (action === "logout") {
      destroyToken();
    }
  }, [router, router.query]);


  Date.prototype.format = function (type) {
    try {
      let date = this;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      let millisecond = date.getMilliseconds();

      const pad = (num, size) => {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
      }

      const types = {
        "Y": year,
        "MMMM": new Intl.DateTimeFormat('en-US', { month: 'long' })?.format(date),
        "D": pad(day, 2),
        "h": pad(hour, 2),
        "m": pad(minute, 2),
        "s": pad(second, 2),
        "ms": pad(millisecond, 3),
      }

      return type.split(" ").map((t) => {
        return types[t];
      }).join(" ");
    } catch (e) {
      return this;
    }
  }

  Date.prototype.fromNow = function (type) {
    let date = this;
    let now = new Date();
    let diff = now - date;
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);

    const pad = (num, size) => {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    }

    const types = {
      "s": seconds,
      "m": minutes,
      "h": hours,
      "d": days,
      "M": months,
      "y": years,
    }

    return types[type];
  }

  function replaceValues(title) {
    if (!title) return "Error";
    return title.replace(/\[([^\]]+)\]/g, (match, key) => {
      return router.query?.[key] || match;
    });
  }

  return <>
    <DefaultSeo {...seoConfig} />
    {router.pathname && (
      <NextSeo
        title={replaceValues(dbioConfig.titles?.[router.pathname]?.title) || dbioConfig.titles?.["/"].title}

      />
    )}
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "var(--toast)",
          color: "var(--toast-text)",
        },
      }}
    />
    <NextNProgress />

    <GlobalProvider>
      <main>
        <Navbar />
        <main className="min-h-[67vh]">
          <img src="https://cdn.dbio.me/assets/backwave.png" width="55%" className="absolute top-0 right-0 hidden lg:block z-[-1] opacity-50" />
          <Component {...pageProps} />
        </main>
        <Footer />
      </main>
    </GlobalProvider>
  </>
}

export default MyApp
