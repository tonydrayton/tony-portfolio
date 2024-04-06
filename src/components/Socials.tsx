import { AlertDialog, Button, Flex, Link as RadixLink, Separator, Text } from "@radix-ui/themes"
import { Github, Linkedin, Mail } from "lucide-react"
import MailTo from "./MailTo"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { cn } from "@/lib/utils"

const Socials = ({
    className,
    short
}: {
    className?: string,
    short?: boolean
}) => {
    return (
        <>
            {short ? (
                <>
                    <div className={cn(className, "flex-row pt-3 pb-3")}>
                        <Flex>
                            <a href="https://github.com/tonydrayton" target="_blank" className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
                                <Github />
                            </a>

                            <a href="https://www.linkedin.com/in/tony-drayton/" target="_blank" className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
                                <Linkedin />
                            </a>
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                    <button
                                        className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300"
                                    >
                                        <Mail />
                                    </button>

                                </AlertDialog.Trigger>
                                <AlertDialog.Content>
                                    <AlertDialog.Title>Email</AlertDialog.Title>
                                    <AlertDialog.Description size="2">
                                        Are you sure? This will launch your email app.
                                    </AlertDialog.Description>

                                    <Flex gap="3" mt="4" justify="end" align="center">
                                        <AlertDialog.Cancel>
                                            <Button variant="soft" color="gray" >
                                                Cancel
                                            </Button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action>
                                            <MailTo
                                                mailto="mailto:tony.drayton@drexel.edu" className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300"
                                            >
                                                <Button color="green" className="hover:cursor-pointer">Confirm</Button>
                                            </MailTo>
                                        </AlertDialog.Action>
                                    </Flex>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        </Flex>
                    </div>
                    <Separator size="4" />
                    <div className="pt-3 flex flex-row items-center">
                        <FontAwesomeIcon icon={faDiscord} className="mr-3" style={{ maxHeight: "15px" }} />
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button variant="ghost" className="hover:cursor-pointer  hover:transition-all hover:ease-in-out hover:duration-300"
                                >@tcny</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content>
                                <AlertDialog.Title>Discord</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure? This will launch your Discord app.
                                </AlertDialog.Description>
                                <Flex gap="3" mt="4" justify="end" align="center">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray" >
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <div className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300">
                                            <Button color="green" className="hover:cursor-pointer"
                                                onClick={(e) => {
                                                    window.open(`discord://-/users/${process.env.DISCORD_ID}`)
                                                }}>Confirm</Button>
                                        </div>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </div>
                </>
            ) : (
                <>
                    <div className={cn(className, "flex flex-col")}>
                        <div className="flex p-1">
                            <a className="flex flex-row gap-3 items-center" href="https://github.com/tonydrayton" target="_blank">
                                <Github />
                                <RadixLink href="https://github.com/tonydrayton" target="_blank">github.com/tonydrayton</RadixLink>
                            </a>
                        </div>
                        <div className="flex p-1">
                            <a className="flex flex-row gap-3 items-center" href="https:/www.linkedin.com/in/tonydrayton" target="_blank">
                                <Linkedin />
                                <RadixLink href="https:/www.linkedin.com/in/tonydrayton" target="_blank">
                                    linkedin.com/in/tonydrayton
                                </RadixLink>
                            </a>
                        </div>
                        <div className="flex p-1">
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                    <button
                                        className="flex flex-row gap-3 items-center hover:brightness-110 transition-all ease-in-out duration-300"
                                    >
                                        <Mail />
                                        <Text color="teal">tony.drayton@drexel.edu</Text>
                                    </button>

                                </AlertDialog.Trigger>
                                <AlertDialog.Content>
                                    <AlertDialog.Title>Email</AlertDialog.Title>
                                    <AlertDialog.Description size="2">
                                        Are you sure? This will launch your email app.
                                    </AlertDialog.Description>

                                    <Flex gap="3" mt="4" justify="end" align="center">
                                        <AlertDialog.Cancel>
                                            <Button variant="soft" color="gray" >
                                                Cancel
                                            </Button>
                                        </AlertDialog.Cancel>
                                        <AlertDialog.Action>
                                            <MailTo
                                                mailto="mailto:tony.drayton@drexel.edu" className="p-1 brightness-90 hover:brightness-110 transition-all ease-in-out duration-300"
                                            >
                                                <Button color="green" className="hover:cursor-pointer">Confirm</Button>
                                            </MailTo>
                                        </AlertDialog.Action>
                                    </Flex>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Socials;
