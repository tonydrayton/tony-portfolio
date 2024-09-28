"use client";
import { Box, Card, Grid, Tabs, Text } from "@radix-ui/themes"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AboutCard from "./AboutCard";
import { Dog, PawPrint } from "lucide-react";
import DogComponent from "./DogComponent";
import Socials from "../Socials";
import ProjectCards, { Projects } from "./ProjectCards";

const tabs = ["about", "projects", "dogs"];

const AboutPageContent = () => {
	const [selectedTab, setSelectedTab] = useState<string | null>(null);
	const [windowSize, setWindowSize] = useState<number | null>(null)

	useEffect(() => {
		if (!windowSize) {
			setWindowSize(window.innerWidth);
		}
		const handleResize = () => {
			setWindowSize(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, []);

	useEffect(() => {
		const tab = window.location.hash.split('#')[1];
		if (tab && tabs.includes(tab)) {
			setSelectedTab(tab);
		} else {
			setSelectedTab("about");
		}

	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 150 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{
				delay: 0.5,
				duration: 1,
				ease: [0, 0.71, 0.2, 1.01]
			}}
			className="mb-5 lg:w-screen">
			{selectedTab && (
				<Tabs.Root defaultValue={selectedTab} className="lg:w-screen flex flex-col items-center">
					<Tabs.List size="2">
						<a href="#">
							<Tabs.Trigger value="about">
								<Text size={{
									lg: "6",
									md: "6",
									sm: "5",
									initial: "5"
								}}
								>
									About
								</Text>
							</Tabs.Trigger>
						</a>
						<a href="#projects">
							<Tabs.Trigger value="projects"><Text size={{
								lg: "6",
								md: "6",
								sm: "5",
								initial: "5"
							}}
							>
								Projects
							</Text></Tabs.Trigger>
						</a>
						<a href="#dogs">
							<Tabs.Trigger value="dogs"><Text size={{
								lg: "6",
								md: "6",
								sm: "5",
								initial: "5"
							}}
							>
								<PawPrint />
							</Text></Tabs.Trigger>
						</a>
					</Tabs.List>
					<Box pt="3">
						<Tabs.Content value="projects" className="p-4">
							{windowSize && windowSize < 768 && (
								<div className="flex flex-col gap-4">
									{Projects.map((project, index) => (
										<motion.div
											key={index}
											initial={{
												opacity: 0,
												x: index % 2 === 0 ? -50 : 50
											}}
											whileInView={{
												opacity: 1,
												x: 0,
												transition: {
													duration: 0.75,
													ease: [0, 0.71, 0.2, 1.01]
												}
											}}
											viewport={{ once: true }}
										>
											<ProjectCards card={project.name} />
										</motion.div>
									))}
								</div>
							)}
							{windowSize && windowSize >= 768 && (
								<motion.div
									initial={{ opacity: 0, y: 100 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									transition={{
										duration: 1,
										ease: [0, 0.71, 0.2, 1.01]
									}}>
									<Grid columns={{
										lg: "3",
										md: "2",
										sm: "2",
										initial: "1"
									}} gap="3">
										<ProjectCards />
									</Grid>
								</motion.div>
							)}
						</Tabs.Content>
						<Tabs.Content value="about" className="p-4">
							<motion.div
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{
									duration: 1,
									ease: [0, 0.71, 0.2, 1.01]
								}}
								className="dark:shadow-card_dark"
							>
								<AboutCard />
							</motion.div>
						</Tabs.Content>
						<Tabs.Content value="dogs" className="p-4">
							<motion.div
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{
									duration: 1,
									ease: [0, 0.71, 0.2, 1.01]
								}}
								className="flex flex-col items-center">
								<Text
									size={{
										lg: "5",
										md: "5",
										sm: "4",
										initial: "4"
									}}
									className="flex flex-col items-center mb-4"><a className="text-center">{"This page is dedicated to dogs."}</a><a className="text-center">{"Every time you click on this page you will see a new dog! 🐶"}</a>
								</Text>
								<DogComponent />
							</motion.div>
						</Tabs.Content>
					</Box>
				</Tabs.Root>
			)}
		</motion.div>
	)
}

export default AboutPageContent;
