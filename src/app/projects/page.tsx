"use client"
import Container from "@/components/Container";
import { Card, Grid, HoverCard, Inset, Separator, Strong, Text, Tooltip, Link as RadixLink, Popover } from "@radix-ui/themes";
import Link from "next/link";
import AnimatedShapeBackdrop from "@/components/AnimatedShapeBackdrop";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion"
import './page.css';
import VaelethCard from "@/components/VaelethCard";

const ProjectPage = () => {
    return (
        <>
            <Container className="p-5 flex-col !justify-start">
                <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 2,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="mb-10">
                    <Link href="/">
                        <ArrowLeft size="50"  color="teal" className="hover:opacity-100 transition-all easein-out duration-200">
                        </ArrowLeft>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="mb-5">
                    <Text size={{
                        lg: "9",
                        md: "9",
                        sm: "8",
                        initial: "8"
                    }}
                        >
                        Projects
                    </Text>
                </motion.div>
                <motion.div
                    initial={{ display: "none", opacity: 0, y: 100 }}
                    animate={{ display: "block", opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        delay: 0.5,
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
                    </Grid>
                </motion.div>
            </Container>
        </>
    )
}

export default ProjectPage;