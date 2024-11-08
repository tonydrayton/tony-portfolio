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
	const { setTheme } = useTheme()

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button className={`${className ? cn(className, 'hover:bg-gray-300/40') : 'hover:bg-gray-300/40'} px-2 group relative`} variant="ghost">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden" />
					<Moon className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hidden dark:block" />
					<span
								className="absolute left-0 -bottom-5 h-0.5 bg-transparent transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-black dark:group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] w-0"
							/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-min border-gray-500/50 dark:border-white/50 focus-visible:ring-0 bg-black/5 dark:bg-white/10 backdrop-blur-xl backdrop-filter">
				<DropdownMenuItem className="focus:bg-black/10 dark:focus:bg-white/10" onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem className="focus:bg-black/10 dark:focus:bg-white/10" onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
