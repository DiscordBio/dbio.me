import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MiniCard from "./Cards/Mini";
import MCarousel from 'react-multi-carousel';


const Carousel = ({ header, children, slides }) => {

    let [carousel, setCarousel] = useState(null);

    function next() { carousel?.next() }
    function prev() { carousel?.previous() }

    let [isNext, setIsNext] = useState(true);
    let [isPrev, setIsPrev] = useState(false);

    return (
        <>
            {header && (
                header(next, prev, isPrev, isNext)
            )}
            <MCarousel
                responsive={{
                    desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 3,
                        slidesToSlide: 3
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 600 },
                        items: 2,
                        slidesToSlide: 2
                    },
                    mobile: {
                        breakpoint: { max: 600, min: 0 },
                        items: 1,
                        slidesToSlide: 1
                    }
                }}
                swipeable={true}
                draggable={true}
                showDots={false}
                arrows={false}
                ssr={false}
                ref={(el) => setCarousel(el)}
                afterChange={(e) => {
                    const currentSlide = carousel.state.currentSlide;
                    const slidesToShow = carousel.state.slidesToShow;
                    const totalItems = carousel.state.totalItems;

                    setIsNext(currentSlide + slidesToShow < totalItems);
                    setIsPrev(currentSlide > 0);
                }}
                containerClass="-mr-4"
            >
                {children?.(slides)?.map((child, index) => (
                    <div className="flex-shrink-0 w-full select-none pr-4">
                        {child}
                    </div>
                ))}
            </MCarousel>
        </>
    );
};

export default Carousel;
