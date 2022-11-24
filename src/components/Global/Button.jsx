import { useEffect, useRef, useState } from "react";
const colors = require('tailwindcss/colors');
import { Button as MaterialButton } from '@material-tailwind/react';


export default function Button({
    children,
    className = "",
    color = "dbio",
    variant = "default",
    ...props
}) {

    const allColors = {
        ...colors,
        dbio: {
            500: "#4f46e5",
            800: "#4f46e5"
        }
    }

    const getColor = color => {
        return allColors[color] ? allColors[color] : color;
    };

    const colorOpacity = (color, percent, tone) => {
        const opacity = percent / 100;
        const colorOpacity = getColor(color)[tone];


        const r = parseInt(colorOpacity.slice(1, 3), 16);
        const g = parseInt(colorOpacity.slice(3, 5), 16);
        const b = parseInt(colorOpacity.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };


    return (
        <>
            {variant === "ghost" && (
                <button
                    style={{
                        '--bg-color': colorOpacity(color, 10, 500),
                        '--bg-color-hover': colorOpacity(color, 20, 500),
                        '--text-color': colorOpacity(color, 100, 500),
                    }}
                    className={`bg-button px-8 py-3 rounded-md transition-all duration-200 font-medium disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none ${className}`}
                    {...props}
                >
                    {children}
                </button>
            )}
            {variant === "default" && (
                <button
                    style={{
                        '--bg-color': colorOpacity(color, 100, 500),
                        '--bg-color-hover': colorOpacity(color, 70, 800),
                    }}
                    className={`bg-button px-8 py-3 rounded-md transition-all duration-200 font-medium !text-white disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none ${className}`}
                    {...props}
                >
                    {children}
                </button>
            )}
            {variant === "border" && (
                <button
                    style={{
                        '--bg-color': colorOpacity(color, 100, 500),
                        '--bg-color-hover': colorOpacity(color, 0, 800),
                        '--border-color': colorOpacity(color, 100, 500),
                    }}
                    className={`bg-button border-2 border-white/0 px-8 py-3 rounded-md transition-all duration-200 font-medium !text-white disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none ${className}`}
                    {...props}
                >
                    {children}
                </button>
            )}

            {variant === "icon" && (
                <button
                    style={{
                        '--bg-color': colorOpacity(color, 10, 500),
                        '--bg-color-hover': colorOpacity(color, 20, 500),
                        '--text-color': colorOpacity(color, 100, 500),
                    }}
                    className={`bg-button w-12 h-12 flex items-center justify-center rounded-md transition-all duration-200 font-medium disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none ${className}`}
                    {...props}
                >
                    {children}
                </button>
            )}
        </>
    );
}
