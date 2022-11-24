import ImageWithFallback from "@/libraries/Image";
import Button from "./Button";
import Tooltip from "./Tippy";
import { Button as MaterialButton } from "@material-tailwind/react";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { request } from "@/utils/apiHandler";
import { useUser } from "@/context/user";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { NextSeo } from "next-seo";
import toast from "react-hot-toast";

export default function UserPage({ data }) {
    let [activeTab, setActiveTab] = useState(1);
    const { user } = useUser();




    let tabs = [
        {
            id: 1,
            name: "General",
            icon: "fas fa-user",
            content: () => {



                return <>

                </>;
            }
        },
    ]

    let [liked, setLiked] = useState(data?.isLiked || false);
    let [likes, setLikes] = useState(data?.likes || 0);

    const toggleLike = async () => {
        if (liked) {
            const req = await request(`/entity/${data.url}/unlike`, 'POST');
            if (req.success) {
                setLiked(false);
                setLikes(old => old - 1);
                toast.success('The like was successfully removed.');
            } else {
                if (req.data?.length > 0) {
                    setLiked(old => req.data[0]?.isLiked ?? old);
                    setLikes(old => req.data[0]?.likes ?? old);
                }
            }
        } else {
            const req = await request(`/entity/${data.url}/like`, 'POST');
            if (req.success) {
                setLiked(true);
                setLikes(old => old + 1);
                toast.success('The like was successfully added.');
            } else {
                if (req.data?.length > 0) {
                    setLiked(old => req.data[0]?.isLiked ?? old);
                    setLikes(old => req.data[0]?.likes ?? old);
                }
            }
        }
    }

    const genders = {
        "He/Him": {
            name: "Male",
            pronouns: "He/Him",
        },
        "She/Her": {
            name: "Female",
            pronouns: "She/Her",
        },
        "They/Them": {
            name: "Non-Binary",
            pronouns: "They/Them",
        },
        "Other": {
            name: "Other",
            pronouns: "Other",
        },
    };

    const cards = [
        { upper: false, name: "Occupation", subtitle: "What do i do?", isPrivate: data.occupation === undefined, isEmpty: data.occupation === null, value: data.occupation, icon: "fas fa-briefcase" },
        { upper: false, name: "Location", subtitle: "Where do i live?", isPrivate: data.location === undefined, isEmpty: data.location === null, value: data.location, icon: "fas fa-map-marker-alt" },
        { upper: false, name: "Birthday", subtitle: "When was i born?", isPrivate: data.birthday === undefined, isEmpty: data.birthday === null, value: `${new Date(data.birthday).format("D MMMM Y")} (${new Date(data.birthday).fromNow("y")} years)`, icon: "fas fa-birthday-cake" },
        { upper: false, name: "Gender", subtitle: "What is my gender?", isPrivate: data.gender === undefined, isEmpty: data.gender === null, value: (genders?.[data.gender]?.name || "Special"), icon: "fas fa-venus-mars" },
        { upper: false, name: "Pronouns", subtitle: "What are my pronouns?", isPrivate: data.gender === undefined, isEmpty: data.gender === null, value: (genders?.[data.gender]?.pronouns || "Special"), icon: "fas fa-venus-mars" },
        { upper: true, name: "About Me", subtitle: "Who am I?", isPrivate: data.about === undefined, isEmpty: data.about === null, value: data.about, icon: "fas fa-info-circle" },
        { upper: false, name: "Native Language", subtitle: "What is my native language?", isPrivate: data.language === undefined, isEmpty: data.language === null, value: data.language, icon: "fas fa-language" },
    ]

    return <>
        {user?.styles && (
            <style>{user.styles}</style>
        )}
        <NextSeo 
            description={data?.about}
            openGraph={{
                images: [
                    {
                        url: data?.avatar,
                        width: 800,
                        height: 600,
                        alt: data?.name,
                    },
                ],
            }}
            twitter={{
                cardType: "summary"
            }}
        />

        <div className="flex flex-col items-center justify-center px-10 3xl:px-0">
            <div className="max-w-7xl w-full">
                <div id="user-header" className="mb-12">
                    <div className="w-full h-[400px] bg-primary rounded-lg relative overflow-hidden">
                        <ImageWithFallback id="user-banner" src={data.banner} fallbackSrc="banner" alt="Banner" className="absolute object-cover w-full h-full" />
                    </div>
                    <div id="user-info" className="lg:pl-16 pr-0 flex flex-col lg:flex-row items-center gap-6">
                        <div className="w-36 h-36 -mt-[4.5rem] rounded-full relative ring-8 ring-light dark:ring-dark overflow-hidden flex-shrink-0">
                            <ImageWithFallback src={data.avatar} fallbackSrc="avatar" id="user-avatar" className="w-full h-full" width={512} height={512} />
                        </div>
                        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full">
                            <div className="flex items-center justify-center lg:justify-start text-center lg:text-left gap-4 w-full mb-6 lg:mb-0">
                                <h1 className="text-4xl font-bold text-center">{data.discord.username}<span className="font-medium text-zinc-500 text-xl">#{data.discord.discriminator}</span></h1>
                                {data?.isVerified && (
                                    <Tooltip content={`Verified Profile`}>
                                        <i className="fa fa-badge-check text-3xl" />
                                    </Tooltip>
                                )}
                                {data?.isPremium && (
                                    <Tooltip content={`Premium Profile`}>
                                        <i className="fa fa-gem text-3xl" />
                                    </Tooltip>
                                )}
                            </div>
                            <div className="flex items-center justify-center lg:justify-end gap-4 w-full lg:w-2/4">
                                <Tooltip content={"You must be logged in to like this user."} disabled={user !== null}>
                                    <div>
                                        <Button color="red" variant="ghost" className="flex items-center gap-2" onClick={toggleLike} disabled={user === null}>
                                            <i className={`${liked ? "fa" : "fal"} fa-heart`} />
                                            <span>{likes}</span>
                                        </Button>
                                    </div>
                                </Tooltip>
                                {data?.isSelf && (
                                    <Link href="/[id]/edit" as={`/${data.url}/edit`}>
                                        <Button className="flex items-center gap-2">
                                            <i className="fa fa-user-edit" />
                                            <span>Edit Profile</span>
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 w-full mt-4">
                    {cards.filter(el => el.upper).map((card, i) => {
                        return <div key={i} className="p-4 px-6 bg-light dark:bg-dark rounded-lg dark:shadow-lg w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-shrink-0">
                                    <i className={card.icon + " text-4xl text-primary"} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-xl font-semibold">{card.name}</h1>
                                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                                </div>
                            </div>
                            {card.isPrivate ? <p className="text-md text-gray-500">This information is private.</p> : card.isEmpty ? <p className="text-md text-gray-500">This information is not set.</p> : <p className="text-md text-gray-500">{card.value}</p>}
                        </div>
                    })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
                    {cards.filter(el => !el.upper).map((card, i) => {
                        return <div key={i} className="p-4 px-6 bg-light dark:bg-dark rounded-lg dark:shadow-lg w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-shrink-0">
                                    <i className={card.icon + " text-4xl text-primary"} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-xl font-semibold">{card.name}</h1>
                                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                                </div>
                            </div>
                            {card.isPrivate ? <p className="text-md text-gray-500">This information is private.</p> : card.isEmpty ? <p className="text-md text-gray-500">This information is not set.</p> : <p className="text-md text-gray-500">{card.value}</p>}
                        </div>
                    })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                    <div className="p-4 px-6 bg-light dark:bg-dark rounded-lg dark:shadow-lg w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0">
                                <i className={"fa fa-wand-magic-sparkles text-4xl text-primary"} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-xl font-semibold">My Roles</h1>
                                <p className="text-sm text-gray-500">Roles that i have.</p>
                            </div>
                        </div>
                        {data?.roles.length === 0 ? <p className="text-md text-gray-500">This information is not set.</p> : <div className="flex flex-wrap gap-2">
                            {data?.roles.map((role, i) => {
                                return <div key={i} className="flex items-center gap-2 bg-light dark:bg-dark border border-primary/5 rounded-lg px-3 py-1.5">
                                    {role}
                                </div>
                            })}
                        </div>}
                    </div>
                    <div className="p-4 px-6 bg-light dark:bg-dark rounded-lg dark:shadow-lg w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0">
                                <i className={"fa fa-bolt text-4xl text-primary"} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-xl font-semibold">My Skills</h1>
                                <p className="text-sm text-gray-500">What i know?</p>
                            </div>
                        </div>
                        {data?.skills.length === 0 ? <p className="text-md text-gray-500">This information is not set.</p> : <div className="flex flex-wrap gap-2">
                            {data?.skills.map((skill, i) => {
                                return <div key={i} className="flex items-center gap-2 bg-light dark:bg-dark border border-primary/5 rounded-lg px-3 py-1.5">
                                    {skill}
                                </div>
                            })}
                        </div>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 w-full mt-4">
                    <div className="p-4 px-6 bg-light dark:bg-dark rounded-lg dark:shadow-lg w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0">
                                <i className={"fa fa-share-alt text-4xl text-primary"} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-xl font-semibold">My Socials</h1>
                                <p className="text-sm text-gray-500">Links to my socials.</p>
                            </div>
                        </div>
                        {data?.socials.length === 0 ? <p className="text-md text-gray-500">This information is not set.</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                            {data?.socials.map((social, i) => {
                                return <a href={social?.url + '?utm_source=dbio.me'} target="_blank" key={i} className="flex items-center justify-between relative bg-light dark:bg-dark border border-primary/5 hover:border-primary/20 active:border-primary/50 rounded-lg px-6 py-3 transition-all duration-200 cursor-pointer">
                                    <h1 className="capitalize text-md select-none ">
                                        <i className={social?.icon?.value + " " + social?.icon?.label + " mr-3"} />
                                        {social?.name}
                                    </h1>
                                    <i className={"fas fa-external-link-alt text-zinc-500"} />
                                </a>
                            })}
                        </div>}
                    </div>
                </div>


            </div>
        </div>
    </>
}