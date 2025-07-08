import { useTheme } from "next-themes";
import { ContainerContent } from "../Container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { AnimatedGroup } from "../ui/animated-group";
import { MagicCard } from "../ui/magic-card";
import { ActivityIcon, BriefcaseIcon, BuildingIcon, CodeIcon, HeartIcon, ZapIcon } from "lucide-react";

const faqItems = [
	{
		question: "What are all of the languages you know / have used?",
		answer: "I'm proficient in TypeScript, JavaScript, Python, SQL, Java, and HTML/CSS. I'm also familiar with C and Assembly. A more detailed list can be found in my resume.",
		icon: CodeIcon
	},
	{
		question: "What technologies are you most comfortable with?",
		answer: "In terms of comfortability, I would say Frontend Development is my strongest suit. This includes libraries and frameworks such as React, Next.js, TailwindCSS, Figma, etc.",
		icon: ZapIcon
	},
	{
		question: "What is your preferred coding language?",
		answer: "I'm a big fan of TypeScript, and have been ever since I learned about it in 2021. Before that I was using JavaScript for majority of my projects.",
		icon: HeartIcon
	},
	{
		question: "Are you available for hire?",
		answer: "I'm currently not available for hire, but I'm always open to new opportunities and collaborations. You can contact me through my email or LinkedIn.",
		icon: BriefcaseIcon
	},
	{
		question: "Are you apart of any clubs or organizations at university?",
		answer: "I'm a member of both the Drexel AI club and Drexel Asian Student Association.",
		icon: BuildingIcon
	},
	{
		question: "What do you do in your free time?",
		answer: "Either coding something, hanging out with friends, or watching a tutorial of how to code something.",
		icon: ActivityIcon
	}
]

export default function FAQ() {
	const { theme } = useTheme()

	const gradientColor = theme === "dark" ? "#262626" : "#D9D9D955"

	return (
		<ContainerContent>
			<h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">Common Questions</h2>
			<p className="text-base text-muted-foreground">Answers to your burning desires</p>
			<Accordion
				type="single"
				collapsible
				className="w-full border-t border-border pt-4 mt-4"
				>
					<AnimatedGroup
					as="div"
					preset="blur-slide"
					className="space-y-4"
					viewport={{ amount: 0.1, once: true }}
					>
					{faqItems.map((item, index) => (
						<AccordionItem key={index} value={`item-${index + 1}`} className="border-b-0 border border-border rounded-md backdrop-blur-sm shadow-sm bg-linear-to-br from-background to-muted dark:to-muted/20">
							<MagicCard className="px-4" gradientColor={gradientColor}>
							<AccordionTrigger className=" hover:no-underline!">
								<div className="inline-flex flex-col sm:flex-row sm:items-center gap-2">
									<item.icon size={16} />
									{item.question}
								</div>
							</AccordionTrigger>
							<AccordionContent className="text-primary/80">{item.answer}</AccordionContent>
							</MagicCard>
						</AccordionItem>
					))}
					</AnimatedGroup>
				</Accordion>
		</ContainerContent>
	)
}
