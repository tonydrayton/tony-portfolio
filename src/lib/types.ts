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

interface WakatimeStat {
	decimal: string;
	digit: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	text: string;
	total_seconds: number;
}

export interface WakatimeSummaryResult {
	data: {
		categories: WakatimeStat[];
		editors: WakatimeStat[];
		languages: WakatimeStat[];
		operating_systems: WakatimeStat[];
		daily_average: number;
		daily_average_including_other_language: number;
		days_including_holidays: number;
		days_minus_holidays: number;
		holidays: number;
		human_readable_daily_average: string;
		human_readable_daily_average_including_other_language: string;
		human_readable_total: string;
		human_readable_range: string;
		human_readable_total_including_other_language: string;
		is_already_updating: boolean;
		is_including_today: boolean;
		is_cached: boolean;
		is_coding_activity_visible: boolean;
		is_other_usage_visible: boolean;
		is_stuck: boolean;
		is_up_to_date: boolean;
		is_up_to_date_pending_future: boolean;
		percent_calculated: number;
		range: string;
		status: string;
		timeout: number;
		total_seconds: number;
		total_seconds_including_other_language: number;
		user_id: string;
		username: string;
		id: string;
	}
}
