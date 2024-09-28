import { ImageComponentData, VideoComponentData } from "@/lib/utils"
import { Popover, Link as RadixLink, Separator, Text } from "@radix-ui/themes"
import Image from "next/image"
import ReactPlayer from "react-player";

const VideoPopover = ({
	video,
	key
}: {
	video: VideoComponentData,
	key: number
}) => {
	return (
		<>
			<Popover.Root key={key}>
				<Popover.Trigger>
					<RadixLink className="w-fit hover:cursor-pointer">
						<Text color="blue">{video.text}</Text>
					</RadixLink>
				</Popover.Trigger>
				<Popover.Content maxWidth={{
					md: "700px",
					sm: "400px",
					initial: "350px"
				}}>
					<ReactPlayer
						url={video.path}
						loop={true}
						controls={true}
						playing={true}
						light={false}
						pip={true}
					/>
				</Popover.Content>
			</Popover.Root>
			{!video.last && <Separator size="2" orientation="vertical" style={{ height: "unset" }} />}
		</>
	)
}

export default VideoPopover;
