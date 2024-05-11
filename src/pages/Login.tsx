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

export function LoginPage() {
    const navigate = useNavigate();
    document.title = "Login";
    document.body.style.backgroundColor = "#525461";

    const onSubmit = () => {
        console.log(credentials);
        if (credentials.email.trim() === '' || credentials.password.trim() === '') {
            return;
        }
    };

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        remember: false
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center">
                Welcome back!
            </Title>
            <Text c="white" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button" onClick={() => navigate("/register")}>
                    Create account
                </Anchor>
            </Text>
            <Paper withBorder shadow="lg" p={30} mt={30} radius="md" bg="linear-gradient(to right top, #282a37, #555a66)">
                <TextInput label="Email" placeholder="you@mantine.dev" required value={credentials.email} onChange={(e) => setCredentials({
                    ...credentials,
                    email: e.target.value
                })} />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" value={credentials.password} onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })} />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" checked={credentials.remember} onChange={() => setCredentials({
                        ...credentials,
                        remember: !credentials.remember
                    })} />
                    <Anchor component="button" size="sm" onClick={() => navigate("/forgotpassword")}>
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl" onClick={() => onSubmit()}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}