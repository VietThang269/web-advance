import React from 'react';
import {
  Burger,
  Button,
  Flex,
  Header as HeaderApp,
  MediaQuery,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
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

  const handleLogout = () => {
    dispatch(actions.logout('logout'));
  };

  return (
    <HeaderApp height={60} p={'10px 5%'}>
      <Flex justify={'space-between'}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Title order={2} color="blue">
            Header
          </Title>
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
        {user?.user?.id !== 0 ? (
          <Button variant="light" color="blue" onClick={handleLogout}>
            {t('logout')}
          </Button>
        ) : (
          <Button
            variant="light"
            color="blue"
            onClick={() => {
              history('/login');
            }}
          >
            {t('login')}
          </Button>
        )}
      </Flex>
    </HeaderApp>
  );
}
