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
                                Software Engineer
                            </Text>

                        </Box>
                    </div>

                    {userData && userData.activities && userData.activities.length > 0 && (
                        <ActivityDetails userData={userData} />
                    )}
                </Flex>
                <Separator size="4" />
                <div className="flex-row pt-3 pb-3">
                    <Flex>
                        <a href="https://github.com/Trintous" target="_blank" className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
                            <Github />
                        </a>

                        <a href="https://www.linkedin.com/in/tony-drayton-37a873275/" target="_blank" className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
                            <Linkedin />
                        </a>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <button
                                    className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300"
                                >
                                    <Mail />
                                </button>

                            </AlertDialog.Trigger>
                            <AlertDialog.Content>
                                <AlertDialog.Title>Email</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure? This will launch your email app.
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end" align="center">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray" >
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <MailTo
                                            mailto="mailto:tony.drayton@drexel.edu" className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300"
                                        >
                                            <Button color="green" className="hover:cursor-pointer">Confirm</Button>
                                        </MailTo>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Flex>
                </div>
                <Separator size="4" />
                <div className="pt-3 flex flex-row items-center">
                    <FontAwesomeIcon icon={faDiscord} className="mr-3" style={{ maxHeight: "15px" }} />
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <Button variant="ghost" className="hover:cursor-pointer  hover:transition-all hover:ease-in-out hover:duration-300"
                            >@tcny</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content>
                            <AlertDialog.Title>Discord</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                Are you sure? This will launch your Discord app.
                            </AlertDialog.Description>
                            <Flex gap="3" mt="4" justify="end" align="center">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray" >
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <div className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
                                        <Button color="green" className="hover:cursor-pointer"
                                            onClick={(e) => {
                                                window.open(`discord://-/users/${process.env.DISCORD_ID}`)
                                            }}>Confirm</Button>
                                            </div>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                </div>
            </Card>
        </>
    );
}

export default ProfileCard;
