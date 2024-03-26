import { Card, Link, Text } from "@radix-ui/themes"

const AboutCard = () => {
    return (
        <Card size="2" className="flex flex-col max-w-lg sm:p-4 xxs:p-4">
            <div className="flex flex-col">
                <Text size={{
                    lg: "4",
                    md: "4",
                    sm: "3",
                    initial: "3"
                }}>
                    {"Hey, my name is "}<Text color="teal">{"Tony"}</Text>{", and I am a Software Enginner and Student at "}<Text color="yellow">{"Drexel Univeristy"}</Text>{". I am studying Computer Science and on track to graduate in June of 2027."}
                </Text>
                <Text className="mt-4" size={{
                    lg: "4",
                    md: "4",
                    sm: "3",
                    initial: "3"
                }}>{"I currently work at "}<Link href="https://www.alumniq.com" target="_blank">AlumnIQ</Link>{" as a Junior Software Engineer."}</Text>
            </div>
        </Card>
    )
}

export default AboutCard;