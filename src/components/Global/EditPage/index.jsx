import classNames from "classnames";
import { Fragment, useState } from "react";
import { Button as MaterialButton } from "@material-tailwind/react";
import { useUser } from "@/context/user";
import { Transition } from "@headlessui/react";
import FormProvider from "@/context/form";
import General from "./Tabs/General";
import Button from "../Button";
import Appearance from "./Tabs/Appearance";
import Privacy from "./Tabs/Privacy";
import Other from './Tabs/Other'
import axios from "axios";
import { request } from "@/utils/apiHandler";
import { useRouter } from "next/router";
import toast from 'react-hot-toast'

export default function EditPage({ roles: fromRoles, skills: fromSkills, isSubmit = false }) {
    const { user } = useUser();
    const router = useRouter();
    let tabs = [
        {
            id: 1,
            name: "General",
            icon: "fas fa-user",
            content: () => {
                return <General />
            }
        },
        {
            id: 2,
            name: "Appearance",
            icon: "fas fa-palette",
            content: () => {
                return <Appearance roles={fromRoles} skills={fromSkills} />
            }
        },
        {
            id: 3,
            name: "Privacy",
            icon: "fas fa-fingerprint",
            content: () => {
                return <Privacy />
            }
        },
        {
            id: 4,
            name: "Other",
            icon: "fas fa-ellipsis-h",
            content: () => {
                return <Other />
            }
        }
    ]

    let [activeTab, setActiveTab] = useState(1);
    let [isSubmitting, setIsSubmitting] = useState(false);
    let [isError, setIsError] = useState(false);
    let [isSuccess, setIsSuccess] = useState(false);
    let [about, setAbout] = useState(user?.entity?.about ?? "");
    let [email, setEmail] = useState(user?.entity?.email ?? "");
    let [url, setUrl] = useState(user?.entity?.url ?? (router?.query?.url ?? ""));
    let [gender, setGender] = useState(user?.entity?.gender ?? "");
    let [birthday, setBirthday] = useState(user?.entity?.birthday ?? "");
    let [location, setLocation] = useState(user?.entity?.location ?? "");
    let [occupation, setOccupation] = useState(user?.entity?.occupation ?? "");
    let [socials, setSocials] = useState(user?.entity?.socials ?? []);
    let [skills, setSkills] = useState(user?.entity?.skills ?? []);
    let [roles, setRoles] = useState(user?.entity?.roles ?? []);
    let [banner, setBanner] = useState(user?.entity?.banner ?? "");
    let [avatar, setAvatar] = useState(user?.entity?.avatar ?? null);
    let [isShow, setIsShow] = useState(user?.entity?.privacy?.isShow ?? true);
    let [isPrivateEmail, setIsPrivateEmail] = useState(user?.entity?.privacy?.isEmailPrivate ?? true);
    let [isPrivateBirthday, setIsPrivateBirthday] = useState(user?.entity?.privacy?.isBirthdayPrivate ?? true);
    let [isPrivateLocation, setIsPrivateLocation] = useState(user?.entity?.privacy?.isLocationPrivate ?? true);
    let [isPrivateGender, setIsPrivateGender] = useState(user?.entity?.privacy?.isGenderPrivate ?? true);
    let [language, setLanguage] = useState(user?.entity?.language ?? null);

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        setIsError(false);
        setIsSuccess(false);

        let data = {
            about: about?.length > 0 ? about : null,
            email: email?.length > 0 ? email : null,
            url: url?.length > 0 ? url : null,
            gender: gender?.length > 0 ? gender : null,
            birthday: birthday?.length > 0 ? birthday : null,
            location: location?.length > 0 ? location : null,
            occupation: occupation?.length > 0 ? occupation : null,
            socials: socials ?? [],
            skills: skills ?? [],
            roles: roles ?? [],
            banner: banner?.length > 0 ? banner : null,
            avatar: avatar?.length > 0 ? avatar : null,
            language: language?.length > 0 ? language : null,
            privacy: {
                isShow: isShow || null,
                isEmailPrivate: isPrivateEmail || null,
                isBirthdayPrivate: isPrivateBirthday || null,
                isLocationPrivate: isPrivateLocation || null,
                isGenderPrivate: isPrivateGender || null
            }
        }

        const response = await request("/entity", "POST", data);

        if (response?.success) {
            setIsSuccess(true);
            setIsError(false);
            setIsSubmitting(false);
            if (isSubmit) {
                router.push("/" + url);
            } else {
                toast.success("Successfully updated your profile!");
            }
        } else {
            setIsError(true);
            setIsSuccess(false);
            setIsSubmitting(false);
            console.log(response);
            toast.error(response?.message || 'Something went wrong.');
        }
    }


    return <FormProvider value={{ isSubmitting, setIsSubmitting, isError, setIsError, isSuccess, setIsSuccess, about, setAbout, email, setEmail, url, setUrl, gender, setGender, birthday, setBirthday, location, setLocation, occupation, setOccupation, socials, setSocials, skills, setSkills, roles, setRoles, banner, setBanner, avatar, setAvatar, isShow, setIsShow, isPrivateEmail, setIsPrivateEmail, isPrivateBirthday, setIsPrivateBirthday, isPrivateLocation, setIsPrivateLocation, isPrivateGender, setIsPrivateGender, language, setLanguage }}>
        <div className="flex flex-col items-center justify-center px-10 3xl:px-0">
            <div className="max-w-7xl w-full">
                <div className="bg-light dark:bg-dark rounded-t-lg overflow-hidden">
                    <div className="flex flex-col items-center justify-center py-12 ">
                        {isSubmit ? (
                            <>
                                <div className="flex items-center justify-center">
                                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Welcome, <span className="text-primary">{user?.username}</span>!</h1>
                                </div>
                                <div className="flex items-center justify-center mt-2">
                                    <p className="text-dark/50 dark:text-white/50 font-regular">Start introducing yourself with submitting this form.</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-center">
                                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Welcome back, <span className="text-primary">{user?.username}</span>!</h1>
                                </div>
                                <div className="flex items-center justify-center mt-4">
                                    <p className="text-gray-500 dark:text-gray-400">Arrange to introduce yourself to the community</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="w-full flex flex-col lg:flex-row items-center relative w-full overflow-x-auto">
                        {tabs.map(tab => (
                            <MaterialButton
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={classNames(
                                    "flex items-center justify-center gap-2 px-4 py-4 rounded-t-lg cursor-pointer transition-all duration-200 w-full normal-case !bg-transparent",
                                    activeTab === tab.id ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 duration-500" : "text-gray-500 hover:text-black dark:hover:text-white",
                                )}
                                variant="text"
                                size="lg"
                                color="blue"
                            >
                                <i className={tab.icon} />
                                <span className="font-medium tracking-wide">{tab.name}</span>
                            </MaterialButton>
                        ))}
                        <div
                            className="lg:hidden z-[1] absolute bottom-0 left-0 w-1 h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500"
                            style={{
                                height: `${(100 / tabs.length)}%`,
                                top: `${(100 / tabs.length) * (activeTab - 1)}%`
                            }}
                        />
                        <div
                            className="hidden lg:block z-[1] absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500 transition-all duration-500"
                            style={{
                                width: `${(100 / tabs.length)}%`,
                                left: `${(100 / tabs.length) * (activeTab - 1)}%`
                            }}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800/10" />
                    </div>
                </div>
                <div className="bg-light dark:bg-dark rounded-b-lg p-4">
                    <Transition appear show={true} as={Fragment}>
                        <Transition.Child as="div" className="w-full">
                            {tabs.map(tab => (
                                activeTab === tab.id && (
                                    <Transition
                                        appear
                                        as={Fragment}
                                        show={activeTab === tab.id}
                                        key={tab.id}
                                    >
                                        <Transition.Child
                                            as={"div"}
                                            enter="transition-all duration-300"
                                            enterFrom="opacity-0 lg:translate-x-12"
                                            enterTo="opacity-100 lg:translate-x-0"
                                            leave="transition-all duration-300"
                                            leaveFrom="opacity-100 lg:translate-x-0"
                                            leaveTo="opacity-0 lg:-translate-x-12"
                                        >
                                            <div className="flex flex-col items-start justify-center py-8">
                                                {tab.content()}
                                            </div>
                                        </Transition.Child>
                                    </Transition>
                                )
                            ))}
                        </Transition.Child>
                    </Transition>

                    <div className="flex items-center justify-end">
                        <Button onClick={handleSubmit} variant="ghost" disabled={isSubmitting} className="font-bold text-sm flex items-center justify-center gap-2 px-4 py-4 rounded-t-lg cursor-pointer transition-all duration-200 normal-case text-primary">
                            <i className="fas fa-save" />
                            <span>{isSubmit ? "Submit your profile" : "Save changes"}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </FormProvider>
}