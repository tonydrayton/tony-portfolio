import { cn } from "@/lib/utils";

export default function Logo({ size, className }: { size: number, className?: string }) {
    return (
        <svg className={cn("invert dark:invert-0", className)} width={size} height={size} viewBox="0 0 52 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="2c639b94">
                <rect id="34019d62" x="17.3672" y="34.6328" width="17.2656" height="22.3438" rx="5" fill="url(#a8236533)"></rect>
                <rect id="a3727650" x="17.3334" width="17.3333" height="17.3333" rx="5" fill="url(#aca5db46)"></rect>
                <rect id="5dde39c7" x="34.6667" y="17.3333" width="17.3333" height="17.3333" rx="5" fill="url(#85211717)"></rect>
                <rect id="1302da06" x="20.2109" y="20.3125" width="11.4766" height="11.4766" rx="5.73828" fill="url(#339ddeaf)"></rect>
                <rect id="b88772c6" y="17.3333" width="17.3333" height="17.3333" rx="5" fill="url(#81de97f7)"></rect>
            </g>
            <defs>
                <linearGradient id="a8236533" x1="25.8803" y1="34.6328" x2="26.2812" y2="56.9737" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EEEEEE"></stop>
                    <stop offset="1" stopColor="#F0F0F0" stopOpacity="0.5"></stop>
                </linearGradient>
                <linearGradient id="aca5db46" x1="26" y1="0" x2="26" y2="17.3333" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0.5"></stop>
                </linearGradient>
                <linearGradient id="85211717" x1="43.3334" y1="17.3333" x2="43.3334" y2="34.6667" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0.5"></stop>
                </linearGradient>
                <linearGradient id="339ddeaf" x1="25.9492" y1="20.3125" x2="25.9492" y2="31.7891" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0.5"></stop>
                </linearGradient>
                <linearGradient id="81de97f7" x1="8.66667" y1="17.3333" x2="8.66667" y2="34.6667" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"></stop>
                    <stop offset="1" stopColor="white" stopOpacity="0.5"></stop>
                </linearGradient>
            </defs>
        </svg>
    )
}
