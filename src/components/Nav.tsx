import { cn } from "@/lib/utils";
import { Github, Linkedin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ModeToggle } from "./ui/ModeToggle";
import { Button } from "./ui/button";
import { motion } from 'framer-motion';
import MotionBlurFade from "./ui/MotionBlurFade";


const sections = ['Experience', 'Projects'];

export default function Nav() {
	return (
		<header className="fixed left-0 w-full p-2 mb-2 sm:p-4 sm:mb-0 z-10 ">
			<div className="m-auto flex h-full w-full max-w-sm items-center sm:max-w-xl transition-all ease-in-out duration-100">
				<div className="justify-center sm:justify-between m-auto p-0.5 mt-1 sm:p-2 sm:px-4 flex h-full w-full max-w-full items-center rounded-full border-[1px] border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/10 pl-3 pr-2 backdrop-blur-xl backdrop-filter shadow-sm">
					<div className="items-center justify-center mx-2 gap-4 flex flex-row">
						{sections.map((section, index) => (
							<a key={index} href={`#${section.toLowerCase()}`} className="relative text-sm sm:text-base dark:text-white/80 dark:hover:text-white/100 transition-all duration-300 ease-in-out drop-shadow-md group dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.3)]">
								{section}
								<span
								className="absolute left-0 -bottom-5 h-0.5 bg-transparent transition-all duration-300 ease-in-out group-hover:w-full group-hover:bg-black dark:group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] w-0"
							/>
							</a>
						))}
						<motion.button
							initial={{ backgroundPosition: '0% 50%' }}
							animate={{ backgroundPosition: '100% 50%' }}
							transition={{
								duration: 3,
								ease: 'easeInOut',
								repeat: Infinity,
								repeatType: 'reverse'
							}}
							className="group relative font-semibold text-sm sm:text-base rounded-lg bg-gradient-to-r from-neutral-700 to-neutral-500 dark:from-neutral-500 dark:to-neutral-200 bg-clip-text text-transparent dark:drop-shadow-lg"
							style={{
								backgroundSize: '200% 100%',
								backgroundImage: 'linear-gradient(to right, #gray500, #ffffff)',
							}}
						>
							Resume
							<span className="sr-only">Open Resume</span>
							<span
								className="absolute left-0 -bottom-5 h-0.5 bg-transparent transition-all duration-200 ease-in-out group-hover:w-full group-hover:bg-black bg-gradient-to-r dark:group-hover:bg-white dark:from-neutral-500 dark:to-neutral-200 from-neutral-700 to-neutral-300 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] w-0"
							/>

						</motion.button>
					</div>
					<div className="gap-1 flex flex-row justify-center items-center">
						<ModeToggle />

						<a href="https://github.com/tonydrayton" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
							<Github className="size-4 sm:size-5" />
							<span
								className="absolute left-0 -bottom-4 h-0.5 bg-transparent transition-all duration-200 ease-in-out group-hover:w-full group-hover:bg-black dark:group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] w-0"
							/>
						</a>
						<a href="https://www.linkedin.com/in/tony-drayton/" target="_blank" className="relative group p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
							<Linkedin className="size-4 sm:size-5" />
							<span
								className="absolute left-0 -bottom-4 h-0.5 bg-transparent transition-all duration-200 ease-in-out group-hover:w-full group-hover:bg-black dark:group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)] w-0"
							/>
						</a>
					</div>
				</div>
			</div>
		</header>
	)

}