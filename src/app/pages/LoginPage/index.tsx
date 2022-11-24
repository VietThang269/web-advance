import {
  Button,
  Center,
  Container,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

export default function LoginPage() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    // validate: {
    //   username: value => (value.length < 2 ? 'Too short' : null),
    //   password: value => (value.length < 2 ? 'Too short' : null),
    // },
  });

  return (
    <Center
      h={'100vh'}
      sx={theme => ({
        backgroundImage: theme.fn.gradient(),
        color: theme.colors.blue[7],
      })}
    >
      <Container
        w={400}
        p="30px 20px"
        bg={'white'}
        sx={theme => ({
          borderRadius: '10px',
        })}
      >
        <Title order={1} mb={'10px'}>
          LOGIN
        </Title>
        <form onSubmit={form.onSubmit(console.log)}>
          <Flex direction={'column'} gap={'1rem'}>
            <TextInput
              label="Username"
              placeholder="Username"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps('password')}
            />
            <Button w={'100%'} type="submit">
              Login
            </Button>
          </Flex>
        </form>
      </Container>
    </Center>
  );
}
