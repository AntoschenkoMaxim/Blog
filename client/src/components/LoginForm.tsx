import React, { FC, useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from '@mantine/core';

import { useForm } from 'react-hook-form'
import { validationData } from '../constants'

	const { store } = useContext(Context)

  const [user, setUser] = useState<ILoginForm>({
    email: '',
    password: '',
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
			> Welcome back!
			</Title>
			<Text color='dimmed' size='sm' align='center' mt={5}>
				Do not have an account yet?{' '}
				<Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
					Create account
				</Anchor>
			</Text>
			<Paper withBorder shadow='md' radius='md' p={30} mt={30}>
				<TextInput
          {...register('email', {
            required: {
              value: validationData.email.required,
              message: validationData.email.requiredErrorMessage,
            },
            pattern: {
              value: validationData.email.regex,
              message: validationData.email.regexErrorMessage,
            },
          })}
          error={errors?.email?.message}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          label='Email'
					placeholder='test@gmail.com'
					required
				/>
				<PasswordInput
          {...register('password', {
            required: {
              value: validationData.password.required,
              message: validationData.password.requiredErrorMessage,
            },
            pattern: {
              value: validationData.password.regex,
              message: validationData.password.regexErrorMessage,
            },
          })}
          error={errors?.password?.message}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
					placeholder='Your password'
					required
					mt='md'
				/>
				<Group position='apart' mt='lg'>
					<Checkbox label='Remember me?' sx={{ lineHeight: 1 }} />
				</Group>
        <Button fullWidth mt='xl' disabled={!isValid} onClick={() => store.login(user)}>
			</Paper>
		</Container >
	)
}

export default observer(LoginForm) 