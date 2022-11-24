import Button from "@/components/Global/Button";
import MiniCard from "@/components/Global/Cards/Mini";
import RadioGroup from "@/components/Global/RadioGroup";
import { useRouter } from "next/router";
import BottomSheet from "@/components/Global/BottomSheet";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import SheetPages from "@/components/Global/SheetContentablePage";
import Dropdown, { Item } from "@/components/Global/Dropdown";
import Dropinput from "@/components/Global/Dropinput";
import InfiniteScrollComponent from "@/components/Global/InfiniteScroll";
import { request } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import { removeQuery, parseUrl, addQuery, resetQuery, appendQuery, removeQueryValue } from "@/utils/queryManager";
import Link from "next/link";
import { Checkbox } from "@material-tailwind/react";
import { CheckboxGroup } from "@/components/Global/Input";

export default function Home({ sortings, roles, skills, languages }) {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const [active, setActive] = useState(0);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (router.query.sort) {
            let index = sortings.findIndex((item) => item.value === router.query.sort);
            if (index !== -1) {
                setActive(index);
            } else {
                const index = sortings?.findIndex((item) => item.default);
                setActive(index);
            }
        } else {
            const index = sortings?.findIndex((item) => item.default);
            setActive(index);
        }

        if (router.query.language) {
            let find = languages.find((item) => item === router.query.language);
            if (find) {
                const index = languages.findIndex((item) => item === router.query.language);
                setLanguage(index);
            } else {
                setLanguage(null);
            }
        } else {
            setLanguage(null);
        }
    }, [router.query]);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="max-w-7xl w-full py-24 ">
                    <div className="lg:grid grid-cols-1 lg:grid-cols-12 gap-6 px-10 2xl:px-0">
                        <div className="col-span-3 2xl:col-span-2">
                            <div className="flex items-center justify-between border-b border-zinc-500/5 pb-4">
                                <h1 className="text-2xl text-black dark:text-white lg:pb-2 font-bold flex items-center gap-2">
                                    Users
                                </h1>
                                <Link href={resetQuery(router)}>
                                    <a className="hidden lg:block text-primary text-sm font-light hover:underline">Reset all filters</a>
                                </Link>
                                {width < 1024 && (
                                    <BottomSheet
                                        trigger={<>
                                            <Button variant="ghost" color="dbio" className="lg:hidden flex items-center gap-2">
                                                <i className="fas fa-cogs" />
                                                Settings
                                            </Button>
                                        </>}
                                    >
                                        <SheetPages
                                            pages={[
                                                {
                                                    id: "1",
                                                    icon: "cogs",
                                                    title: "Sort",
                                                    container: "px-4 pt-4",
                                                    content: <RadioGroup items={sortings} value={active} onChange={e => {
                                                        router.push(addQuery(router, { sort: e.label.replace(" ", "-").toLowerCase() }));
                                                        setActive(e.value)
                                                    }} />,
                                                    isShow: true
                                                },
                                                {
                                                    id: "2",
                                                    icon: "language",
                                                    title: "Language",
                                                    container: "px-4 pt-4",
                                                    content: <RadioGroup items={languages.map(el => { return { label: el }; })} value={language} onChange={e => {
                                                        router.push(addQuery(router, { language: e.label }));
                                                        setLanguage(e.value)
                                                    }} />,
                                                    isShow: true
                                                },
                                                {
                                                    id: "3",
                                                    icon: "filter",
                                                    title: "Skills",
                                                    container: "px-4 pt-4",
                                                    content: <>
                                                        <CheckboxGroup
                                                            items={skills.map(el => {
                                                                return { label: el.name, value: el.name };
                                                            })}
                                                            value={router.query.skills ? router.query.skills.split(",") : []}
                                                            query={"skills"}
                                                        />
                                                    </>,
                                                    isShow: true
                                                },
                                                {
                                                    id: "4",
                                                    icon: "user-tag",
                                                    title: "Roles",
                                                    container: "px-4 pt-4",
                                                    content: <>
                                                        <CheckboxGroup
                                                            items={roles.map(el => {
                                                                return { label: el.name, value: el.name };
                                                            })}
                                                            value={router.query.roles ? router.query.roles.split(",") : []}
                                                            query={"roles"}
                                                        />
                                                    </>,
                                                    isShow: true
                                                },
                                            ]}
                                        />
                                    </BottomSheet>
                                )}
                            </div>
                            <div className="hidden lg:flex flex-col gap-4 mt-4 space-y-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-lg text-black dark:text-white pb-2 font-bold">
                                            Sorting
                                        </h1>
                                        <Link href={removeQuery(router, "sort")}>
                                            <a className="text-primary text-sm font-light hover:underline">Reset</a>
                                        </Link>
                                    </div>
                                    <Dropdown label={<>
                                        <span className="text-sm text-black dark:text-white flex items-center gap-2">
                                            <i className={`${sortings?.[active]?.icon?.value} ${sortings?.[active]?.icon?.label} mr-2`} />
                                            {sortings?.[active]?.label}
                                        </span>
                                    </>}>
                                        {sortings?.filter(e => sortings?.[active]?.label !== e.label).map((item, i) => (
                                            <Item
                                                key={i}
                                                onClick={() => {
                                                    router.push(addQuery(router, { sort: item.label.replace(" ", "-").toLowerCase() }));
                                                    const index = sortings.findIndex((a) => a.value === item.value);
                                                    setActive(index)
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <i className={`${item?.icon?.value} ${item?.icon?.label} mr-2`} />
                                                {item.label}
                                            </Item>
                                        ))}
                                    </Dropdown>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-lg text-black dark:text-white pb-2 font-bold">
                                            Language
                                        </h1>
                                        <Link href={removeQuery(router, "language")}>
                                            <a className="text-primary text-sm font-light hover:underline">Reset</a>
                                        </Link>
                                    </div>
                                    <Dropdown label={<>
                                        {language ? <span className="text-sm text-black dark:text-white flex items-center gap-2">
                                            <i className="fas fa-globe mr-2" />
                                            {languages?.[language] || "All"}
                                        </span> : <span className="text-sm text-black dark:text-white flex items-center gap-2">
                                            <i className="fas fa-globe mr-2" />
                                            Any
                                        </span>}
                                    </>}>
                                        {languages.filter(el => el !== language).map((item, i) => (
                                            <Item
                                                key={i}
                                                onClick={() => {
                                                    router.push(addQuery(router, { language: item }));
                                                    setLanguage(languages.findIndex((a) => a === item) || 0)
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <i className={`fa fa-globe mr-2`} />
                                                {item}
                                            </Item>
                                        ))}
                                    </Dropdown>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-lg text-black dark:text-white pb-2 font-bold">
                                            Roles
                                        </h1>
                                        <Link href={removeQuery(router, "roles")}>
                                            <a className="text-primary text-sm font-light hover:underline">Reset</a>
                                        </Link>
                                    </div>
                                    <Dropinput
                                        placeholder="Search for roles"
                                        icon="fal fa-search"
                                        onSelect={e => router.push(appendQuery(router, "roles", e.label))}
                                        items={roles.filter(e => !router.query?.roles?.split(',').includes(e.name)).map((item, i) => ({ label: item.name, value: item.slug }))}
                                    />
                                    {router.query.roles && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {router.query.roles?.split(",").map((item, i) => (
                                                <div key={i} className="flex items-center gap-0.5">
                                                    <div className="px-4 py-2 bg-zinc-500/5 rounded-l-lg">
                                                        <span className="text-sm text-black dark:text-white">
                                                            {item}
                                                        </span>
                                                    </div>
                                                    <div onClick={() => router.push(removeQueryValue(router, "roles", item))} className="p-2 px-4 hover:bg-zinc-500/10 bg-zinc-500/5 rounded-r-lg transition-all duration-200 cursor-pointer">
                                                        <span className="text-sm text-black dark:text-white">
                                                            <i className="fal fa-times" />
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-lg text-black dark:text-white pb-2 font-bold">
                                            Skills
                                        </h1>
                                        <Link href={removeQuery(router, "skills")}>
                                            <a className="text-primary text-sm font-light hover:underline">Reset</a>
                                        </Link>
                                    </div>
                                    <Dropinput
                                        placeholder="Search for skills"
                                        icon="fal fa-search"
                                        onSelect={e => router.push(appendQuery(router, "skills", e.label))}
                                        items={skills.filter(e => !router.query?.skills?.split(',').includes(e.name)).map((item, i) => ({ label: item.name, value: item.slug }))}
                                    />

                                    {router.query.skills && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {router.query.skills?.split(",").map((item, i) => (
                                                <div key={i} className="flex items-center gap-0.5">
                                                    <div className="px-4 py-2 bg-zinc-500/5 rounded-l-lg">
                                                        <span className="text-sm text-black dark:text-white">
                                                            {item}
                                                        </span>
                                                    </div>
                                                    <div onClick={() => router.push(removeQueryValue(router, "skills", item))} className="p-2 px-4 hover:bg-zinc-500/10 bg-zinc-500/5 rounded-r-lg transition-all duration-200 cursor-pointer">
                                                        <span className="text-sm text-black dark:text-white">
                                                            <i className="fal fa-times" />
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <InfiniteScrollComponent
                            url={parseUrl("/entities?page=%s&limit=9", router.query)}
                            dataPath={["data", "users"]}
                            container="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full"
                            upperContainer="col-span-9 2xl:col-span-10 w-full"
                            preRenderCount={9}
                            preRender={(item, i) => (
                                <MiniCard key={i} isSkeleton />
                            )}
                            itemsCount={12}
                            render={(item, i) => (
                                <MiniCard
                                    key={i}
                                    image={item.avatar}
                                    url={item.url}
                                    username={item.discord.username}
                                    isLiked={item.isLiked}
                                    banner={item.banner}
                                    about={item.about}
                                    isVerified={item.isVerified}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const languages = await request('/languages', "GET", null, null);
        const roles = await request('/roles', "GET", null, null);
        const skills = await request('/skills', "GET", null, null);
        const sortings = await request('/sort', "GET", null, null);

        return {
            props: {
                languages: languages?.data || [],
                roles: roles?.data || [],
                skills: skills?.data || [],
                sortings: sortings?.data || [],
            }
        }
    } catch (e) {
        return {
            props: {
                languages: [],
                roles: [],
                skills: [],
                sortings: [],
            }
        }
    }
}