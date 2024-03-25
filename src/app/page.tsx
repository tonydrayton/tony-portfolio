/* eslint-disable @next/next/no-async-client-component */
"use client"
import Backdrop from "@/components/Backdrop";
import Container from "@/components/Container";
import DiscordProfile from "@/components/DiscordProfile";
import MailTo from "@/components/MailTo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProfileCard from "@/components/ProfileCard";
import { LanyardUser, lanyard } from "@/lib/lanyard";
import { getStatusColor } from "@/lib/utils";
import { Avatar, Box, Card, Flex, Separator, Skeleton, Text } from "@radix-ui/themes";
import { Circle, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [userData, setUserData] = useState<LanyardUser | null>(null);

    useEffect(() => {
        async function getLanyardUser() {
            try {
                const userId = "534505536712998926";
                const data = await lanyard({
                    userId: userId,
                });

                if (data instanceof WebSocket || Array.isArray(data)) {
                    return null;
                } else {
                    return data;
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
                return null;
            }
        }
        if (!userData) {
            getLanyardUser().then(data => setUserData(data));
        }
    }, [userData]);

    return (
        <>
            <Container className="flex-col">
                <ProfileCard />
            </Container >

            <Backdrop />
        </>
    );
}