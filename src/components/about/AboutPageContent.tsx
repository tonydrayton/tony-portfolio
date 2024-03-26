"use client";
import { Box, Grid, Tabs, Text } from "@radix-ui/themes"
import { motion } from "framer-motion"
import VaelethCard from "../VaelethCard"
import { useEffect, useState } from "react";
import AboutCard from "./AboutCard";
import { useRouter } from "next/navigation";

const AboutPageContent = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<string | null>(null); // State to manage selected tab

    useEffect(() => {
        // Check if URL contains #projects
        if (window.location.hash === "#projects") {
            console.log("yes")
            // Update selected tab to "projects"
            setSelectedTab("projects");
        } else {
            setSelectedTab("about");
        }
    }, []);

    const handleProjectsTabClick = () => {
        router.push("/about#projects"); // Set URL when "Projects" tab trigger is clicked
    };
    return (
        <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="mb-5 w-screen">
                    {selectedTab && (
                    <Tabs.Root defaultValue={selectedTab} className="w-screen flex flex-col items-center">
                        <Tabs.List size="2">
                            <Tabs.Trigger value="about" id="projects">
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
                            <Tabs.Trigger value="projects" id="projects"><Text size={{
                                lg: "6",
                                md: "6",
                                sm: "5",
                                initial: "5"
                            }}
                            >
                                Projects
                            </Text></Tabs.Trigger>
                            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                        </Tabs.List>
                        <Box pt="3">
                            <Tabs.Content value="projects" className="p-4" id="projects">
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

                                        <VaelethCard />
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
                                    }}>
                                    <AboutCard />
                                </motion.div>
                            </Tabs.Content>

                            <Tabs.Content value="settings">
                                <Text size="2">Edit your profile or update contact information.</Text>
                            </Tabs.Content>
                        </Box>
                    </Tabs.Root>
                    )}
                </motion.div>
    )
}

export default AboutPageContent;