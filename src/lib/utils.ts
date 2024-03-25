import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DiscordActivity } from "./lanyard";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getDiscordActivityImage(activities: DiscordActivity[]) {
    const activity = activities.filter(a => a.assets)[0];
    if(!activity || !activity.assets) {
        return null;
    }
    const index = activity.assets.large_image.indexOf("/https/");
    if(index > 0) {
        const start = index + "/https/".length;
        return "https://" + activity.assets.large_image.substring(start)
    } else if(!isNaN(parseInt(activity.assets.large_image))) {
        return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
    }
    return null;
}

const colors: { [key: string]: string } = {
    dnd: "#f44336",
    online: "#50A361",
    idle: "#E7B54E",
    offline: "#81848D"
}

export const getStatusColor = (status: string) => {
    return colors[status];
}