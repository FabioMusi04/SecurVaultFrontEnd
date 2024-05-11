import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function RegisterPage() {
    const navigate = useNavigate();
    document.title = "Login";
    document.body.style.backgroundColor = "#525461";

    const onSubmit = () => {
        console.log(credentials);
        if (credentials.email.trim() === '' || credentials.password.trim() === '' || credentials.username.trim() === '' || credentials.confirmPassword.trim() === '') {
            return;
        }
        if (credentials.password !== credentials.confirmPassword) {
            return;
        }
        if (!credentials.agreeTerms) {
            return;
        }
    };

    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    return (
        <Container size={420} my={40}>
            <Title ta="center">
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                You already have an account?{' '}
                <Anchor size="sm" component="button" onClick={() => navigate("/login")}>
                    Sign in here
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" bg="linear-gradient(to right top, #282a37, #555a66)">
                <TextInput label="Email" placeholder="you@mantine.dev" required value={credentials.email} onChange={(e) => setCredentials({
                    ...credentials,
                    email: e.target.value
                })} />
                <TextInput label="Username" placeholder="Your username" required mt="md" value={credentials.username} onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value
                })} />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" value={credentials.password} onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })} />
                <PasswordInput label="Confirm password" placeholder="Your password" required mt="md" value={credentials.confirmPassword} onChange={(e) => setCredentials({
                    ...credentials,
                    confirmPassword: e.target.value
                })} />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="I agree to terms and conditions" checked={credentials.agreeTerms} onChange={() => setCredentials({
                        ...credentials,
                        agreeTerms: !credentials.agreeTerms
                    })} />
                </Group>
                <Button fullWidth mt="xl" onClick={() => onSubmit()}>
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}