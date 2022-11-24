import Button from "@/components/Global/Button";
import Link from "next/link";
import { useState } from "react";
import { request } from "@/utils/apiHandler";
import ImageWithFallback from "@/libraries/Image";
import { Button as MaterialButton } from "@material-tailwind/react";

export default function MiniCard({
    image,
    banner,
    username,
    url,
    about,
    isSkeleton = false,
    isLiked = false,
    isVerified = false,
}) {

    let [liked, setLiked] = useState(isLiked || false);

    const toggleLike = async () => {
        if (liked) {
            const req = await request(`/entity/${url}/unlike`, 'POST');
            if (req.success) {
                setLiked(false);
            } else {
                if (req.data?.length > 0) {
                    setLiked(old => req.data[0]?.isLiked ?? old);
                }
            }
        } else {
            const req = await request(`/entity/${url}/like`, 'POST');
            if (req.success) {
                setLiked(true);
            } else {
                if (req.data?.length > 0) {
                    setLiked(old => req.data[0]?.isLiked ?? old);
                }
            }
        }
    }
    return (
        <>
            {isSkeleton ? (
                <>
                    <div className="user-select-none w-full bg-light dark:bg-dark rounded-lg overflow-hidden">
                        <div className="relative flex flex-col justify-center items-center w-full p-4">
                            <div className="flex items-center justify-start gap-2 w-full">
                                <div className="w-16 h-16 flex-shrink-0 bg-zinc-500/20 dark:bg-zinc-500/20 ring-4 ring-light dark:ring-dark ring-offset-0 rounded-full animate-pulse" />
                                <div className="w-full">
                                    <div className="w-2/4 h-5 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-lg animate-pulse" />
                                    <div className="w-1/4 bg-zinc-500/20 dark:bg-zinc-500/20 h-3 rounded-full animate-pulse my-2" />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-start w-full gap-2 h-16 mt-6">
                                <div className="w-1/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-3/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-4/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-2/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-6/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-1/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-3/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-4/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-2/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                                <div className="w-4/12 h-4 bg-zinc-500/20 dark:bg-zinc-500/20 rounded-full animate-pulse" />
                            </div>
                            <div className="flex justify-center items-center gap-2 w-full mt-6">
                                <div className="h-12 bg-zinc-500/20 dark:bg-zinc-500/20 w-full rounded-lg animate-pulse" />
                                <div className="h-12 bg-zinc-500/20 dark:bg-zinc-500/20 w-12 rounded-lg animate-pulse flex-shrink-0" />
                            </div>
                        </div>
                    </div >
                </>
            ) : (
                <>
                    <div className="w-full bg-light dark:bg-dark rounded-lg overflow-hidden select-none p-4">
                        <div>
                            <div className="flex items-center justify-start gap-2">
                                <div className="relative w-16 h-16 ring-4 ring-light dark:ring-dark ring-offset-0 rounded-full overflow-hidden">
                                    <ImageWithFallback fallbackSrc="avatar" className="rounded-full" src={image} />
                                </div>
                                <div>
                                    <h1 className="text-black dark:text-white text-lg font-medium">
                                        {username}
                                        {isVerified && (
                                            <i className="fas fa-badge-check ml-1.5" />
                                        )}
                                    </h1>
                                    <p className="text-sm text-black dark:text-gray-500 font-medium">@{url}</p>
                                </div>
                            </div>

                            <div className="flex justify-start items-center gap-2 w-full mt-6">
                                <p className="text-sm text-black/75 dark:text-gray-500 font-medium line-clamp-3 h-16 overflow-hidden text-left">{about}</p>
                            </div>
                        </div>

                        <div className="flex justify-end items-center w-full mt-4 gap-4">
                            <Link href={`/${url}`}>
                                <Button className="w-full h-12 block" variant="ghost">
                                    View Profile
                                </Button>
                            </Link>
                            <Button onClick={toggleLike} className="!px-0 !w-12 h-12 flex justify-center items-center flex-shrink-0" color="red" variant="ghost">
                                <i className={`fa-${liked ? 'solid' : 'light'} fa-heart`} />
                            </Button>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}