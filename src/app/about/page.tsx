import Container from "@/components/Container";
import { Card, Grid, Text } from "@radix-ui/themes";

const AboutPage = () => {
    return (
        <Container>
            <Grid>
                <Card>
                    <Text weight="bold">
                        About Me
                    </Text>
                    
                </Card>
            </Grid>
        </Container>
    )
}

export default AboutPage;