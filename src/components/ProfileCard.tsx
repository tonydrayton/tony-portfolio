/* eslint-disable @next/next/no-async-client-component */
"use client"
import Backdrop from "@/components/Backdrop";
import Container from "@/components/Container";
import MailTo from "@/components/MailTo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getStatusColor, statusMap } from "@/lib/utils";
import { AlertDialog, Avatar, Box, Button, Card, Flex, Separator, Skeleton, Text, Tooltip } from "@radix-ui/themes";
import { Circle, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ActivityDetails from "./ActivityDetails";
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LanyardSocketMessage, LanyardUser } from "@/lib/lanyard/types";
import Socials from "./Socials";

const ProfileCard = () => {
	const [userData, setUserData] = useState<LanyardUser | null>(null);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [heartbeat, setHeartbeat] = useState<NodeJS.Timeout | null>(null);

	// useEffect(() => {
	//     async function fetchInitialUserData() {
	//         try {
	//             const userId = "534505536712998926";
	//             const data = await lanyard({ userId: userId });
	//             if (data && !Array.isArray(data) && !(data instanceof WebSocket)) {
	//                 setUserData(data);
	//             }
	//         } catch (error) {
	//             console.error('Error fetching initial data:', error);
	//         }
	//     }

	//     if (!userData) {
	//         fetchInitialUserData();
	//     }
	// }, []);

	useEffect(() => {
		if (!socket) {
			const newSocket = new WebSocket("wss://api.lanyard.rest/socket");
			newSocket.onopen = () => {
				newSocket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: process.env.DISCORD_ID } }));
			};

			newSocket.onmessage = (event) => {
				const data: LanyardSocketMessage = JSON.parse(event.data);
				if (data.d.heartbeat_interval && !heartbeat) {
					const heartbeatInterval = setInterval(() => {
						newSocket.send(JSON.stringify({ op: 3 }));
					}, data.d.heartbeat_interval);
					setHeartbeat(heartbeatInterval);
				}
				if (data.t === 'INIT_STATE') {
					setUserData(data.d);
				}
				if (data.t === 'PRESENCE_UPDATE') {
					setUserData(data.d);
				}
			};

			newSocket.onerror = (event) => {
				console.error('WebSocket connection error:', event);
			};
			setSocket(newSocket);
		}

	}, [userData, socket, heartbeat]);

	return (
		<>
			<Card
				className="transition-all duration-500 ease-in-out"
				size={{
					lg: "4",
					md: "3",
					sm: "3",
					initial: "3"
				}}>
				<Flex align="start" pb="3" direction="column">
					<div className="flex">
						{userData && userData.discord_user && userData.discord_user.avatar
							?
							<Avatar
								size={{
									lg: "5",
									md: "4",
									sm: "4",
									initial: "4"
								}}
								radius="full"
								src={`https://cdn.discordapp.com/avatars/${userData?.discord_user?.id}/${userData?.discord_user?.avatar}.png`}
								fallback="T"
								color="teal"
								className="pointer-events-none transition-all duration-300 ease-in-out mr-3" />
							:
							<Avatar
								size={{
									lg: "5",
									md: "4",
									sm: "4",
									initial: "4"
								}}
								radius="full"
								fallback="T"
								color="teal"
								className="pointer-events-none transition-all duration-300 ease-in-out mr-3" />
						}

						<Box>
							<Text
								as="div"
								size={{
									lg: "6",
									md: "5",
									sm: "4",
									xs: "4",
									initial: "4",
								}}
								className="flex items-center">
								Tony Drayton
								{userData && statusMap[userData.discord_status]
									? (
										<Tooltip content={statusMap[userData.discord_status].text}>
											<Circle
												fill={getStatusColor(userData.discord_status)}
												color=""
												size={15}
												className="ml-2 transition-all" />
										</Tooltip>
									)
									:
									<Circle
										fill="gray"
										color=""
										size={15}
										className="ml-2 transition-all" />}
							</Text>
							<Text
								as="div"
								size={{
									lg: "5",
									md: "4",
									sm: "3"
								}}
								color="gray">
								Comp Sci Student
							</Text>

						</Box>
					</div>

					{userData && userData.activities && userData.activities.length > 0 && (
						<ActivityDetails userData={userData} />
					)}
				</Flex>
				<Separator size="4" />
				<Socials short className="flex-row pt-3 pb-3" />
			</Card>
		</>
	);
}

export default ProfileCard;
