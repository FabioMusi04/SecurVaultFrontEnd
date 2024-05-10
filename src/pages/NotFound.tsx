import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from '../components/Illustration.tsx';
import classes from '../styles/NotFound.module.css';

export function NothingFoundBackground() {
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
            <Button size="md">Take me back to home page</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}