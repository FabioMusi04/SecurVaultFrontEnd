import { Image, Container, Text, Button, Grid, Title, Card } from '@mantine/core';

export function HomePage() {
    document.title = "Home | Startup Landing";
    document.body.style.background = "linear-gradient(to right bottom, #262b51 75%, #403077 25%) no-repeat center center fixed";

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container size="lg" style={{ textAlign: 'center'}} fluid>
                <Card style={{ marginBottom: '20px', boxShadow: '0 0 300px black' }} bg="transparent">
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Title size="h1" fw={700}>
                                Startup
                            </Title>
                            <Title size="h1" fw={700} c="purple">
                                Landing
                            </Title>
                            <Text size="lg" mt={"5%"}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo amet
                                earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur non
                                repudiandae enim adipisci?
                            </Text>
                            <Grid mt={"5%"}>
                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <Button size="lg" fullWidth>
                                        Get Started
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <Button size="lg" fullWidth variant="light">
                                        Learn More
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Image
                                radius="md"
                                src="https://placehold.co/600x400"
                                alt="Startup Landing"
                                style={{ boxShadow: '0 0 15px black' }}
                            />
                        </Grid.Col>
                    </Grid>
                </Card>
            </Container>
        </div>
    );
};