import { Button, Card } from "@radix-ui/themes";
import { Hammer } from "lucide-react";
import Link from "next/link";

const TabCard = () => {
    return (
        <>
            <Card
                className="transition-all duration-500 ease-in-out mt-5"
                size={{
                    lg: "4",
                    md: "3",
                    sm: "3",
                    initial: "3"
                }}>
                <div className="flex flex-col">
                    <Button variant="solid" className="hover:cursor-pointer">
                        <Link href="/projects" className="flex items-center">
                            <Hammer className="mr-2" /> Projects
                        </Link>
                    </Button>
                </div>
            </Card>
        </>
    )
}

export default TabCard;