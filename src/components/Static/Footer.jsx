import Button from "@/components/Global/Button";
import Input from "@/components/Global/Input";
import Link from "next/link";
import { useRouter } from "next/router"
import { useState } from "react";

export default function Footer() {
    const router = useRouter();

    let items = [
        { label: "Home", icon: "fa fa-home", link: "/", external: false },
        { label: "Explore", icon: "fa fa-home", link: "/explore", external: false },
        { label: "Team", icon: "fa fa-home", link: "/team", external: false },
    ];

    return <>
        <div className="w-full flex justify-center px-10 lg:px-12">
            <footer className="max-w-7xl w-full py-6 pt-24">
                <footer className="rounded-lg md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Link href="/">
                            <div className="cursor-pointer col-span-2 flex items-center mr-6">
                                <p className="pointer-events-none text-black dark:text-white font-semibold text-2xl">
                                    dbio<span className="text-primary">.</span>me
                                </p>
                            </div>
                        </Link>
                        <ul className="flex sm:flex-row flex-col mt-6 sm:mt-0 flex-wrap lg:items-center mb-6 gap-4 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                            {items.map((item, index) => (
                                <Link href={item.link} key={index}>
                                    <a
                                        className={`relative text-slate-600 font-medium dark:text-zinc-400 hover:text-black hover:dark:text-white transition-all duration-200`}
                                    >
                                        {item.label}
                                    </a>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-4 flex flex-col lg:flex-row justify-between items-center pt-6 border-t border-zinc-500/5 mt-6">
                        <p className="text-slate-600 dark:text-zinc-400 font-medium">
                            &copy; {new Date().getFullYear()} dbio.me. All rights reserved.
                        </p>
                        <p className="text-slate-600 dark:text-zinc-400 font-medium">
                            Powered with <span className="text-red-500">❤</span> by <a href="https://nytern.com" target="_blank" className="text-primary">Nytern</a>
                        </p>
                        
                    </div>
                </footer>

            </footer>
        </div>
    </>
}