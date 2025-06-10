import { cn } from "@/lib/utils";

export default function Logo({ size, className }: { size: number, className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("invert dark:invert-0", className)}>
            <g id="2c639b94">
                <rect id="34019d62" x="16" y="32" width="16" height="16" rx="5" fill="url(#a8236533)"></rect>
                <rect id="a3727650" x="16" width="16" height="16" rx="5" fill="url(#aca5db46)"></rect>
                <rect id="5dde39c7" x="32" y="16" width="16" height="16" rx="5" fill="url(#85211717)"></rect>
                <rect id="b88772c6" y="16" width="16" height="16" rx="5" fill="url(#339ddeaf)"></rect>
            </g>
            <defs>
                <linearGradient id="a8236533" x1="23.8891" y1="32" x2="24.1109" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EEEEEE"></stop>
                    <stop offset="1" stop-color="#F0F0F0" stop-opacity="0.5"></stop>
                </linearGradient>
                <linearGradient id="aca5db46" x1="24" y1="0" x2="24" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white"></stop>
                    <stop offset="1" stop-color="white" stop-opacity="0.5"></stop>
                </linearGradient>
                <linearGradient id="85211717" x1="40" y1="16" x2="40" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white"></stop>
                    <stop offset="1" stop-color="white" stop-opacity="0.5"></stop>
                </linearGradient>
                <linearGradient id="339ddeaf" x1="8" y1="16" x2="8" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stop-color="white"></stop>
                    <stop offset="1" stop-color="white" stop-opacity="0.5"></stop>
                </linearGradient>
            </defs>
        </svg>
    )
}
