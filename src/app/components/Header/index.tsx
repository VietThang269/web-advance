import React from 'react';
import {
  Button,
  Flex,
  Header as HeaderApp,
  ActionIcon,
  Text,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const history = useNavigate();
  return (
    <HeaderApp height={60} p={'10px 5%'}>
      <Flex justify={'space-between'}>
        <Title order={2} color="blue">
          Header
        </Title>
        <Button
          variant="light"
          color="blue"
          onClick={() => {
            history('/login');
          }}
        >
          Đăng nhập
        </Button>
      </Flex>
    </HeaderApp>
  );
}
