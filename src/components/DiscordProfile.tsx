import React, { useEffect, useState } from 'react';
import { lanyard, LanyardSocketMessage, LanyardUser } from "@/lib/lanyard";
import { Badge, Strong, Text } from '@radix-ui/themes';
import { Circle } from 'lucide-react';
import Image from 'next/image';
import { getDiscordActivityImage } from '@/lib/utils';

interface ProfileProps {
    initialUserData: LanyardUser | null;
}

const statusMap: { [key: string]: { color: string; text: string } } = {
    dnd: { color: 'red', text: 'Do Not Disturb' },
    online: { color: 'green', text: 'Online' },
    idle: { color: 'yellow', text: 'Idle' },
    offline: { color: 'gray', text: 'Offline' },
};

const getStatusBadge = (status: string) => {
    const { color, text } = statusMap[status] || { color: 'gray', text: 'Loading' };
    return <Badge color={color as 'red' | 'green' | 'yellow' | 'gray' | 'ruby' | 'gold' | 'bronze' | 'brown' | 'amber' | 'orange' | 'tomato' | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet' | 'iris' | 'indigo' | 'blue' | 'sky' | 'cyan' | 'teal' | 'mint' | 'lime' | undefined}>{text}</Badge>;
};


const DiscordProfile: React.FC<ProfileProps> = ({ initialUserData }) => {
    const [userData, setUserData] = useState<LanyardUser | null>(initialUserData);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [image, setImage] = useState<string | null>(null);

    console.log("here");
    useEffect(() => {
        console.log("using");
        const fetchData = async () => {
            try {
                console.log("fetching");
                const data = await lanyard({
                    userId: initialUserData?.discord_user.id || '',
                    socket: true,
                    onPresenceUpdate: (data: LanyardUser) => {
                        setUserData(data);
                    }
                });
                console.log(data);
                if (data instanceof WebSocket) {
                    setSocket(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [initialUserData]);

    useEffect(() => {
        console.log("socket changed:", socket);
        if (socket) {
            socket.onmessage = (event) => {
                const data: LanyardSocketMessage = JSON.parse(event.data);
                setUserData(data.d);
            };
        } else {
            console.log("none");
        }
    }, [socket]);

    console.log(userData)

    return (
        <>
            <div className="group flex">
                {/* <span className="absolute lg:top-20 md:top-10 sm:top-0 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Discord Status</span> */}
                {userData && userData.discord_status && getStatusBadge(userData.discord_status)}
            </div>
            {/* {userData && userData.activities && userData.activities.length > 0 && (
        <div className="overflow-hidden pt-2 flex flex-row">
            {getDiscordActivityImage(userData.activities) && (
                <Image 
                src={getDiscordActivityImage(userData.activities)!}
                width={40}
                height={40}
                className='rounded-md mr-2 pointer-events-none '
                objectFit="cover"
                alt='Activity'/>
            )}
            <span className='flex flex-col max-w-fit'>
            <Text
            size={{
                xl: "4",
                lg: "3",
                md: "2",
                sm: "1",
                xs: "1"
            }}>
                <Strong>Playing</Strong> {userData.activities[0].name}
            </Text>
            <Text
            size={{
                xl: "4",
                lg: "3",
                md: "2",
                sm: "1",
                xs: "1"
            }}
            className="overflow-hidden overflow-x-clip">
                {userData.activities[0].state || userData.activities[0].details}
            </Text>
            </span>
        </div>
        )} */}
        </>

    );
};


export default DiscordProfile;
