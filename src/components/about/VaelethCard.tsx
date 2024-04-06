import { Card, Popover, Separator, Text, Tooltip, Link as RadixLink } from "@radix-ui/themes"
import Image from "next/image"
import vaeleth from "../../../public/vaeleth.png"
import botdeveloper from "../../../public/earlybotdeveloper.svg";
import pokemoncampaign from "../../../public/pokemoncampaign.png";
import nitrocompetition from "../../../public/nitrocompetition.png";
import { ImageComponentData } from "@/lib/utils";
import ImagePopover from "../ImagePopover";

const images: ImageComponentData[] = [
    { text: "Campaign", src: pokemoncampaign, last: false },
    { text: "Competition", src: nitrocompetition, last: true },
];

const VaelethCard = () => {
    return (
        <Card size="2" className="flex flex-col dark:shadow-card_dark">
            <div className="flex items-center pb-2">
                <Image
                    src={vaeleth}
                    alt="Vaeleth"
                    className="xl:w-12 lg:w-12 md:w-10 sm:w-9 w-20 mr-2"
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
                        Vaeleth
                        <Separator orientation="vertical" className="sm:!block !hidden" size="2" />
                        <span className="opacity-50 font-light sm:text-2xl text-sm">Discord Bot</span>
                    </Text>
                    <Text size={{
                        lg: "3",
                        md: "3",
                        sm: "2",
                        initial: "2"
                    }}>
                        Lead Developer
                        <span className="opacity-50 font-light">{" (2019 - 2022)"}</span>
                    </Text>
                </div>
            </div>
            <Separator size="4" />
            <div className="flex flex-row gap-2 pt-1 pb-1 opacity-60 items-center">
                <Text>
                    Node.js
                </Text>
                <Separator size="1" orientation="vertical" />
                <Text>
                    SQLite
                </Text>
                <Separator size="1" orientation="vertical" />
                <Text>
                    Discord API
                </Text>
            </div>
            <Separator size="4" />
            <Text as="p" size="3" className="pt-2">
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
            </Text>
            <Separator size="4" className="mt-2 mb-2" />
            {
                // TODO: Add more pictures
            }
            Pictures:
            <div className="flex flex-row flex-wrap gap-3 mt-2">
            {
                images.map((image, index) => (
                    <ImagePopover image={image} key={index}/>
                ))
            }
            </div>
        </Card>
    )
}

export default VaelethCard;
