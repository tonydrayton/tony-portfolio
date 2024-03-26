import { Card, Popover, Separator, Text, Tooltip, Link as RadixLink } from "@radix-ui/themes"
import Image from "next/image"
import vaeleth from "../../public/vaeleth.png"
import botdeveloper from "../../public/earlybotdeveloper.svg";
import pokemoncampaign from "../../public/pokemoncampaign.png";
import nitrocompetition from "../../public/nitrocompetition.png";

const VaelethCard = () => {
    return (
        <Card size="2" className="flex flex-col">
            <div className="flex items-start pb-2">
                <Image
                    src={vaeleth}
                    alt="Vaeleth"
                    className="xl:w-12 lg:w-12 md:w-10 sm:w-9 xxs:w-8 mr-2"
                    // style={{ boxShadow: "rgb(0, 149, 255) 0px 8px 80px -24px" }}
                />
                <Text size={{
                    lg: "8",
                    md: "8",
                    sm: "7",
                    initial: "7"
                }}>Vaeleth</Text>
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

export default VaelethCard;