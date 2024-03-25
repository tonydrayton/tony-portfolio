interface LanyardOptions {
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

export interface LanyardSocketMessage {
    op: number;
    t: string;
    d: LanyardUser
}

interface LanyardData {
    data: LanyardUser;
    success: boolean;
    error: LanyardError;
}


const CONSTANTS = {
    API_URL: "https://api.lanyard.rest/v1",
    WEBSOCKET_URL: "wss://api.lanyard.rest/socket",
    HEARTBEAT_PERIOD: 1000 * 30
}

export const lanyard = async (opts: LanyardOptions): Promise<WebSocket | LanyardUser | LanyardUser[]> => {
    if (!opts) throw new Error("Specify an options object");
    if (!opts.userId) throw new Error("Specify a user ID");

    if (opts.socket) {
        if (!opts.onPresenceUpdate) throw new Error("Specify onPresenceUpdate callback");

        const supportsWebSocket = "WebSocket" in window || "MozWebSocket" in window;
        if (!supportsWebSocket) throw new Error("Browser doesn't support WebSocket connections.",);

        const socket = new WebSocket(CONSTANTS.WEBSOCKET_URL);
        const subscription = typeof opts.userId == "string" ? "subscribe_to_id" : "subscribe_to_ids"
        let heartbeat: NodeJS.Timeout | null = null;

        socket.addEventListener("open", () => {
            socket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        [subscription]: opts.userId,
                    },
                }),
            );

            heartbeat = setInterval(() => {
                socket.send(
                    JSON.stringify({
                        op: 3,
                    }),
                );
            }, CONSTANTS.HEARTBEAT_PERIOD);
        });

        socket.addEventListener("message", ({ data }) => {
            const { t, d } = JSON.parse(data)

            if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
                if (opts.onPresenceUpdate) {
                    opts.onPresenceUpdate(d);
                }
            }
        });

        socket.onclose = (event) => {
            try {
                console.log("Socket closed")
                if (heartbeat) {
                    clearInterval(heartbeat);
                }
                setTimeout(() => {
                    console.log("Trying to reconnect")
                    lanyard(opts)
                }, 3000)
            } catch (err) {
                console.log("Socket closed")
            }
            console.log(event)
        };
        return socket;
    } else {
        if (typeof opts.userId == "string") {
            const res = await fetch(`${CONSTANTS.API_URL}/users/${opts.userId}`);
            const body = await res.json() as LanyardData;

            if (!body.success) throw new Error(body.error?.message || "An invalid error occured");

            return body.data;
        } else {
            const val = [];

            for (const userId of opts.userId) {
                const res = await fetch(`${CONSTANTS.API_URL}/users/${userId}`);
                const body = await res.json() as LanyardData;

                if (!body.success) throw new Error(body.error?.message || "An invalid error occured");

                val.push(body.data)
            }

            return val;
        }
    }
}