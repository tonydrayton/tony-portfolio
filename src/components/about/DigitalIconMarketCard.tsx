import { Card, Popover, Separator, Text, Tooltip, Link as RadixLink, Link } from "@radix-ui/themes"
import Image, { StaticImageData } from "next/image"
import hippologo from "../../../public/digitaliconmarket/logo.png";
import homepage from "../../../public/digitaliconmarket/homepage.png"
import dashboardpage from "../../../public/digitaliconmarket/dashboard.png"
import loginpage from "../../../public/digitaliconmarket/login.png"
import cartpage from "../../../public/digitaliconmarket/cart.png"
import { ImageComponentData } from "@/lib/utils";
import ImagePopover from "../ImagePopover";

const images: ImageComponentData[] = [
    { text: "Home Page", src: homepage, last: false },
    { text: "Dashboard", src: dashboardpage, last: false },
    { text: "Login Page", src: loginpage, last: false },
    { text: "Cart Page", src: cartpage, last: true },
];

const DigitalIconMarketCard = () => {
    return (
        <Card size="2" className="flex flex-col dark:shadow-card_dark">
            <div className="flex items-center pb-2">
                <Image
                    src={hippologo}
                    alt="Digital Icon Market"
                    className="xl:w-12 lg:w-12 md:w-10 sm:w-9 w-20 mr-2"
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
                        Digital Icon Market
                        <Separator orientation="vertical" className="sm:!block !hidden" size="2" />
                        <span className="opacity-50 font-light sm:text-2xl text-sm">Website</span>
                    </Text>
                    <Text size={{
                        lg: "3",
                        md: "3",
                        sm: "2",
                        initial: "2"
                    }}>
                        Lead Developer
                        <span className="opacity-50 font-light">{" (2023 - Present)"}</span>
                    </Text>
                </div>
            </div>
            <Separator size="4" />
            <div className="flex flex-row gap-2 pt-1 pb-1 opacity-60 items-center">
                <Text>
                    Next.js
                </Text>
                <Separator size="1" orientation="vertical" />
                <Text>
                    Payload
                </Text>
                <Separator size="1" orientation="vertical" />
                <Text>
                    MongoDB
                </Text>
            </div>
            <Separator size="4" />
            <Text as="p" size="3" className="pt-2">
                {"As I develop this website, I'm using "}
                <Link href="https://nextjs.org/" target="_blank">Next.js</Link>
                {" for its powerful React framework, which makes rendering and routing super efficient. I'm relying on "}
                <Link href="https://payloadcms.com/" target="_blank">Payload</Link>
                {" for backend data handling to seamlessly integrate with the front end. This also allows users to manage all of their website data from the Payload integrated dashboard. For crafting a visually appealing interface, I'm turning to "}
                <Link href="https://tailwindcss.com/" target="_blank">Tailwind CSS</Link>
                {" with its utility-first approach and extensive customization options. This stack harmonizes my development process and helps deliver a polished website that seamlessly integrates front-end and back end functionalities."}
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

export default DigitalIconMarketCard;
