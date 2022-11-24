import BottomSheet from "@/components/Global/BottomSheet";
import Button from "@/components/Global/Button";
import { useTheme } from "@/context/theme";
import { useUser } from "@/context/user";
import OpenWindow from "@/libraries/openWindow";
import Link from "next/link";
import { useRouter } from "next/router";
import SheetItems from "@/components/Global/SheetContentablePage";
import RadioGroup from "@/components/Global/RadioGroup";
import Dropdown, { Item } from "@/components/Global/Dropdown";
import AnswerModal from "../Global/AnswerModal";

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();

  let items = [
    { label: "Home", icon: "fa fa-home", link: "/", external: false },
    { label: "Explore", icon: "fa fa-compass", link: "/explore", external: false },
    { label: "Team", icon: "fa fa-users", link: "/team", external: false },
  ];

  const { toggleTheme, isTheme, setTheme } = useTheme();

  return (
    <>
      <div className="w-full flex justify-center px-10  3xl:px-0">
        <nav className="static top-0 grid grid-cols-12 justify-between items-center max-w-7xl w-full py-6">
          <div className="col-span-8 flex justify-start gap-4 items-center">
            <Link href="/">
              <div className="cursor-pointer col-span-2 flex items-center mr-6">
                <p className="pointer-events-none text-black dark:text-white font-semibold text-2xl">
                  dbio<span className="text-primary">.</span>me
                </p>
              </div>
            </Link>
            <div className="hidden relative lg:flex items-center gap-4 group">
              {items.map((item, index) => (
                <Link href={item.link} key={index}>
                  <a
                    className={`relative text-slate-600 font-medium dark:text-zinc-400 hover:text-black hover:dark:text-white transition-all duration-200`}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="pb-2 col-span-4 lg:hidden flex justify-end">
            <BottomSheet
              trigger={<>
                <button
                  className="rounded-full w-12 h-12 px-0 border-2 border-white/0 hover:bg-gray-500/5 hover:border-primary/90 transition-all duration-200"
                >
                  <i className={`fa fa-bars`} />
                </button>
              </>}
            >
              <SheetItems
                pages={[...items.map((item, i) => {
                  return {
                    id: i + 1,
                    icon: item.icon,
                    title: item.label,
                    isLink: true,
                    link: item.link,
                    isShow: true
                  };
                }), {
                  id: "1",
                  icon: "sun",
                  title: "Theme",
                  container: "px-4 pt-4",
                  content: <>
                    <RadioGroup
                      items={[
                        {
                          label: "Light",
                          value: "light"
                        },
                        {
                          label: "Dark",
                          value: "dark"
                        }
                      ]}
                      value={isTheme === "dark" ? 1 : 0}
                      onChange={e => setTheme(e.label.toLowerCase())}
                    />
                  </>,
                  isLink: false,
                  isShow: true
                },
                {
                  id: "1",
                  icon: <img src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}`} className="w-8 h-8 rounded-full" />,
                  title: user?.username,
                  container: "pt-4",
                  content: <>
                    <SheetItems
                      animation={false}
                      isMenuInner={true}
                      pages={[
                        {
                          id: "1",
                          icon: "user",
                          title: "Profile",
                          isLink: true,
                          link: "/" + user?.appId,
                          isShow: user?.appId !== null ? true : false
                        },
                        {
                          id: "2",
                          icon: "cog",
                          title: "Settings",
                          isLink: true,
                          link: "/" + user?.appId + "/edit",
                          isShow: user?.appId !== null ? true : false
                        },
                        {
                          id: "2",
                          icon: "plus",
                          title: "Create",
                          isLink: true,
                          link: "/submit",
                          isShow: user?.appId === null ? true : false
                        },
                        {
                          id: "4",
                          icon: "sign-out-alt",
                          title: "Logout",
                          isLink: true,
                          link: "/api/v1/auth/logout",
                          isShow: true
                        }
                      ]}
                    />
                  </>,
                  isLink: false,
                  isShow: user ? true : false
                },
                {
                  id: "1",
                  icon: "sign-in-alt",
                  title: "Login",
                  isLink: true,
                  link: "/api/v1/auth/login",
                  isShow: user ? false : true
                }
                ]}
              />
            </BottomSheet>

          </div>

          <div className="pb-2 col-span-4 space-x-2 hidden lg:flex justify-end">
            {user ? (
              <>
                <Dropdown
                  trigger={<button className="hover:bg-gray-400/10 rounded-lg px-3 py-2 flex items-center gap-2 transition-all duration-200">
                    <img src={`https://cdn.discordapp.com/avatars/${user?.id}/${user.avatar}`} className="w-8 h-8 rounded-full" />
                    <h1 className="font-medium text-black dark:text-white">{user?.username}<span className="text-black/50 dark:text-white/50 font-light isFontFeature">#{String(user?.discriminator)}</span></h1>
                  </button>}
                >

                  {user?.appId ? (
                    <>
                      <Link href={`/${user?.appId}`}>
                        <a>
                          <Item className="flex items-center gap-2">
                            <i className="fa fa-user" />
                            <span>Profile</span>
                          </Item>
                        </a>
                      </Link>
                      <Link href={`/${user?.appId}/edit`}>
                        <a>
                          <Item className="flex items-center gap-2">
                            <i className="fa fa-cog" />
                            <span>Settings</span>
                          </Item>
                        </a>
                      </Link>
                    </>
                  ) : (
                    <Link href={`/submit`}>
                      <a>
                        <Item className="flex items-center gap-2">
                          <i className="fa fa-plus" />
                          <span>Create</span>
                        </Item>
                      </a>
                    </Link>
                  )}

                  <Link href={`/api/v1/auth/logout`}>
                    <a>
                      <Item className="flex items-center gap-2">
                        <i className="fa fa-sign-out-alt" />
                        <span>Logout</span>
                      </Item>
                    </a>
                  </Link>
                </Dropdown>
              </>
            ) : (
              <Button
                className="rounded-xl px-7"
                onClick={() => {
                  OpenWindow(window, "/api/v1/auth/login?next=" + router.asPath, 600, 900);
                }}
              >
                <i className="fal fa-sign-in mr-2"></i> Login
              </Button>
            )}

            <button
              onClick={toggleTheme}
              className="rounded-full w-12 h-12 px-0 hover:bg-gray-500/10 transition-all duration-200"
            >
              <i className={`fa fa-${isTheme === "dark" ? "moon" : "sun"}`} />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
