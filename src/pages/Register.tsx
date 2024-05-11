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
export function RegisterPage() {
    return (
        <Container size={420} my={40}>
            <Title ta="center">
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                You already have an account?{' '}
                <Anchor size="sm" component="button">
                    Sign in here
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <TextInput label="Username" placeholder="Your username" required mt="md" />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <PasswordInput label="Confirm password" placeholder="Your password" required mt="md" />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="I agree to terms and conditions" />
                </Group>
                <Button fullWidth mt="xl">
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}