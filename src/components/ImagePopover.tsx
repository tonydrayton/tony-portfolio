import { ImageComponentData } from "@/lib/utils"
import { Popover, Link as RadixLink, Separator, Text } from "@radix-ui/themes"
import Image from "next/image"

const ImagePopover = ({
    image,
    key
}: {
    image: ImageComponentData,
    key: number
}) => {
    return (
        <>
            <Popover.Root key={key}>
                <Popover.Trigger>
                    <RadixLink className="w-fit hover:cursor-pointer">
                        <Text color="blue">{image.text}</Text>
                    </RadixLink>
                </Popover.Trigger>
                <Popover.Content>
                    <Image
                        src={image.src}
                        alt={image.text}
                        data-loaded='false'
                        onLoad={event => {
                            event.currentTarget.setAttribute('data-loaded', 'true')
                        }}
                        className='w-auto xxs:w-80 data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10'
                    />
                </Popover.Content>
            </Popover.Root>
            {!image.last && <Separator size="2" orientation="vertical" style={{ height: "unset" }} />}
            </>
    )
}

export default ImagePopover;