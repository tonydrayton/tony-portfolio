import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
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

