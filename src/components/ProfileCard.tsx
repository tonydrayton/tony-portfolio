/* eslint-disable @next/next/no-async-client-component */
"use client"
import Backdrop from "@/components/Backdrop";
import Container from "@/components/Container";
import DiscordProfile from "@/components/DiscordProfile";
import MailTo from "@/components/MailTo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { LanyardSocketMessage, LanyardUser, lanyard } from "@/lib/lanyard";
import { getStatusColor } from "@/lib/utils";
import { Avatar, Box, Card, Flex, Separator, Skeleton, Text } from "@radix-ui/themes";
import { Circle, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileCard = () => {
    const [userData, setUserData] = useState<LanyardUser | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        async function fetchInitialUserData() {
            try {
                const userId = "534505536712998926";
                const data = await lanyard({ userId: userId });
                if (data && !Array.isArray(data) && !(data instanceof WebSocket)) {
                    setUserData(data);
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        }

        if (!userData) {
            fetchInitialUserData();
        }
    }, [userData]);

    useEffect(() => {
        if (userData && !socket) {
            console.log("YASSS")
            const newSocket = new WebSocket('wss://api.lanyard.rest/socket');
            newSocket.onopen = () => {
                newSocket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userData.discord_user.id } }));
            };
            newSocket.onmessage = (event) => {
                const data: LanyardSocketMessage = JSON.parse(event.data);
                setUserData(data.d);
            };
            setSocket(newSocket);
        }

        return () => {
            
        };
    }, [userData, socket]);

    console.log(userData, "data")
    return (
        <>
                <Card
                className="p-5"
                    size={{
                        lg: "5",
                        md: "4",
                        sm: "3"
                    }}
                    style={{ minHeight: "300px" }}>
                    <Flex gap="3" align="center" pb="5">
                        <Avatar
                            size="5"
                            radius="full"
                            src={`https://cdn.discordapp.com/avatars/${userData?.discord_user?.id}/${userData?.discord_user?.avatar}.png`}
                            fallback="T"
                            color="indigo"
                            className="pointer-events-none " />
                        <Box>
                            <Text
                                as="div"
                                size={{
                                    lg: "6",
                                    md: "5",
                                    sm: "4"
                                }}
                                className="flex items-center">
                                Tony Drayton
                                {userData && (
                                    <Circle 
                                    fill={getStatusColor(userData.discord_status)}
                                    color=""
                                    size={15}
                                    className="ml-2"/>
                                )}
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
                    </Flex>
                    <Separator size="4" />
                    <div className="flex-row pt-5">
                        <Flex>
                            <a href="https://github.com" target="_blank" className="p-1">
                                <Github />
                            </a>

                            <a href="https://www.linkedin.com/in/tony-drayton-37a873275/" target="_blank" className="p-1">
                                <Linkedin />
                            </a>
                            <MailTo
                                mailto="mailto:tony.drayton@drexel.edu" className="p-1"
                            >
                                <Mail />
                            </MailTo>
                        </Flex>
                    </div>
                </Card>
        </>
    );
}

export default ProfileCard;
