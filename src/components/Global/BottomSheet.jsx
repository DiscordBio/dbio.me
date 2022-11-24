import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import SwipeableBottomSheet from '@sergeymyssak/swipeable-bottom-sheet';
import { useRouter } from "next/router";

const BottomSheet = ({
    disableSwipe = false,
    onChange,
    children,
    containerClassName,
    bodyClassName,
    trigger,
    triggerProps = {},
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const ref = useRef(null);

    const toggle = useCallback((value) => {
        setIsOpen(value);
        if (onChange) onChange(value);

        if (value) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "auto";
        }
    }, [isOpen]);

    useEffect(() => {
        const handleRouteChange = () => {
            toggle(false);
        };

        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        };
    }, [router.events]);


    return <>
        <button
            onClick={() => toggle(!isOpen)}
            {...triggerProps}
        >
            {trigger}
        </button>

        <SwipeableBottomSheet
            isOpen={isOpen}
            onChange={setIsOpen}
            swipeableViewsProps={{ disabled: disableSwipe }}
            containerClassName={classNames("lg:hidden z-[9999999] ", containerClassName)}
            bodyClassName={classNames("relative bg-light dark:bg-dark rounded-t-[2rem]", bodyClassName)}
        >

            <div className="flex items-center justify-center group cursor-pointer pt-4" onClick={() => toggle(false)}>
                <div className="h-1 w-12 bg-zinc-500 group-hover:bg-zinc-600 dark:bg-zinc-500/20 group-hover:dark:bg-zinc-500/30 rounded-full transition-all duration-200" />
            </div>
            <div className="w-full p-4 min-h-[80vh] overflow-auto">
                {children}
            </div>
        </SwipeableBottomSheet>
    </>
};

export default memo(BottomSheet);