import React from 'react';
import { Footer as FooterApp, Title } from '@mantine/core';

export default function Footer() {
  return (
    <FooterApp height={60} p={'10px 5%'}>
      <Title order={2} color="blue">
        Footer
      </Title>
    </FooterApp>
  );
}
