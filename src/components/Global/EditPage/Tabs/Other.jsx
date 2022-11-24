import { useForm } from "@/context/form"
import useSWR from "@/hooks/useSWR";
import { useState } from "react";
import Button from "../../Button";
import Dropinput from "../../Dropinput";
import Input, { FileInput, MaterialInput, MaterialMultiSelect, MaterialSelect } from "../../Input";

export default function Other() {

    const { data: fromRoles } = useSWR("/api/v1/roles");
    const { data: fromSocials } = useSWR("/api/v1/socials");

    let [preRole, setPreRole] = useState("");
    let [preSocial, setPreSocial] = useState(fromSocials?.data[0]?.name);
    let [preSkill, setPreSkill] = useState("");
    let [socialValue, setSocialValue] = useState("");

    const { roles, setRoles, skills, setSkills, socials, setSocials, language, setLanguage } = useForm();

    return <>
        <div className="grid grid-cols-1 gap-4 w-full">
            <div>
                <p className="text-md text-zinc-500">Native Language</p>
                <Input
                    className="py-2"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    placeholder="Your preferred language, e.g. English, Turkish, etc."
                />
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                setRoles([...roles, preRole]);
                setPreRole("");
            }}>
                <p className="text-md text-zinc-500">Roles</p>
                <Input
                    className="py-2"
                    value={preRole}
                    onChange={e => setPreRole(e.target.value)}
                    placeholder="Add a role"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {roles?.map((item, i) => (
                        <div key={i} className="flex items-center gap-0.5">
                            <div className="px-4 py-2 bg-zinc-500/5 rounded-l-lg">
                                <span className="text-sm text-black dark:text-white">
                                    {item}
                                </span>
                            </div>
                            <div
                                onClick={() => setRoles(roles.filter((_, index) => index !== i))}
                                className="p-2 px-4 hover:bg-zinc-500/10 bg-zinc-500/5 rounded-r-lg transition-all duration-200 cursor-pointer"
                            >
                                <span className="text-sm text-black dark:text-white">
                                    <i className="fal fa-times" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
            <form onSubmit={e => {
                e.preventDefault();
                setSkills([...skills, preSkill]);
                setPreSkill("");
            }}>
                <p className="text-md text-zinc-500">Skills</p>
                <Input
                    className="py-2"
                    value={preSkill}
                    onChange={e => setPreSkill(e.target.value)}
                    placeholder="Enter a skill"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills?.map((item, i) => (
                        <div key={i} className="flex items-center gap-0.5">
                            <div className="px-4 py-2 bg-zinc-500/5 rounded-l-lg">
                                <span className="text-sm text-black dark:text-white">
                                    {item}
                                </span>
                            </div>
                            <div
                                onClick={() => setSkills(skills.filter((_, index) => index !== i))}
                                className="p-2 px-4 hover:bg-zinc-500/10 bg-zinc-500/5 rounded-r-lg transition-all duration-200 cursor-pointer"
                            >
                                <span className="text-sm text-black dark:text-white">
                                    <i className="fal fa-times" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
            <form onSubmit={e => {
                e.preventDefault();
                const social = fromSocials?.data.find(item => item.name === preSocial);
                if (social) {
                    const url = social?.url;
                    const value = socialValue?.includes(url?.replace(/{username}/g, "")) ? socialValue : url?.replace(/{username}/g, socialValue);

                    let newObj = new Object();

                    if (socials?.find(item => item.name === preSocial)) {
                        newObj = socials?.find(item => item.name === preSocial);
                        newObj.url = value;

                        setSocials(socials?.map(item => item.name === preSocial ? newObj : item));
                    } else {
                        newObj = {
                            ...social,
                            url: value
                        }

                        setSocials([...socials, newObj]);
                    }
                }
            }}>
                <p className="text-md text-zinc-500">Socials</p>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
                    <MaterialSelect
                        value={preSocial}
                        onChange={e => {
                            if (socials?.find(item => item.name === e.target.value)) {
                                const urlOnlyUsername = socials?.find(item => item.name === e.target.value)?.url?.replace(fromSocials?.data.find(item => item.name === e.target.value)?.url?.replace(/{username}/g, ""), "");
                                setSocialValue(urlOnlyUsername);
                            } else {
                                setSocialValue("");
                            }
                            setPreSocial(e.target.value);
                        }}
                        options={fromSocials?.data?.map(item => item.name)}
                    />
                    <Input
                        className="py-2"
                        leftContent={<p className="text-zinc-500">{(fromSocials?.data?.find(el => el.name === preSocial)?.url)?.replace(/{username}/g, '')}</p>}
                        value={socialValue}
                        onChange={e => setSocialValue(e.target.value)}
                    />
                    <Button variant="ghost" type="submit" className="!h-[3.74rem] w-full lg:w-10 flex items-center justify-center">
                        <i className="fal fa-plus" />
                    </Button>
                </div>
                <div className="mt-6 lg:mt-2 grid grid-cols-1 lg:grid-cols-3 gap-2">
                    {socials?.map((item, i) => (
                        <div key={i} className="animate-fade-in-down relative bg-light dark:bg-dark border border-primary/5 hover:border-primary/20 rounded-lg p-4 transition-all duration-200">
                            <div className="w-full flex items-center justify-between">
                                <h1 className="capitalize text-md mb-1"><i className={item?.icon?.value + " " + item?.icon?.label + " mr-1"} /> {item?.name} </h1>
                                <div
                                    className="w-6 h-6 transition-all duration-200 flex items-center justify-center rounded-md hover:bg-zinc-500/20 cursor-pointer"
                                    onClick={() => setSocials(socials.filter((_, index) => index !== i))}
                                >
                                    <i className="fal fa-times" />
                                </div>
                            </div>
                            <p className="text-sm text-zinc-400">{item?.url}</p>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    </>
}
