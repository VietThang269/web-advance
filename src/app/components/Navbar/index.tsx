import React, { useState } from 'react';
import { Navbar as NavbarApp, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';

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
  const [active, setActive] = useState<number>(0);

  return (
    <NavbarApp
      width={{ sm: 200, lg: 300 }}
      hiddenBreakpoint="sm"
      hidden={!props.open}
    >
      {data.map((item, index) => (
        <Link to={`/menu${index + 1}`} style={{ textDecoration: 'none' }}>
          <NavLink
            key={index}
            label={item.label}
            active={index === active}
            onClick={e => setActive(index)}
          />
        </Link>
      ))}
    </NavbarApp>
  );
}
