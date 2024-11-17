interface Model {
	type: "laptop" | "phone";
	alt: string;
	textures: Texture[];
}

type Texture = {
	srcSet: string;
	placeholder: string;
}

enum ModelAnimationType {
	SpringUp = 'spring-up',
	LaptopOpen = 'laptop-open',
}

export enum MinimumWidth {
	Small = 640,
	Medium = 768,
	Large = 1024,
	ExtraLarge = 1280,
}

// Define the Position type
interface Position {
	x: number;
	y: number;
	z: number;
}

interface DeviceModel {
	url: string;
	width: number;
	height: number;
	position: Position;
	animation: ModelAnimationType;
}

interface DeviceModels {
	phone: DeviceModel;
	laptop: DeviceModel;
}


