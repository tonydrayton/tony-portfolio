
import Container from "@/components/Container";
import "./page.css";
import { Metadata, Viewport } from "next";
import BackArrow from "@/components/about/BackArrow";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
    title: "About | Tony Drayton",
    description: "Portfolio",
};


const AboutPage = () => {
    return (
        <>
            <Container className="p-5 flex-col !justify-start h-full">
                <BackArrow />
                <AboutPageContent />
            </Container>
        </>
    )
}

export default AboutPage;