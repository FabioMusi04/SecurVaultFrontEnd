import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export interface CustomAlertProps {
    title: string;
    message: string;
    severity: string;
}

export function CustomAlert({ title, message, severity }: CustomAlertProps) {
    let icon = null;
    if (severity === 'error') icon = <IconInfoCircle color="red" />;
    else if (severity === 'warning') icon = <IconInfoCircle color="yellow" />;
    else if (severity === 'success') icon = <IconInfoCircle color="green" />;
    else if (severity === 'info') icon = <IconInfoCircle color="blue" />;
    else icon = <IconInfoCircle />;
    return (
        title === '' && message === '' && severity === '' ? null :
        <Alert variant="light" color="red" radius="lg" title={title} icon={icon} m={10} style={{border: '1px solid white'}}>
            {message}
        </Alert>
    );
}