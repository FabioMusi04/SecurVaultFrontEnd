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
import { useState, useEffect } from 'react';

import { CustomAlert, CustomAlertProps } from '../components/CustomAlert.tsx';

import axiosConf from "../axios/axiosConf.ts"

export function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('SecurVaultToken')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    useEffect(() => {
        document.title = "Login";
        document.body.style.backgroundColor = "#525461";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const onSubmit = () => {
        console.log(credentials);
        if (credentials.email.trim() === '' || credentials.password.trim() === '') {
            setAlert({
                title: 'Error',
                message: 'Please fill in all fields',
                severity: 'error',
            });
            setTimeout(() => {
                setAlert({
                    title: '',
                    message: '',
                    severity: '',
                });
            }, 3000);
            return;
        }
        axiosConf.post('/auth/login', {
            email: credentials.email,
            password: credentials.password
        }).then((res) => {
            if (res.status !== 200) {
                setAlert({
                    title: 'Error',
                    message: 'Invalid email or password',
                    severity: 'error',
                });
                setTimeout(() => {
                    setAlert({
                        title: '',
                        message: '',
                        severity: '',
                    });
                }, 3000);
                return;
            }
            localStorage.setItem('SecurVaultToken', res.data.token);
            navigate('/dashboard');
        }).catch((err) => {
            console.error(err);
            setAlert({
                title: 'Error',
                message: err.response.data.error || 'An error occurred',
                severity: 'error',
            });
            setTimeout(() => {
                setAlert({
                    title: '',
                    message: '',
                    severity: '',
                });
            }, 3000);
        });
    };

    const [credentials, setCredentials] = useState({
        email: 'admin@gmail.com',
        password: 'Admin@123',
        remember: false
    });

    const [alert, setAlert] = useState<CustomAlertProps>({
        title: '',
        message: '',
        severity: '',
    });


    return (
        <Container size={420} my={40}>
            <CustomAlert {...alert} />
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