import { create } from "zustand";
import { LanyardSocketMessage, LanyardUser } from "@/lib/lanyard/types";

interface UserStoreState {
	userData: LanyardUser | null;
	socket: WebSocket | null;
	heartbeat: NodeJS.Timeout | null;
	initializeSocket: () => void;
	clearHeartbeat: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
	userData: null,
	socket: null,
	heartbeat: null,

	initializeSocket: () => {
		const socket = new WebSocket("wss://api.lanyard.rest/socket");

		socket.onopen = () => {
			socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: process.env.DISCORD_ID } }));
		};

		socket.onmessage = (event) => {
			const data: LanyardSocketMessage = JSON.parse(event.data);

			set((state) => {
				if (data.d.heartbeat_interval && !state.heartbeat) {
					const heartbeatInterval = setInterval(() => {
						socket.send(JSON.stringify({ op: 3 }));
					}, data.d.heartbeat_interval);
					return { heartbeat: heartbeatInterval };
				}

				if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
					return { userData: data.d };
				}

				return {};
			});
		};

		socket.onerror = (event) => {
			console.error('WebSocket connection error:', event);
		};

		set({ socket });
	},

	clearHeartbeat: () => {
		set((state) => {
			if (state.heartbeat) {
				clearInterval(state.heartbeat);
			}
			return { heartbeat: null };
		});
	},
}));
