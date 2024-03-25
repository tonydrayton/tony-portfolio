import { LanyardUser } from "@/lib/lanyard"
import { getDiscordActivityImage } from "@/lib/utils"
import { Strong, Text } from "@radix-ui/themes"
import Image from "next/image"

const ActivityDetails = ({ userData }: { userData: LanyardUser }) => {
    return (
        <div className="overflow-hidden pt-2 flex flex-row">
            {getDiscordActivityImage(userData.activities) && (
                <Image
                    src={getDiscordActivityImage(userData.activities)!}
                    width={40}
                    height={40}
                    className='rounded-md mr-2 pointer-events-none '
                    objectFit="cover"
                    alt='Activity' />
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
                    {userData.activities[0].state || userData.activities[0].details}
                </Text>
            </span>
        </div>
    )
}

export default ActivityDetails;