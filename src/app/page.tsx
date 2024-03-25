/* eslint-disable @next/next/no-async-client-component */
import Backdrop from "@/components/Backdrop";
import Container from "@/components/Container";
import ProfileCard from "@/components/ProfileCard";
import { LanyardUser, lanyard } from "@/lib/lanyard";
import { useEffect, useState } from "react";

export default function Home() {
    return (
        <>
            <Container className="flex-col">
                <ProfileCard />
            </Container >
            <Backdrop />
        </>
    );
}