import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from '../components/Illustration.tsx';
import classes from '../styles/NotFound.module.css';
import { useNavigate } from 'react-router-dom';
export function NotFoundPage() {
  document.title = "Not Found";

  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist.
          </Text>
          <Group justify="center">
            <Button size="md" onClick={() => navigate('/')}>Take me back to home page</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}