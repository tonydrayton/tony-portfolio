import { Card, Popover, Separator, Text, Tooltip, Link as RadixLink, Link } from "@radix-ui/themes"
import Image from "next/image"
import vaeleth from "../../public/vaeleth.png"
import botdeveloper from "../../public/earlybotdeveloper.svg";
import pokemoncampaign from "../../public/pokemoncampaign.png";
import nitrocompetition from "../../public/nitrocompetition.png";
import musicatdrexel from "../../public/musicatdrexel.png";

const MusicAtDrexelCard = () => {
    return (
        <Card size="2" className="flex flex-col" style={{ boxShadow: "0 0 15px -10px rgba(0,0,0,.3), 0 0 25px -15px rgba(0,0,0,.2)" }}>
            <div className="flex items-center pb-2">
                <Image
                    src={musicatdrexel}
                    alt="Music At Drexel"
                    className="xl:w-12 lg:w-12 md:w-10 sm:w-9 w-20 mr-2"
                    style={{ background: "#ffffff36", borderRadius: "5px", /* boxShadow: "rgb(0, 149, 255) 0px 8px 80px -24px"*/ }}
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
                    }}>Full Stack Developer</Text>
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
            {
                // TODO: Change pictures
            }
            <div className="flex flex-row gap-5">
                <Popover.Root>
                    <Popover.Trigger>
                        <RadixLink href="#" className="w-fit"><Text color="blue">Picture 1</Text></RadixLink>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Image
                            src={pokemoncampaign}
                            alt="Pokemon Campaign"
                            className="w-auto xxs:w-80"
                        />
                    </Popover.Content>
                </Popover.Root>
                <Popover.Root>
                    <Popover.Trigger>
                        <RadixLink href="#" className="w-fit"><Text color="blue">Picture 2</Text></RadixLink>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Image
                            src={nitrocompetition}
                            alt="Nitro Competition"
                            className="w-auto xxs:w-80"
                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
        </Card>
    )
}

export default MusicAtDrexelCard;