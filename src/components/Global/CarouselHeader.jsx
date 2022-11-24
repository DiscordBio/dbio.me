import Link from "next/link";
import Button from "./Button";

export default function CarouselHeader({ title, icon, seeAll, description, next, prev, isPrev, isNext }) {
    return (
        <>
            <div className="lg:flex justify-between items-center mb-6">
                <div className="flex items-center gap-4 w-full">
                    <div className="hidden lg:block relative">
                        <i className={`${icon} hidden lg:block text-5xl text-primary`} />
                    </div>
                    <div className="w-full">
                        <div className="flex justify-between w-full items-center gap-4">
                            <p className="text-lg lg:text-2xl text-primary font-bold">
                                {title}
                            </p>
                            <div className="flex items-center gap-2">
                                {seeAll && (
                                    <Link href={seeAll}>
                                        <a className="text-primary font-medium text-sm lg:text-base hover:text-secondary transition-all duration-200 mr-2">
                                            See All
                                        </a>
                                    </Link>
                                )}
                                {isPrev && (
                                    <Button variant="icon" className="!w-8 !h-8 !text-xs rounded-full" color="zinc" onClick={prev} disabled={!isPrev}>
                                        <i className="fal fa-chevron-left" />
                                    </Button>
                                )}
                                {isNext && (
                                    <Button variant="icon" className="!w-8 !h-8 !text-xs rounded-full" color="zinc" onClick={next} disabled={!isNext}>
                                        <i className="fal fa-chevron-right" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <p className="text-sm lg:text-base text-gray-500 font-regular">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}