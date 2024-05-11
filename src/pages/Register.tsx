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

import { CustomAlert, CustomAlertProps } from '../components/CustomAlert.tsx';

import axiosConf from "../axios/axiosConf.ts"

export function RegisterPage() {
    const navigate = useNavigate();
    document.title = "Login";
    document.body.style.backgroundColor = "#525461";

    const onSubmit = () => {
        console.log(credentials);
        if (credentials.email.trim() === '' || credentials.password.trim() === '' || credentials.username.trim() === '' || credentials.confirmPassword.trim() === '') {
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
        if (credentials.password !== credentials.confirmPassword) {
            setAlert({
                title: 'Error',
                message: 'Passwords do not match',
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
        if (!credentials.agreeTerms) {
            setAlert({
                title: 'Error',
                message: 'Please agree to terms and conditions',
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

        axiosConf.post('/auth/register', {
            email: credentials.email,
            username: credentials.username,
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
            console.error(err.response.data);
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
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
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