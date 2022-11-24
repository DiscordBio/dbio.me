import { Menu, Switch, Transition } from "@headlessui/react";
import { Fragment, useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { Item } from "./Dropdown";

const Dropinput = (props) => {
    let inputId = Math.random().toString(36).substring(2);
    let { placeholder, icon, defaultValue, items, onSelect } = props;

    let [dropdown, setDropdown] = useState(false);
    let [search, setSearch] = useState();
    let dropdownRef = useRef(null);
    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setDropdown(!dropdown);
            }
        };
        if (dropdown) {
            window.addEventListener('click', pageClickEvent);
        }
        return () => {
            window.removeEventListener('click', pageClickEvent);
        }
    }, [dropdown]);

    function Search(e) {
        e.preventDefault();
        let q = e?.target?.value?.trim();
        if (q.length > 0) return setSearch(q);
        return setSearch();
    }
    return (
        <>
            <Menu as="div" ref={dropdownRef} className="relative w-full">
                <div onClick={() => {
                    if (!dropdown) {
                        setDropdown(true);
                        document?.getElementById('input-' + inputId)?.focus();
                    }
                }} className={`border border-transparent ${dropdown && '!border-primary'}  w-full flex justify-between items-center rounded-md transition-all duration-200 font-medium bg-zinc-500/5 hover:bg-zinc-500/10 px-4 py-3 gap-4 text-sm`}>
                    <i className={`text-primary transition-color duration-200 ${icon}`} />
                    <input id={`input-${inputId}`} onChange={Search} value={defaultValue?.label} placeholder={placeholder} className={`${!dropdown && 'opacity-50 cursor-pointer'} bg-transparent w-full h-full transition-opacity duration-200 outline-none`} />
                </div>
                <Transition
                    as={Fragment}
                    show={dropdown}
                    enter="transition-all duration-300"
                    enterFrom="opacity-0 translate-y-6"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition-all duration-300"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-6"
                >

                    <div style={{ zIndex: 200 }} className="scrollbox p-2 bg-light dark:bg-dark max-h-[20rem] overflow-auto border border-slate-100 dark:border-zinc-900/20 absolute left-0 z-10 mt-2 w-full origin-top rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {items?.filter(a => {
                            if (search?.trim()?.length > 0) {
                                if (a?.label?.toLowerCase()?.includes(search?.toLowerCase())) return true;
                                return false;
                            } else {
                                return true;
                            }
                        }).length === 0 && (
                                <p className="text-sm text-black dark:text-white text-center py-4">No results found.</p>
                            )}
                        {items?.filter(a => {
                            if (search?.trim()?.length > 0) {
                                if (a?.label?.toLowerCase()?.includes(search?.toLowerCase())) return true;
                                return false;
                            } else {
                                return true;
                            }
                        })?.map((item, index) => (
                            <Item
                                key={index}
                                onClick={() => {
                                    onSelect(item)
                                    setDropdown(false);
                                }}
                                className="flex items-center gap-2"
                            >
                                <i className={`fal fa-${icon} text-sm opacity-50`} />{item.label}
                            </Item>

                        ))}
                    </div>
                </Transition>
            </Menu>
        </>
    );
};


export default Dropinput;