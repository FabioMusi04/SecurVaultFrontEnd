import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export interface CustomAlertProps {
    title: string;
    message: string;
    severity: string;
}

export function CustomAlert({ title, message, severity }: CustomAlertProps) {
    let icon = null;
    let color = '';
    if (severity === 'error') {
        icon = <IconInfoCircle color="red" />;
        color = 'red';
    }
    else if (severity === 'warning') {icon = <IconInfoCircle color="yellow" />; color = 'yellow';}
    else if (severity === 'success') {icon = <IconInfoCircle color="green" />; color = 'green';}
    else if (severity === 'info') {icon = <IconInfoCircle color="blue" />; color = 'blue';}
    else {icon = <IconInfoCircle />; color = 'gray';}
    return (
        title === '' && message === '' && severity === '' ? null :
        <Alert variant="light" color={color} radius="lg" title={title} icon={icon} m={10} style={{border: '1px solid white'}}>
            {message}
        </Alert>
    );
}