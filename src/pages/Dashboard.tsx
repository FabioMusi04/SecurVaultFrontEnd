import { Image, Container, Text, Button, Grid, Title, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export function DashboardPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('SecurVaultToken')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = "SecurVault | Dashboard";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('SecurVaultToken');
        navigate('/login');
    };

    return (
        <Container size="lg" style={{ textAlign: 'center' }} fluid>
            <Title order={1} component="h1" m={50} c="white" style={{
                textAlign: 'center', textShadow:
                    "-1px -1px 0 black, 0   -1px 0 black,1px -1px 0 black,1px  0   0 black,1px  1px 0 black, 0    1px 0 black,-1px  1px 0 black,-1px  0   0 black"
            }}>Welcome to your Password Manager Dashboard</Title>
            <Grid gutter="lg" mt={50}>
                <Grid.Col span={{ base: 12, md: 9, lg: 9 }}>
                    <Card shadow="sm">
                        <Title order={3}>Stored Passwords</Title>
                        <Text>View your stored passwords here</Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Card shadow="sm">
                        <Title order={3}>Options</Title>
                        <Button onClick={handleLogout} fullWidth color="red" mt={15}>Logout</Button>
                    </Card>
                </Grid.Col>
            </Grid>
        </Container>
    );
};