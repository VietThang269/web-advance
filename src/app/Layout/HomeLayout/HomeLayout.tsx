import React from 'react';
import { AppShell, Text } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import Navbar from 'app/components/Navbar';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <AppShell
        navbarOffsetBreakpoint="sm"
        padding="md"
        navbar={<Navbar open={open} />}
        header={<Header open={open} setOpen={setOpen} />}
        footer={<Footer />}
        styles={theme => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
        {/* <Text></Text> */}
        <Outlet />
      </AppShell>
    </>
  );
}
