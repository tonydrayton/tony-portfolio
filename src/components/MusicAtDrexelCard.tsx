import { Card, Separator, Text, Link } from "@radix-ui/themes"
import Image from "next/image"
import musicatdrexel from "../../public/musicatdrexel.png";
import homepage from "../../public/musicatdrexel/homepage.png";
import aboutpage from "../../public/musicatdrexel/aboutpage.png";
import connectpage from "../../public/musicatdrexel/connectpage.png";
import showspage from "../../public/musicatdrexel/showspage.png";
import verifyemailpage from "../../public/musicatdrexel/verifyemail.png";
import completesignup from "../../public/musicatdrexel/completesignup.png";
import { ImageComponentData } from "@/lib/utils";
import ImagePopover from "./ImagePopover";

const images: ImageComponentData[] = [
    { text: "About Page", src: aboutpage, last: false },
    { text: "Home Page", src: homepage, last: false },
    { text: "Connect Page", src: connectpage, last: false },
    { text: "Shows Page", src: showspage, last: false },
    { text: "Email Verification", src: verifyemailpage, last: false },
    { text: "Sign Up Completion", src: completesignup, last: true }
];

const MusicAtDrexelCard = () => {
    return (
        <Card size="2" className="flex flex-col" style={{ boxShadow: "0 0 15px -10px rgba(0,0,0,.3), 0 0 25px -15px rgba(0,0,0,.2)" }}>
            <div className="flex items-center pb-2">
                <Image
                    src={musicatdrexel}
                    alt="Music At Drexel"
                    className="xl:w-12 lg:w-12 md:w-10 sm:w-9 w-20 mr-2 dark:drop-shadow-slight"
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
                        Music at Drexel
                        <Separator orientation="vertical" className="sm:!block !hidden" size="2" />
                        <span className="opacity-50 font-light sm:text-2xl text-sm">Website</span>
                    </Text>
                    <Text size={{
                        lg: "3",
                        md: "3",
                        sm: "2",
                        initial: "2"
                    }}>
                        Full Stack Developer
                        <span className="opacity-50 font-light">{" (2023)"}</span>
                    </Text>
                </div>
            </div>
            <Separator size="4" />
            <div className="flex flex-row gap-2 pt-1 pb-1 opacity-60 items-center">
                <Text>
                    React
                </Text>
                <Separator size="1" orientation="vertical" />
                <Text>
                    Express
                </Text>
                <Separator size="1" orientation="vertical" />
                <Text>
                    MongoDB
                </Text>
            </div>
            <Separator size="4" />
            <Text as="p" size="3" className="pt-2">
                {"This was my first project in undergrad where I experienced working with a full team of developers in an Agile workflow. I integrated "}
                <Link href="https://www.npmjs.com/package/express">Express</Link>
                {" as the framework for the backend. We used this to authenticate cookies, connect with other APIs such as Spotify, and deliver verification emails to users. On the front end, we utilized "}
                <Link href="https://react.dev/">React</Link>
                {" to achieve a smooth user experience."}
            </Text>
            <Separator size="4" className="mt-2 mb-2" />
            Pictures:
            <div className="flex flex-row flex-wrap gap-3 mt-2">
            {
                images.map((image, index) => (
                    <ImagePopover image={image} key={index} />
                ))
            }
            </div>
        </Card>
    )
}

export default MusicAtDrexelCard;