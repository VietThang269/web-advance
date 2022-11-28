import {
  Alert,
  Button,
  Center,
  Container,
  Flex,
  Loader,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { userActions, useUserSlice } from 'store/app/user/slice';
import { selectorUser } from 'store/app/user/slice/selector';
import { PayLoadUser } from 'store/app/user/slice/types';

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
        value.length < 1 ? (
          <Text>{t('LoginPage.validateUsername')}</Text>
        ) : null,
      password: value =>
        value.length < 1 ? (
          <Text>{t('LoginPage.validatePassword')}</Text>
        ) : null,
    },
  });

  const handleLogin = (data: PayLoadUser) => {
    dispatch(userActions.loginRequest(data));
    form.reset();
  };

  return (
    <>
      {user?.user?.id !== 0 && <Navigate to={'/'} replace={true} />}

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
          <Title order={1} mb={'15px'}>
            {t('LoginPage.login')}
          </Title>
          {user?.error !== 0 && (
            <Alert
              color="red"
              sx={{
                margin: '10px 0',
              }}
            >
              {user?.message}
            </Alert>
          )}
          <form onSubmit={form.onSubmit(handleLogin)}>
            <Flex direction={'column'} gap={'1rem'}>
              <TextInput
                label={t('LoginPage.username')}
                placeholder={t('LoginPage.username')}
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label={t('LoginPage.password')}
                placeholder={t('LoginPage.password')}
                {...form.getInputProps('password')}
              />
              <Button w={'100%'} type="submit">
                {user?.isLoading && (
                  <Loader color="white" size="sm" sx={{ marginRight: 5 }} />
                )}
                <Text>{t('LoginPage.login')}</Text>
              </Button>
            </Flex>
          </form>
        </Container>
      </Center>
    </>
  );
}
