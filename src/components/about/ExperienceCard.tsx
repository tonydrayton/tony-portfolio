// import { Card, Link, Text } from "@radix-ui/themes"
// import Image from "next/image";
// import alumniq_logo from "../../../public/alumniq_logo.png";
// import { useEffect, useState } from "react";

// const ExperienceCard = () => {
// 	const [resumeURL, setResumeURL] = useState<string>('');

// 	useEffect(() => {
// 		getResumeURL();
// 	}, [])

// 	const getResumeURL = async () => {
// 		try {
// 			const response = await fetch('/api/getLatestResume');
// 			if (response.ok) {
// 				const blob = await response.blob();
// 				const url = URL.createObjectURL(blob);
// 				return setResumeURL(url);
// 				window.open(url, '_blank', 'noopener,noreferrer');
// 				setTimeout(() => URL.revokeObjectURL(url), 1000 * 60 * 10);
// 			} else {
// 				console.error('Error fetching PDF');
// 			}
// 		} catch (error) {
// 			console.error('Error fetching or opening PDF', error);
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="flex flex-row">
// 				<Text className="mb-1 flex-1" size={{
// 					lg: "6",
// 					md: "6",
// 					sm: "6",
// 					initial: "4"
// 				}}>
// 					{"Experience"}
// 				</Text>
// 					<Link color="teal" className={`flex flex-row transition-all duration-200 ease-in-out ${resumeURL.length > 0 ? 'opacity-100' : 'opacity-0'}`} href={resumeURL} target="_blank" size={{
// 						lg: "6",
// 						md: "6",
// 						sm: "6",
// 						initial: "4"
// 					}}>
// 						{"Resume"}
// 					</Link>

// 			</div>
// 			<Card size={{
// 				lg: "4",
// 				initial: "2"
// 			}}
// 				className="!flex !flex-col gap-3 max-w-lg xl:max-w-3xl sm:p-4 xxs:p-4 transition-all duration-500 ease-in-out mt-4">
// 				<div className="flex flex-row items-center">
// 					<Image
// 						src={alumniq_logo}
// 						alt="AlumnIQ"
// 						className="xl:w-14 lg:w-20 md:w-12 sm:w-14 w-14 mr-4 rounded-lg"
// 					/>
// 					<div className="flex flex-col">
// 						<Text size={{
// 							lg: "6",
// 							md: "5",
// 							sm: "3",
// 							initial: "3"
// 						}}>{"Junior Software Engineer @ "}<Link href="https://www.alumniq.com" target="_blank">AlumnIQ</Link></Text>
// 						<Text className="opacity-50 font-light">{"April 2024 - September 2024"}</Text>
// 					</div>
// 				</div>
// 				<div className="flex flex-col mt-2">
// 					<Text size={{
// 						lg: "5",
// 						md: "4",
// 						sm: "3",
// 						initial: "3"
// 					}}>
// 						<ul className="text-base">
// 							<li>• Designed and implemented <Text color="green">three</Text> webhook mail handlers, efficiently processing over <Text color="green">100,000</Text> emails monthly</li>
// 							<li>• Led the migration of over <Text color="green">30</Text> different Lambda functions from <Link href="https://nodejs.org/api/modules.html" target="_blank">CommonJS (CJS)</Link> to <Link href="https://nodejs.org/api/esm.html" target="_blank">ECMAScript Modules (ESM)</Link></li>
// 							<li>• Enhanced software quality by developing extensive test cases and resolving over <Text color="green">10</Text> critical bugs</li>
// 							<li>• Engaged with customers at in-person events to gather valuable feedback</li>
// 						</ul>
// 					</Text>
// 				</div>
// 			</Card>
// 		</>
// 	)
// }

// export default ExperienceCard;
