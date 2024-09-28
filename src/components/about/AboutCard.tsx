import { Card, Link, Separator, Text } from "@radix-ui/themes"
import Socials from "../Socials";

const AboutCard = () => {
	return (
		<Card size={{
			lg: "4",
			initial: "2"
		}}
			className="!flex !flex-col gap-3 max-w-lg xl:max-w-3xl sm:p-4 xxs:p-4 transition-all duration-500 ease-in-out">
			<div className="flex flex-col">
				<Text size={{
					lg: "5",
					md: "4",
					sm: "3",
					initial: "3"
				}}>
					{"Hey, my name is "}<Text color="teal">{"Tony"}</Text>.
					<br />
					{"I am an undergraduate student studying Computer Science at "}<Text color="yellow">{"Drexel Univeristy"}</Text>.
				</Text>
				<Text className="mt-4" size={{
					lg: "5",
					md: "4",
					sm: "3",
					initial: "3"
				}}>{"I currently work at "}<Link href="https://www.alumniq.com" target="_blank">AlumnIQ</Link>{" as a Junior Software Engineer."}</Text>
			</div>
			<Separator size="4" />
			<Socials />
		</Card>
	)
}

export default AboutCard;
