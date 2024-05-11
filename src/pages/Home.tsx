import { Image, Container, Text, Button, Grid, Title, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
export function HomePage() {
    const navigate = useNavigate();
    document.title = "Home | Startup Landing";
    document.body.style.background = "linear-gradient(to right bottom, #7078f4, #db6b80) no-repeat center center fixed";

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container size="lg" style={{ textAlign: 'center'}} fluid>
                <Card style={{ marginBottom: '20px', boxShadow: '0 0 300px black' }} bg="linear-gradient(to right bottom, #3f2f76, #252b50 50%, #3f2f76) no-repeat center center fixed">
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                            <Title order={1} size="h1" fz={75} fw={700} style={{
                                textShadow:
                                    "-1px -1px 0 black, 0   -1px 0 black,1px -1px 0 black,1px  0   0 black,1px  1px 0 black, 0    1px 0 black,-1px  1px 0 black,-1px  0   0 black"
                            }}>
                                Secur
                            </Title>
                            <Title order={1} fw={700} fz={75} c="purple" style={{
                                textShadow:
                                    "-1px -1px 0 white, 0   -1px 0 white,1px -1px 0 white,1px  0   0 white,1px  1px 0 white, 0    1px 0 white,-1px  1px 0 white,-1px  0   0 white"
                            }}>
                                Vault
                            </Title>
                            <Text size="lg" component='span'>
                                <Text fw={700} mt={"5%"} >Secure your passwords with SecurVault. </Text> 
                                SecurVault is a password manager that helps you to store your passwords securely.
                                It uses the latest encryption technology to protect your data.
                                <br/><Text fw={700} mt={"5%"} >The best password manager for your business.</Text>
                            </Text>
                            <Grid mt={"5%"}>
                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <Button size="lg" fullWidth onClick={() =>  navigate("/login")}>
                                        Get Started
                                    </Button>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                                    <Button size="lg" fullWidth variant="light" onClick={() =>  navigate("/learnmore")}>
                                        Learn More
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6, lg: 6 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                radius="md"
                                h="100%"
                                w="50%"
                                fit="contain"
                                src="/MainImage.jpeg"
                                alt="Startup Landing"
                            />
                        </Grid.Col>
                    </Grid>
                </Card>
            </Container>
        </div>
    );
};