import i18next from 'i18next';
import { i18n } from 'locales/i18n';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHomepageSlice } from './slice';
import { selectUsername } from './slice/selectors';
import { AppShell, Footer, Header, Navbar } from '@mantine/core';

export function HomePage() {
  const [newData, setNewData] = React.useState<string>('');
  const { t, i18n } = useTranslation();
  const { actions } = useHomepageSlice();
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);

  const handleChange = () => {
    dispatch(actions.changeUsername(newData));
    setNewData('');
  };

  const changeLanguage = () => {
    i18n.changeLanguage('vi');
  };

  // const title = 'Trang chủ';

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={'calc(100% - 60px)'} p="xs">
            {/* Navbar content */}
          </Navbar>
        }
        header={
          <Header height={60} p="xs">
            {/* Header content */}
          </Header>
        }
        footer={
          <Footer p="xs" height={60}>
            {}
          </Footer>
        }
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
      </AppShell>

      {/* <h1>{t('title')}</h1>
      <h3>Trang chủ</h3>
      <p>Username: {username?.username}</p>
      <input
        type="text"
        value={newData}
        onChange={e => setNewData(e.target.value)}
      />
      <button onClick={handleChange}>Change</button>

      <select
        value={i18n.language}
        onChange={e => {
          i18n.changeLanguage(e.target.value);
        }}
      >
        <option value="en">en</option>
        <option value="vi">vi</option>
      </select> */}
    </>
  );
}
