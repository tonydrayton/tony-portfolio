export interface LanyardOptions {
	userId: string | string[];
	socket?: boolean;
	onPresenceUpdate?: (data: any) => void;
}

interface DiscordUser {
	id: string;
	username: string;
	avatar: string | null;
	discriminator: string;
	bot: boolean;
	global_name: string;
	avatar_decoration_data: any;
	display_name: string;
	public_flags: number;
}

interface LanyardError {
	message: string;
}

export interface DiscordActivity {
	application_id: string;
	assets?: {
		large_image: string;
		large_text: string;
		small_image: string;
		small_text: string;
	};
	created_at: number;
	details: string;
	flags: number;
	id: string;
	name: string;
	session_id: string;
	state: string;
	timestamps: {
		start: number;
	};
	type: number;
}

export interface LanyardUser {
	heartbeat_interval?: number;
	kv: Record<string, any>;
	spotify: null | any;
	discord_user: DiscordUser;
	activities: DiscordActivity[];
	discord_status: string;
	active_on_discord_web: boolean;
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
	listening_to_spotify: boolean;
}

interface heartbeat {
	heartbeat_interval: number;
}

export interface LanyardSocketMessage {
	op: number;
	t?: string;
	d: LanyardUser;
}

export interface LanyardData {
	data: LanyardUser;
	success: boolean;
	error: LanyardError;
}
