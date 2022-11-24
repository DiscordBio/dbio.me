import { memo, useCallback, useEffect, useRef, useState } from "react";
import { RadioGroup as HRadioGroup, Transition } from "@headlessui/react";
import Button from "./Button";
import { IconButton } from "@material-tailwind/react";
import { appendQuery, removeQuery, removeQueryValue } from "@/utils/queryManager";
import { useRouter } from "next/router";

function Input(props) {
    const { className, startsWith, wrapper, rows, wrapperClass, leftContent, rightContent, onChange: onChangeCustom, value: IValue, type, ...rest } = props;
    let [value, setValue] = useState("");
    let [focused, setFocused] = useState(false);
    let [IType, setType] = useState(type);

    useEffect(() => {
        setValue(IValue);
    }, [IValue]);

    const Component = wrapper || "input";

    return <div className={`relative flex ${wrapper === "textarea" ? "items-start" : "items-center"} rounded-lg w-full bg-light dark:bg-dark peer transition-all ease-in-out duration-200 placeholder-white/0 outline-none border border-primary/5 hover:border-primary/20 ${focused && '!border-primary/100'} ${className}`}>
        {leftContent && <div className={`flex items-center justify-center h-full pl-4 ${wrapper === "textarea" && 'pt-3.5'}`}>
            {leftContent}
        </div>}
        <Component
            {...rest}
            type={(type !== "password" ? type : IType)}
            className={`${type === "password" && 'pr-14'} py-2 ${leftContent ? 'pl-1.5' : 'pl-5'} ${rightContent ? 'pr-1.5' : 'pr-5'} w-full h-full !outline-none focus:ring-0 bg-transparent !border-none focus:outline-none focus:border-none ${wrapperClass}`}
            rows={rows || 4}
            onChange={useCallback(e => {
                setValue(e.target.value);
                onChangeCustom && onChangeCustom(e);
            }, [onChangeCustom])}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
        />
        {type === "password" && (
            <div onClick={() => setType(IType === "password" ? "text" : "password")} className="absolute right-0 top-0 h-full">
                <div className="border border-gray-500/5 hover:border-gray-500/20 active:border-gray-500/30 transition-all duration-200 cursor-pointer rounded-r-lg h-full flex items-center justify-center px-4">
                    {IType === "password" ? (
                        <i className="fal fa-eye" />
                    ) : (
                        <i className="fal fa-eye-slash" />
                    )}
                </div>
            </div>
        )}
        {rightContent && <div className={`flex items-center justify-center h-full`}>
            {rightContent}
        </div>}
    </div>
}

export default memo(Input);

export const CheckboxGroup = memo(function Radio(props) {
    const { className, label, items, query, value, onChange, ...rest } = props;
    const router = useRouter();

    return <>
        <div className="space-y-2">
            {items.map((item, index) => {
                let [checked, setChecked] = useState(value.includes(item.value));

                useEffect(() => {
                    setChecked(value.includes(item.value));
                }, [value]);
                return <div
                    key={index}
                    className="flex items-center cursor-pointer group"
                    onClick={() => {
                        if (!checked) {
                            router.push(appendQuery(router, query, item.value));
                        } else {
                            router.push(removeQueryValue(router, query, item.value));
                        }
                    }}
                >
                    <div className="-ml-2 mr-3 w-10 h-10 group-hover:bg-primary/10 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <div className={`relative w-6 h-6 border-2 ${checked ? 'border-primary' : 'border-gray-600'} group-hover:border-primary transition-all duration-200 rounded-lg flex flex-shrink-0 justify-center items-center`}>
                            
                            <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out bg-primary ${checked ? 'opacity-100' : 'opacity-0'}`}>
                                <i className="fa fa-check text-light dark:text-dark text-lg" />
                            </div>
                            
                        </div>
                    </div>
                    <p className={`font-medium ${checked ? 'text-black dark:text-white' : 'text-gray-600'}`}>{item.label}</p>
                </div>
            })}
        </div>
    </>;
});

export const RadioGroup = memo(function Radio(props) {
    const { className, label, items, value, onChange, ...rest } = props;
    return <HRadioGroup onChange={onChange} value={value}>
        <div className="space-y-2">
            {items.map((_, i) => (
                <HRadioGroup.Option
                    key={i}
                    value={i}
                    className={"relative flex cursor-pointer rounded-lg focus:outline-none group"}
                >
                    {({ active, checked }) => (
                        <>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                    <div className="-ml-2 mr-3 w-10 h-10 group-hover:bg-primary/10 transition-all duration-200 rounded-full flex items-center justify-center">
                                        <div className={`w-6 h-6 border-2 ${checked ? 'border-primary' : 'border-gray-600'} group-hover:border-primary transition-all duration-200 rounded-full flex flex-shrink-0 justify-center items-center`}>
                                            <div className={`w-4 h-4 rounded-full transition-all duration-200 ease-in-out ${checked ? 'bg-primary' : 'bg-transparent'}`} />
                                        </div>
                                    </div>

                                    <div className="text-sm">
                                        <HRadioGroup.Label as="p" className={`font-medium ${checked ? 'text-black dark:text-white' : 'text-gray-600'}`}>
                                            {_?.label || i}
                                        </HRadioGroup.Label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </HRadioGroup.Option>
            ))}
        </div>
    </HRadioGroup>;
});

export const MaterialInput = memo(function MaterialInput(props) {
    const { className, startsWith, wrapper, rows, wrapperClass, type, leftContent, rightContent, placeholder, required, isError = null, ...rest } = props;
    const Component = wrapper || "input";
    const randomId = Math.random().toString(36).substring(7);

    return <>
        <div className="relative w-full" id="form">
            <div className="relative mt-1 rounded-md shadow-sm">
                <div className="relative flex">
                    <Component
                        id={randomId}
                        autoComplete="off"
                        name={randomId}
                        className="rounded-lg w-full bg-light dark:bg-dark peer !py-7 pl-[1.1rem] !pb-2 transition-all ease-in-out duration-200 placeholder-white/0 outline-none border border-primary/5 hover:border-primary/20 focus:border-primary/100 resize-none"
                        placeholder=" "
                        rows={rows || 4}
                        required={required}
                        type={type}
                        {...rest}
                    />
                    {type === "date" && (
                        <div className="absolute right-0 top-0 h-full w-16 flex items-center justify-center">
                            <i className="fal fa-calendar-alt" />
                        </div>
                    )}
                    {type === "file" && (
                        <div className="absolute right-0 top-0 h-full w-16 flex items-center justify-center">
                            <i className="fal fa-paperclip" />
                        </div>
                    )}
                    <label
                        htmlFor={randomId}
                        className="text-zinc-500 absolute peer-focus:text-[12px] text-[12px] transition-all ease-in-out duration-200 peer-placeholder-shown:top-[1.1rem] peer-placeholder-shown:text-base peer-placeholder-shown:left-5 cursor-text peer-focus:left-[1.1rem]  top-2 left-[1.1rem] peer-focus:top-2 leading-6"
                    >
                        {placeholder} {required && <span className="text-red-500">*</span>}
                    </label>
                </div>
            </div>
        </div>
    </>
});

export const MaterialSelect = memo(function MaterialSelect(props) {
    const { className, startsWith, wrapper, rows, wrapperClass, leftContent, rightContent, placeholder, required, value, options, onChange, isError = null, ...rest } = props;
    const Component = wrapper || "input";
    const randomId = Math.random().toString(36).substring(7);

    let [isOpen, setIsOpen] = useState(false);
    let [selected, setSelected] = useState(value || options?.[0] || []);
    let ref = useRef(null);

    useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }

            if (event.target.id === "form") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return <>
        <div className="relative w-full" id="form">
            <div className="relative rounded-md shadow-sm" ref={ref}>
                <div className="cursor-pointer group relative flex " onClick={() => setIsOpen(!isOpen)}>
                    <Component
                        id={randomId}
                        autoComplete="off"
                        name={randomId}
                        className={`cursor-pointer rounded-lg w-full bg-light dark:bg-dark peer ${placeholder ? '!py-7 !pb-2' : '!py-4'} pl-[1.1rem] transition-all ease-in-out duration-200 placeholder-white/0 outline-none border border-primary/5 group-hover:border-primary/20 focus:border-primary/100`}
                        placeholder=" "
                        rows={rows || 4}
                        required={required}
                        value={selected}
                        disabled={true}
                        {...rest}
                    />
                    <label
                        htmlFor={randomId}
                        className="false text-zinc-500 absolute peer-focus:text-[12px] text-[12px] transition-all ease-in-out duration-200 peer-placeholder-shown:top-[1.1rem] peer-placeholder-shown:text-base peer-placeholder-shown:left-5 cursor-text peer-focus:left-[1.1rem]  top-2 left-[1.1rem] peer-focus:top-2 leading-6 will-change"
                    >
                        {placeholder} {required && <span className="text-red-500">*</span>}
                    </label>

                    <div className="absolute right-0 top-0 h-full w-16 flex items-center justify-center">
                        <i className="fal fa-chevron-down" />
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    className="absolute left-0 w-full bg-white dark:bg-dark border border-primary/5 rounded-lg shadow-lg z-[999999] mt-2 p-2 max-h-[20rem] overflow-auto"
                >
                    <div >
                        {(options || [])?.map((option, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-zinc-500/5 rounded-lg cursor-pointer transition-all duration-200"
                                onClick={() => {
                                    setSelected(option);
                                    setIsOpen(false);
                                    onChange({ target: { value: option } });
                                }}
                            >
                                <span>{option}</span>
                                {selected === option && <i className="fal fa-check" />}
                            </div>
                        ))}
                    </div>
                </Transition>
            </div>
        </div>
    </>
});



export const FileInput = function FileInput(props) {
    const { type = "banner", placeholder, required, isError = null, value, setValue, ...rest } = props;

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setValue(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files?.[0]);
    };

    const mathId = Math.random().toString(36).substring(7);

    return <>
        <div className="relative w-full" id="form">
            <div className="relative mt-1 rounded-md overflow-hidden shadow-sm">
                <div className="relative flex group">
                    <label htmlFor={mathId} className={`${type === "banner" ? "w-full h-80" : "w-36 h-36"} relative overflow-hidden flex flex-col justify-center items-center bg-light dark:bg-dark rounded-lg border-2 border-primary/5 border-dashed cursor-pointer hover:bg-primary/5 hover:dark:bg-primary/5 transition-all duration-200`}>
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <i className="fal fa-cloud-upload-alt text-4xl text-black/50 dark:text-zinc-500/50" />
                        </div>
                        {value && (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <img src={value} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <input onChange={handleFileChange} id={mathId} type="file" className="hidden" />

                        <label className="z-[2] false text-zinc-500 absolute peer-focus:text-[12px] text-[12px] transition-all ease-in-out duration-200 peer-placeholder-shown:top-[1.1rem] peer-placeholder-shown:text-base peer-placeholder-shown:left-5 cursor-text peer-focus:left-[1.1rem]  top-2 left-[1.1rem] peer-focus:top-2 leading-6 will-change">
                            {placeholder} {required && <span className="text-red-500">*</span>}
                        </label>
                    </label>
                </div>
            </div>
        </div>
    </>
};
