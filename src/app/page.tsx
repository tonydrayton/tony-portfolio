"use client"
/* eslint-disable @next/next/no-async-client-component */
import Backdrop from "@/components/Backdrop";
import Container from "@/components/Container";
import ProfileCard from "@/components/ProfileCard";
import TabCard from "@/components/TabCard";
import { motion } from "framer-motion"
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Container className="flex-col">
                <motion.div
                initial={{ opacity: 1, y: 150 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0, 0.71, 0.2, 1.01]
                }}>
                <ProfileCard />
                <TabCard />
                </motion.div>
            </Container >
            <Backdrop />
        </>
    );
}