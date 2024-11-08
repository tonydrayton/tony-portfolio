// "use client"
// import { Avatar } from "@radix-ui/themes";
// import { useEffect, useState } from "react";
// import { LanyardSocketMessage, LanyardUser } from "@/lib/lanyard/types";
// import { useUserStore } from "@/stores/useUserStore";
// import { Responsive } from "@radix-ui/themes/props";

// export default function DiscordAvatar({
// 	size
// }: {
// 	size?: Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">
// }) {
// 	const {
// 		userData
// 	} = useUserStore();
// 	return (
// 		<>
// 			{userData && userData.discord_user && userData.discord_user.avatar
// 				?
// 				<Avatar
// 					size={size}
// 					radius="full"
// 					src={`https://cdn.discordapp.com/avatars/${userData?.discord_user?.id}/${userData?.discord_user?.avatar}.png`}
// 					fallback="T"
// 					color="teal"
// 					className="pointer-events-none transition-all duration-300 ease-in-out mr-3" />
// 				:
// 				<Avatar
// 					size={size}
// 					radius="full"
// 					fallback="T"
// 					color="teal"
// 					className="pointer-events-none transition-all duration-300 ease-in-out mr-3" />
// 			}
// 		</>
// 	);
// }

