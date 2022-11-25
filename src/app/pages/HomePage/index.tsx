import i18next from 'i18next';
import { i18n } from 'locales/i18n';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'app/components/Header';
import Navbar from 'app/components/Navbar';
import { AppShell, Text } from '@mantine/core';
import Footer from 'app/components/Footer';

export function HomePage() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const changeLanguage = () => {
    i18n.changeLanguage('en');
  };

  React.useEffect(() => {
    changeLanguage();
  }, []);

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
        <Text>{t('content')}</Text>
      </AppShell>
    </>
  );
}
