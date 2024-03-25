import { LanyardUser } from "@/lib/lanyard/types";
import { getDiscordActivityImage } from "@/lib/utils";
import { Strong, Text, Tooltip } from "@radix-ui/themes";
import Image from "next/image";
import prettyMs from "pretty-ms";

const ActivityDetails = ({ userData }: { userData: LanyardUser }) => {
    return (
        <div className="overflow-hidden pt-2 flex flex-row mt-2">
            {getDiscordActivityImage(userData.activities) && (
                userData.activities.find(a => a.assets?.large_image)?.assets?.large_text ?
                <Tooltip content={userData.activities.find(a => a.assets?.large_image)?.assets?.large_text || ''}>
                    <div>
                        <Image
                            src={getDiscordActivityImage(userData.activities)!}
                            width={40}
                            height={40}
                            className='rounded-md mr-2 pointer-events-none lg:w-auto'
                            objectFit="cover"
                            alt='Activity' />
                    </div>
                </Tooltip>
                :
                <div>
                        <Image
                            src={getDiscordActivityImage(userData.activities)!}
                            width={40}
                            height={40}
                            className='rounded-md mr-2 pointer-events-none lg:w-auto'
                            objectFit="cover"
                            alt='Activity' />
                    </div>
            )}
            {!getDiscordActivityImage(userData.activities) && (
                <div>
                    <Image
                        src={getDiscordActivityImage(userData.activities)!}
                        width={40}
                        height={40}
                        className='rounded-md mr-2 pointer-events-none lg:w-auto'
                        objectFit="cover"
                        alt='Activity' />
                </div>
            )}
            <span className='flex flex-col max-w-fit'>
                <Text
                    size={{
                        xl: "5",
                        lg: "4",
                        md: "3",
                        sm: "2",
                        xs: "2",
                        initial: "2"
                    }}>
                    <Strong>Playing</Strong> {userData.activities[0].name}
                </Text>
                <Text
                    size={{
                        xl: "4",
                        lg: "3",
                        md: "2",
                        sm: "1",
                        xs: "1",
                        initial: "1"
                    }}
                    className="overflow-hidden overflow-x-clip">
                    {userData.activities[0].state || userData.activities[0].details || `for ${prettyMs(Date.now() - userData.activities[0].timestamps.start, { compact: true, verbose: true })}`}
                </Text>
            </span>
        </div>
    );
};

export default ActivityDetails;
