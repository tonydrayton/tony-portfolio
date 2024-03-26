"use client";
import { Box, Grid, Tabs, Text } from "@radix-ui/themes"
import { motion } from "framer-motion"
import VaelethCard from "../VaelethCard"
import { useEffect, useState } from "react";
import AboutCard from "./AboutCard";
import MusicAtDrexelCard from "../MusicAtDrexelCard";

const AboutPageContent = () => {
    const [selectedTab, setSelectedTab] = useState<string | null>(null);

    useEffect(() => {
        if (window.location.hash === "#projects") {
            setSelectedTab("projects");
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
                            </Text></Tabs.Trigger></a>
                    </Tabs.List>
                    <Box pt="3">
                        <Tabs.Content value="projects" className="p-4">
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

                                    <MusicAtDrexelCard />
                                    <VaelethCard />

                                </Grid>
                            </motion.div>
                        </Tabs.Content>

                        <Tabs.Content value="about" className="p-4">
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                                style={{
                                    boxShadow: "0 0 15px -10px rgba(0,0,0,.3), 0 0 25px -15px rgba(0,0,0,.2)"
                                }}>
                                <AboutCard />
                            </motion.div>
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            )}
        </motion.div>
    )
}

export default AboutPageContent;