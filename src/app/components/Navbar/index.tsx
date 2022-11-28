import React, { useState } from 'react';
import { Navbar as NavbarApp, NavLink } from '@mantine/core';
import { Link, useLocation, useParams } from 'react-router-dom';

interface Props {
  open: boolean;
}

const data = [
  {
    label: 'Menu 1',
  },
  {
    label: 'Menu 2',
  },
  {
    label: 'Menu 3',
  },
];

export default function Navbar(props: Props) {
  // const { id } = useParams();
  const { pathname } = useLocation();
  const indexActive = Number(pathname.split('/')[2]) - 1;

  return (
    <NavbarApp
      width={{ sm: 200, lg: 300 }}
      hiddenBreakpoint="sm"
      hidden={!props.open}
    >
      {data.map((item, index) => (
        <Link
          to={`/menu/${index + 1}`}
          style={{ textDecoration: 'none' }}
          key={index}
        >
          <NavLink label={item.label} active={index == indexActive} />
        </Link>
      ))}
    </NavbarApp>
  );
}
