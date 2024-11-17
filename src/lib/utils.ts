import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DiscordActivity } from "./lanyard/types";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getDiscordActivityImage(activities: DiscordActivity[]) {
	const activity = activities.filter(a => a.assets)[0];
	if (activities.find(a => a.name === "Minecraft")) {
		let mc = activities.find(a => a.name === "Minecraft");
		return `https://cdn.discordapp.com/app-icons/${mc?.application_id}/166fbad351ecdd02d11a3b464748f66b.png`
	}
	if (!activity || !activity.assets || !activity.assets.large_image) {
		return null;
	}
	const index = activity.assets.large_image.indexOf("/https/");
	if (index > 0) {
		const start = index + "/https/".length;
		return "https://" + activity.assets.large_image.substring(start)
	} else if (!isNaN(parseInt(activity.assets.large_image))) {
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

export const statusMap: { [key: string]: { color: string; text: string, hex: string } } = {
	dnd: { color: 'red', text: 'Do Not Disturb', hex: "#f44336" },
	online: { color: 'green', text: 'Online', hex: "#50A361" },
	idle: { color: 'yellow', text: 'Idle', hex: "#E7B54E" },
	offline: { color: 'gray', text: 'Offline', hex: "#81848D" },
};

export const getStatusColor = (status: string) => {
	return statusMap[status].hex;
}

export const tealHex = "#0ad8b6";

export interface ImageComponentData {
	text: string;
	src: StaticImageData;
	last: boolean;
}
export interface VideoComponentData {
	text: string;
	path: string;
	last: boolean;
}

export interface ProjectType {
	name: "Vaeleth" | "Music at Drexel" | "Digital Icon Market" | "Adopteam";
	logo: StaticImageData;
	type: string;
	role: string;
	date: string;
	technologies: string[];
	description: ReactNode;
	pictures: ImageComponentData[];
	videos?: VideoComponentData[];
	github?: string;
}

