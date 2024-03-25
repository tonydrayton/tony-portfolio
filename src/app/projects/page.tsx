"use client"
import Container from "@/components/Container";
import { Card, Grid, HoverCard, Inset, Separator, Strong, Text, Tooltip } from "@radix-ui/themes";
import Image from "next/image";
import vaeleth from "../../../public/vaeleth.png"
import botdeveloper from "../../../public/earlybotdeveloper.svg";
import pokemoncampaign from "../../../public/pokemoncampaign.png";
import nitrocompetition from "../../../public/nitrocompetition.png";
import Link from "next/link";
import AnimatedShapeBackdrop from "@/components/AnimatedShapeBackdrop";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion"
import '@radix-ui/themes/styles.css';

const ProjectPage = () => {
    return (
        <>
            <Container className="p-5 flex-col">
            <motion.div
                initial={{ y: 150 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
                className="mb-10">
                <Link href="/" className="mb-10">
                    <ArrowLeft size="50" opacity={0.5} className="hover:opacity-100 transition-all easein-out duration-200">
                    </ArrowLeft>
                </Link>
                </motion.div>

                <motion.div
                initial={{ opacity: 1, y: 150 }}
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
                    className="mb-5" color="teal">
                    <Strong>Projects</Strong>
                </Text>
                </motion.div>
                <motion.div
                initial={{ display: "none", opacity: 0, y: 100 }}
                animate={{ display:"block", opacity: 1, scale: 1, y: 0 }}
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
                    <Card size="2" className="flex flex-col">
                        <div className="flex items-start pb-2">
                            <Image
                                src={vaeleth}
                                alt="Vaeleth"
                                className="xl:w-12 lg:w-12 md:w-10 sm:w-9 xxs:w-8 mr-2"
                            />
                            <Text size={{
                                lg: "8",
                                md: "8",
                                sm: "7",
                                initial: "7"
                            }}><Strong>Vaeleth</Strong></Text>
                        </div>
                        <Separator size="4" />
                        <Text as="p" size="3" className="pt-2">
                            My first ever <Text color="teal">coding project</Text>. {"I started this in 2019, when I was a kid with very little coding experience. In 2020, I got it "}
                            <Tooltip content={
                                <div className="flex flex-col">
                                    <p>{"A process to submit an application on Discord if you're bot is over x amount of servers."}</p>
                                    <p className="inline-flex items-center">I was given this badge
                                        <Image
                                            src={botdeveloper}
                                            alt="Bot Developer badge" />
                                        from it.
                                    </p>
                                </div>
                            }>
                                <Text color="sky" className="hover:underline">verified</Text>
                            </Tooltip>
                            {" on Discord. It had many features spanning from a great RPG economy, to moderation modules. In it's peak, it had over "}<Text color="teal">100,000</Text> users and was in over <Text color="teal">200</Text> different servers. I discontinued this in 2022 because of events in my life, but this was hands down my favorite thing I developed.
                        </Text>
                        <Separator size="4" className="mt-2 mb-2" />
                        <div className="flex flex-row gap-5">
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Link href="#" className="w-fit"><Text color="blue">Picture 1</Text></Link>
                                </HoverCard.Trigger>
                                <HoverCard.Content>
                                    <Image
                                        src={pokemoncampaign}
                                        alt="Pokemon Campaign"
                                        className="w-auto"
                                    />
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <HoverCard.Root>
                                <HoverCard.Trigger>
                                    <Link href="#" className="w-fit"><Text color="blue">Picture 2</Text></Link>
                                </HoverCard.Trigger>
                                <HoverCard.Content>
                                    <Image
                                        src={nitrocompetition}
                                        alt="Nitro Competition"
                                        className="w-auto"
                                    />
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </div>
                    </Card>
                </Grid>
                </motion.div>
            </Container>
        </>
    )
}

export default ProjectPage;