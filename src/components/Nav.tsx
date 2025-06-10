import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { AnimatedGroup } from "./ui/animated-group";

const menuItems = [
	{ name: 'Experience', href: '#experience' },
	{ name: 'Contact', href: '#contact' },
]

export default function Nav() {
	const [menuState, setMenuState] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header className="block 2xl:hidden">
			<nav
				data-state={menuState && 'active'}
				className="fixed z-20 w-full px-2 group">
				<div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full justify-between lg:w-auto">
							<Link
								href="/"
								aria-label="home"
								className="flex items-center space-x-2">
								<Logo size={35} />
							</Link>

							<button
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
								<MenuIcon className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
								<XIcon className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</button>
						</div>

						<div className="absolute inset-0 m-auto hidden size-fit lg:block">
							<ul className="flex gap-8 text-sm">
								{menuItems.map((item, index) => (
									<li key={index}>
										<Link
											href={item.href}
											className="text-muted-foreground hover:text-accent-foreground block duration-150">
											<span>{item.name}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<AnimatedGroup
					as="ul"
					initial={'hidden'}
					animate={menuState ? 'visible' : 'hidden'}
					className="bg-background/50 backdrop-blur-lg border mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-2xl p-6 shadow-2xl shadow-zinc-300/20 mt-4 md:flex-nowrap lg:hidden lg:m-0 lg:w-fit lg:gap-6 lg:space-y-0 lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent text-base"
					preset="blur-slide"
				>
					{menuItems.map((item, index) => (
						<li key={index}>
							<Link
								href={item.href}
								className="text-muted-foreground hover:text-accent-foreground block duration-150">
								<span>{item.name}</span>
							</Link>
						</li>
					))}
				</AnimatedGroup>
			</nav>
		</header>
	)

}
