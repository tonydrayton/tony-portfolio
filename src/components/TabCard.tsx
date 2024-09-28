import { Button, Card } from "@radix-ui/themes";
import { Hammer, UserCircle } from "lucide-react";
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
				<div className="flex flex-col gap-3">
					<Button variant="soft" className="hover:cursor-pointer" onClick={(e) => {
						e.preventDefault();
						window.location.href = "about"
					}}>
						<Link href="/about" className="flex items-center w-[-webkit-fill-available] justify-center"> <UserCircle className="mr-2" /> About Me
						</Link>
					</Button>
					{/* <Button variant="solid" className="hover:cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "projects"
                    }}>
                        <Link href="/projects" className="flex items-center">
                            <Hammer className="mr-2" /> Projects
                        </Link>
                    </Button> */}
				</div>
			</Card>
		</>
	)
}

export default TabCard;
