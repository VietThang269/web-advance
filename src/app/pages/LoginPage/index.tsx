import {
  Alert,
  Button,
  Center,
  Container,
  Flex,
  Loader,
  Notification,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useInjectSaga } from 'redux-injectors';
import { userActions, useUserSlice } from 'store/app/user/slice';
import { selectorUser } from 'store/app/user/slice/selector';
import { PayLoadUser } from 'store/app/user/slice/types';
import styled from 'styled-components';

export function LoginPage() {
  const { t } = useTranslation();
  const { actions } = useUserSlice();
  const user = useSelector(selectorUser);

  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: value =>
        value.length < 1 ? 'Tên đăng nhập không thể bỏ trống' : null,
      password: value =>
        value.length < 1 ? 'Mật khẩu không thể bỏ trống' : null,
    },
  });

  const handleLogin = (data: PayLoadUser) => {
    dispatch(userActions.loginRequest(data));
  };

  return (
    <>
      {user?.user && <Navigate to={'/'} replace={true} />}

      <Center
        h={'100vh'}
        sx={theme => ({
          backgroundImage: theme.fn.gradient(),
          color: theme.colors.blue[7],
        })}
      >
        <Container
          w={{ base: 400 }}
          p="30px 20px"
          bg={'white'}
          sx={theme => ({
            borderRadius: '10px',
            '@media (max-width: 576px)': {
              width: 350,
            },
          })}
        >
          <Title order={1} mb={'10px'}>
            {t('login')}
          </Title>
          {user?.error !== 0 && <Text color="red">{user?.message}</Text>}
          <form onSubmit={form.onSubmit(handleLogin)}>
            <Flex direction={'column'} gap={'1rem'}>
              <TextInput
                label={t('username')}
                placeholder={t('username')}
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label={t('password')}
                placeholder={t('password')}
                {...form.getInputProps('password')}
              />
              <Button w={'100%'} type="submit">
                {user?.isLoading && (
                  <Loader color="white" size="sm" sx={{ marginRight: 5 }} />
                )}
                <Text>{t('login')}</Text>
              </Button>
            </Flex>
          </form>
        </Container>
      </Center>
    </>
  );
}
