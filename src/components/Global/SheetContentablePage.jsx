import { Transition } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export default function SheetPages({ title, isMenuInner = false, animation = true, pages }) {
    let [activePage, setActive] = useState(null);
    let [preActivePage, setPreActivePage] = useState(null);

    const setActivePage = state => {
        setPreActivePage(activePage);
        setActive(state);
    }

    return (
        <div className={`flex flex-col items-start justify-start ${!isMenuInner && 'min-h-[80vh]'} gap-1`}>
            <Transition appear show={true} as={Fragment}>
                <Transition.Child as="div" className="w-full">
                    {activePage === null && (
                        <Transition
                            appear
                            as={Fragment}
                            show={activePage !== null ? false : true}
                        >
                            <Transition.Child
                                as="div"
                                enter={animation ? "transition ease-out duration-300 transform" : (preActivePage === null ? "" : "transition ease-out duration-300 transform")}
                                enterFrom={animation ? "opacity-0 translate-y-6" : (preActivePage === null ? "" : "opacity-0 translate-y-6")}
                                enterTo={animation ? "opacity-100 translate-y-0" : (preActivePage === null ? "" : "opacity-100 translate-y-0")}
                                leave={animation ? "transition-all duration-200" : (preActivePage === null ? "" : "transition-all duration-200")}
                                leaveFrom={animation ? "opacity-100 translate-y-0" : (preActivePage === null ? "" : "opacity-100 translate-y-0")}
                                leaveTo={animation ? "opacity-0 translate-y-6" : (preActivePage === null ? "" : "opacity-0 translate-y-6")}
                                className="w-full"
                            >
                                <div className="flex flex-col items-start justify-start w-full h-full rounded-lg">
                                    <h3 className="text-lg font-medium">
                                        {title}
                                    </h3>
                                    <div className={`flex flex-col items-start justify-start w-full gap-4 ${!isMenuInner && 'mt-4'}`}>
                                        {pages.filter(p => p.isShow).map((page, i) => (
                                            page.id !== "_blank" ? (
                                                page.isLink ? (
                                                    <Link href={page.link} key={i}>
                                                        <div
                                                            className={classNames("flex items-center justify-between p-2 pr-4 rounded-lg hover:bg-gray-600/5 w-full transition-all duration-200 cursor-pointer", page?.className)}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {typeof page.icon === "string" ? (
                                                                    <div className="bg-zinc-500/5 dark:bg-slate-900/10 rounded-full w-10 h-10 flex items-center justify-center">
                                                                        <i className={`fa fa-${page.icon} text-zinc-500`} />
                                                                    </div>
                                                                ) : (
                                                                    <div className="bg-zinc-500/5 dark:bg-slate-900/10 rounded-full w-10 h-10 flex items-center justify-center">
                                                                        {page.icon}
                                                                    </div>
                                                                )}
                                                                <a href="#" className="font-thin ml-2">{page.title}</a>
                                                            </div>
                                                            <i className="fal fa-chevron-right text-zinc-500" />
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div
                                                        onClick={() => {
                                                            setActivePage(i);
                                                        }}
                                                        className={classNames("flex items-center justify-between p-2 pr-4 rounded-lg hover:bg-gray-600/5 w-full transition-all duration-200 cursor-pointer", page?.className)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {typeof page.icon === "string" ? (
                                                                <div className="bg-zinc-500/5 dark:bg-slate-900/10 rounded-full w-10 h-10 flex items-center justify-center">
                                                                    <i className={`fa fa-${page.icon} text-zinc-500`} />
                                                                </div>
                                                            ) : (
                                                                <div className="bg-zinc-500/5 dark:bg-slate-900/10 rounded-full w-10 h-10 flex items-center justify-center">
                                                                    {page.icon}
                                                                </div>
                                                            )}
                                                            <a href="#" className="font-thin ml-2">{page.title}</a>
                                                        </div>
                                                        <i className="fal fa-chevron-right text-zinc-500" />
                                                    </div>
                                                )
                                            ) : (
                                                <div className="w-full h-px bg-zinc-500/5 rounded-full my-4" />
                                            )
                                        ))}
                                    </div>
                                </div>
                            </Transition.Child>
                        </Transition>
                    )}
                    {activePage !== null && (
                        <Transition
                            appear
                            as={Fragment}
                            show={activePage !== null ? true : false}
                        >
                            <Transition.Child
                                as="div"
                                enter="transition-all duration-200"
                                enterFrom="opacity-0 -translate-y-6"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition-all duration-200"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-6"
                                className="w-full"
                            >
                                <div className="w-full">
                                    {(
                                        <div className="mx-2 flex items-center gap-2 border-b border-zinc-500/5 pb-2">
                                            <div onClick={() => {
                                                setActivePage(null);
                                            }} className="w-10 h-10 rounded-lg flex justify-center items-center text-black dark:text-white bg-zinc-500/5 dark:bg-slate-900/10 hover:bg-gray-500/10 dark:hover:bg-slate-900/20 transition-all duration-200 cursor-pointer">
                                                <i className="fal fa-arrow-left" />
                                            </div>
                                            <p className="text-lg font-medium text-black dark:text-white">{pages.filter(p => p.isShow)?.[activePage]?.title}</p>
                                        </div>
                                    )}

                                    <div className={(pages.filter(p => p.isShow)?.[activePage]?.container || "pt-4 px-2")}>
                                        {pages?.[activePage]?.content}
                                    </div>
                                </div>
                            </Transition.Child>
                        </Transition>
                    )}
                </Transition.Child>
            </Transition>
        </div>
    );
}