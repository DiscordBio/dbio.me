import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MiniCard from "./Cards/Mini";



const EmblaCarousel = ({ header, firstLoad, items, onEnd, slides, setSlides }) => {
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [viewportRef, embla] = useEmblaCarousel({
        slidesToScroll: 1
    });
    const loadingMore = useInfiniteScroll(embla, slides, hasMoreToLoad);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!loadingMore) return;
        setTimeout(() => {
            onEnd(setSlides, (Math.round((slides.length / 10)) + 1), hasMoreToLoad, setHasMoreToLoad);
        }, 1000);
    }, [embla, loadingMore]);

    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        embla.on("reInit", onSelect);
        onSelect();
    }, [embla, onSelect]);

    useEffect(() => {
        if (slides.length === 0) {
            if (firstLoad) firstLoad(setSlides);
        }
    }, [slides]);

    return (
        <>
            {header && (
                header(scrollNext, scrollPrev, setNextBtnEnabled, setPrevBtnEnabled, prevBtnEnabled, nextBtnEnabled)
            )}

            <div className="overflow-hidden w-full" ref={viewportRef}>
                <div className="flex items-center gap-4">
                    {items(slides)?.map((child, index) => (
                        <div className="flex-shrink-0 w-full lg:w-[32.5%]">{child}</div>
                    ))}
                    {hasMoreToLoad && (
                        <div className="flex-shrink-0 w-full lg:w-[32.5%]">
                            <div className="w-full h-full flex items-center justify-center">
                                {loadingMore && (
                                    <MiniCard isSkeleton />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
};

export default EmblaCarousel;
