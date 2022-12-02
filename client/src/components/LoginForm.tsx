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

const LoginForm: FC = () => {

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)

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
					value={email}
					onChange={e => setEmail(e.target.value)}
					label='Email'
					placeholder='test@gmail.com'
					required
				/>
				<PasswordInput
					value={password}
					onChange={e => setPassword(e.target.value)}
					label='Password'
					placeholder='Your password'
					required
					mt='md'
				/>
				<Group position='apart' mt='lg'>
					<Checkbox label='Remember me?' sx={{ lineHeight: 1 }} />
				</Group>
				<Button fullWidth mt='xl' onClick={() => store.login(email, password)}>Login</Button>
			</Paper>
		</Container >
	)
}

export default observer(LoginForm) 