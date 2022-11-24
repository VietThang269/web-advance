import React from 'react';
import { Navbar as NavbarApp, NavLink } from '@mantine/core';
export default function Navbar() {
  return (
    <NavbarApp width={{ base: 300 }}>
      <NavLink label="Menu 1" active />
      <NavLink label="Menu 2" />
      <NavLink label="Menu 3" />
    </NavbarApp>
  );
}
