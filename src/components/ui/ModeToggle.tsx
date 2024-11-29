"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "./button"

export function ModeToggle({
	className
}: {
	className?: string
}) {
	const { theme, setTheme } = useTheme();


	return (
		<Button className={`${className ? cn(className, 'hover:bg-gray-300/40') : 'hover:bg-gray-300/40'} px-2 group relative`} variant="ghost" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			<Sun className="size-4 sm:size-5 dark:hidden" />
			<Moon className="size-4 sm:size-5 hidden dark:block" />
			<span
				className="absolute left-0 -bottom-2 h-0.5 bg-transparent transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-black dark:group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] w-0"
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
