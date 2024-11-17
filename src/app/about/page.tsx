
import Container from "@/components/Container";
import "./page.css";
import { Metadata, Viewport } from "next";
import BackArrow from "@/components/about/BackArrow";
// import AboutPageContent from "@/components/about/AboutPageContent";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

const openGraph: OpenGraph = {
    title: "About",
    description: "Portfolio",
    locale: "en_US",
    type: "website",
    url: "https://tonydrayton.dev",
    siteName: "Tony Drayton", // Author on Discord
    images: [
        {
            url: "https://cdn.discordapp.com/emojis/1096246554479837225.png",
            width: 480,
            height: 480,
            alt: "Tony Drayton"
        }
    ]
}

export const metadata: Metadata = {
    title: "About",
    description: "Everything about me",
    openGraph: openGraph
};


const AboutPage = () => {
    return (
        <>
            <Container className="p-5 flex-col !justify-start h-full overflow-x-hidden">
                <BackArrow />
                {/* <AboutPageContent /> */}
            </Container>
        </>
    )
}

export default AboutPage;
