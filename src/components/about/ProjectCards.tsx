import { ProjectType } from "@/lib/utils";
import { Card, Link as RadixLink, Separator, Text, Tooltip } from "@radix-ui/themes";

import hippologo from "../../../public/digitaliconmarket/logo.png";
import homepage from "../../../public/digitaliconmarket/homepage.png"
import dashboardpage from "../../../public/digitaliconmarket/dashboard.png"
import loginpage from "../../../public/digitaliconmarket/login.png"
import cartpage from "../../../public/digitaliconmarket/cart.png";

import drexelhomepage from "../../../public/musicatdrexel/homepage.png";
import aboutpage from "../../../public/musicatdrexel/aboutpage.png";
import showspage from "../../../public/musicatdrexel/showspage.png";
import verifyemailpage from "../../../public/musicatdrexel/verifyemail.png";
import completesignup from "../../../public/musicatdrexel/completesignup.png";
import musicatdrexel from "../../../public/musicatdrexel.png";

import vaeleth from "../../../public/vaeleth.png"
import botdeveloper from "../../../public/earlybotdeveloper.svg";
import pokemoncampaign from "../../../public/pokemoncampaign.png";
import nitrocompetition from "../../../public/nitrocompetition.png";
import Image from "next/image";
import ImagePopover from "../ImagePopover";

// TODO: Finish this

export const Projects: ProjectType[] = [
    {
        name: "Digital Icon Market",
        logo: hippologo,
        type: "Website",
        role: "Lead Developer",
        date: "2023 - Present",
        technologies: ["Next.js", "Payload CMS", "Tailwind CSS"],
        description:
            <>
                {"As I develop this website, I'm using "}
                <RadixLink href="https://nextjs.org/" target="_blank">Next.js</RadixLink>
                {" for its powerful React framework, which makes rendering and routing super efficient. I'm relying on "}
                <RadixLink href="https://payloadcms.com/" target="_blank">Payload</RadixLink>
                {" for backend data handling to seamlessly integrate with the front end. This also allows users to manage all of their website data from the Payload integrated dashboard. For crafting a visually appealing interface, I'm turning to "}
                <RadixLink href="https://tailwindcss.com/" target="_blank">Tailwind CSS</RadixLink>
                {" with its utility-first approach and extensive customization options. This stack harmonizes my development process and helps deliver a polished website that seamlessly integrates front-end and back end functionalities."}
            </>,
        pictures: [
            { text: "Home Page", src: homepage, last: false },
            { text: "Dashboard", src: dashboardpage, last: false },
            { text: "Login Page", src: loginpage, last: false },
            { text: "Cart Page", src: cartpage, last: true },
        ]
    },
    {
        name: "Music at Drexel",
        logo: musicatdrexel,
        type: "Website",
        role: "Full Stack Developer",
        date: "2023",
        technologies: ["React", "Express", "MongoDB"],
        description:
            <>
                {"This was my first project in undergrad where I experienced working with a full team of developers in an Agile workflow. I integrated "}
                <RadixLink href="https://www.npmjs.com/package/express">Express</RadixLink>
                {" as the framework for the backend. We used this to authenticate cookies, connect with other APIs such as Spotify, and deliver verification emails to users. On the front end, we utilized "}
                <RadixLink href="https://react.dev/">React</RadixLink>
                {" to achieve a smooth user experience."}
            </>,
        pictures: [
            { text: "About Page", src: aboutpage, last: false },
            { text: "Home Page", src: drexelhomepage, last: false },
            // { text: "Connect Page", src: connectpage, last: false },
            { text: "Shows Page", src: showspage, last: false },
            { text: "Email Verification", src: verifyemailpage, last: false },
            { text: "Sign Up Completion", src: completesignup, last: true }
        ]
    },
    {
        name: "Vaeleth",
        logo: vaeleth,
        type: "Discord Bot",
        role: "Lead Developer",
        date: "2019 - 2022",
        technologies: ["Node.js", "SQLite", "Discord API"],
        description:
            <>
                {"My first ever coding project. I started this in 2019 when I was a kid with very little coding experience. In 2020, I got it "}
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
                    <Text color="teal" className="hover:underline">verified</Text>
                </Tooltip>
                {" on Discord. It had many features spanning from a great RPG economy to moderation modules. At its peak, it had over "}
                <Text color="teal">100,000</Text>
                {" users and was in over "}
                <Text color="teal">200</Text>
                {" different servers. I discontinued this in 2022 because of events in my life, but this was hands down the favorite thing I created."}
            </>,
        pictures: [
            { text: "Campaign", src: pokemoncampaign, last: false },
            { text: "Competition", src: nitrocompetition, last: true },
        ]
    }
]

const ProjectCard = ({
    project,
    key
}: {
    project: ProjectType,
    key: number
}) => {
    return (
        <Card size="2" className="flex flex-col dark:shadow-card_dark" key={key}>
            <div className="flex items-center pb-2">
                <Image
                    src={project.logo}
                    alt="Vaeleth"
                    className="xl:w-12 lg:w-12 md:w-10 sm:w-9 w-20 mr-2"
                // for like the glow effect:
                // style={{ boxShadow: "rgb(0, 149, 255) 0px 8px 80px -24px" }}
                />
                <div className="flex flex-col">
                    <Text
                        className="flex sm:gap-3 sm:flex-row flex-col sm:items-center"
                        size={{
                            lg: "8",
                            md: "8",
                            sm: "7",
                            initial: "7"
                        }}>
                        {project.name}
                        <Separator orientation="vertical" className="sm:!block !hidden" size="2" />
                        <span className="opacity-50 font-light sm:text-2xl text-sm">{project.type}</span>
                    </Text>
                    <Text size={{
                        lg: "3",
                        md: "3",
                        sm: "2",
                        initial: "2"
                    }}>
                        {project.role}
                        <span className="opacity-50 font-light">{` (${project.date})`}</span>
                    </Text>
                </div>
            </div>
            <Separator size="4" />
            <div className="flex flex-row gap-2 pt-1 pb-1 opacity-60 items-center">
                {project.technologies.map((technology, index) => (
                    <>
                        <Text key={index}>
                            {technology}
                        </Text>
                        {index !== project.technologies.length - 1 && (
                            <Separator size="1" orientation="vertical" />
                        )}
                    </>
                ))}
            </div>
            <Separator size="4" />
            <Text as="p" size="3" className="pt-2">
                {project.description}
            </Text>
            <Separator size="4" className="mt-2 mb-2" />
            {"Pictures:"}
            <div className="flex flex-row flex-wrap gap-3 mt-2">
                {
                    project.pictures.map((image, index) => (
                        <ImagePopover image={image} key={index} />
                    ))
                }
            </div>
        </Card>
    )
}

const ProjectCards = ({
    card
}: {
    card?: "Vaeleth" | "Music at Drexel" | "Digital Icon Market"
}) => {
    return (
        <>
            {!card && (
                <>
                    {Projects.map((project, index) => (
                        <ProjectCard project={project} key={index} />
                    ))}
                </>
            )}
            {card && (() => {
                const specificProject = Projects.find(project => project.name.toLowerCase() === card.toLowerCase());
                if (!specificProject) {
                    throw new Error(`Invalid card type: ${card}`);
                }
                return <ProjectCard project={specificProject} key={0} />
            })()}
        </>
    )
}

export default ProjectCards;
