import React from 'react';
import { Navbar as NavbarApp, NavLink } from '@mantine/core';

interface Props {
  open: boolean;
}

export default function Navbar(props: Props) {
  return (
    <NavbarApp
      width={{ sm: 200, lg: 300 }}
      hiddenBreakpoint="sm"
      hidden={!props.open}
    >
      <NavLink label="Menu 1" active />
      <NavLink label="Menu 2" />
      <NavLink label="Menu 3" />
    </NavbarApp>
  );
}
