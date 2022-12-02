import React from 'react';
import {
  Burger,
  Button,
  Flex,
  Header as HeaderApp,
  MediaQuery,
  Title,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUser } from 'store/app/user/slice/selector';
import { useUserSlice } from 'store/app/user/slice';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header(props: Props) {
  const { t } = useTranslation();
  const user = useSelector(selectorUser);
  const { actions } = useUserSlice();
  const dispatch = useDispatch();
  const history = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    dispatch(actions.logout('logout'));
  };

  return (
    <HeaderApp height={60} p={'10px 5%'}>
      <Flex justify={'space-between'}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Title order={2} color="blue">
              Header
            </Title>
          </Link>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={props.open}
            onClick={() => props.setOpen(prev => !prev)}
            size="sm"
            color="gray"
            mr="xl"
          />
        </MediaQuery>
        {token ? (
          <Button variant="light" color="blue" onClick={handleLogout}>
            {t('LoginPage.logout')}
          </Button>
        ) : (
          <Button
            variant="light"
            color="blue"
            onClick={() => {
              history('/login');
            }}
          >
            {t('LoginPage.login')}
          </Button>
        )}
      </Flex>
    </HeaderApp>
  );
}
