import React, { FC, useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import {
	TextInput,
import { requirementsData, validationData } from '../constants'
	Checkbox,
	Anchor,
import { useForm } from 'react-hook-form'
	Title,
	Text,
	Container,
	Group,
	Button,
	Stepper,
	Grid,
	Col,
	FileInput,
} from '@mantine/core';
import { IconAt, IconLock, IconMailOpened, IconMap2, IconPencil, IconShieldCheck, IconUpload, IconUserCheck } from '@tabler/icons';

const RegistrationForm: FC = () => {

	//store with registration function
	const { store } = useContext(Context)

	//user information
	const [user, setUser] = useState<IRegistrationForm>(
		{ email: '', password: '', firstName: '', lastName: '', location: '' }, //image
	)

	const [image, setImage] = useState<File | null>(null)
	console.log(image)

	// stepper
	const [active, setActive] = useState<number>(0);
	const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

	return (
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IRegistrationForm>({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			location: '',
		},
	})

	const onSubmit = (
		register,
	const {
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
			>
				Welcome back!
			</Title>
			<Text color='dimmed' size='sm' align='center' mt={5}>
				Do you have an account? {' '}
				<Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
					Login
				</Anchor>
			</Text>

			<Paper withBorder shadow='md' radius='md' p={30} mt={30}>

				<Stepper active={active}>
					<Stepper.Step icon={<IconUserCheck size={18} />} />
					<Stepper.Step icon={<IconMailOpened size={18} />} />
					<Stepper.Step icon={<IconShieldCheck size={18} />} />
				</Stepper>

				{active === 1
					? <>
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
							icon={<IconAt size={16} />}
									value={user.email}
									onChange={(e) => setUser({ ...user, email: e.target.value })}
							label='Email'
							placeholder='test@gmail.com'
							required
							mt={5}
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
							icon={<IconLock size={16} />}
												value={user.password}
												onChange={(e) => setUser({ ...user, password: e.target.value })}
							label='Password'
							placeholder='Your password'
							required
							mt='md'
						/>
						<Group position='apart' mt='lg'>
							<Checkbox
								label='Agree with privacy?'
								sx={{ lineHeight: 1 }} />
						</Group>
					</>
					: active === 2
						?
						<>
							<FileInput
								icon={<IconUpload size={16} />}
								value={image}
								onChange={setImage}
								label='Image'
								placeholder='Upload image'
								mt={5}
							/>
						</>
						: active === 3
							? <>
								{isValid ? (
									<Alert
										icon={<IconCheck size={20} />}
										title='Successfully registration!'
										mt='lg'
										color='teal'
									>
										Successfully registration! Lorem Ipsum is simply dummy text of the printing and
										typesetting industry.
									</Alert>
								) : (
									<Alert
										icon={<IconX size={20} />}
										title='Unsuccessfully registration!'
										mt='lg'
										color='red'
										Unsuccessfully registration! Lorem Ipsum is simply dummy text of the printing
										and typesetting industry.
									</Alert>
								)}
							</>
							: <>
								<TextInput
								<TextInput
									{...register('firstName', {
										required: {
											value: validationData.firstName.required,
											message: validationData.firstName.requiredErrorMessage,
										},
										pattern: {
											value: validationData.firstName.regex,
											message: validationData.firstName.regexErrorMessage,
										},
									})}
									error={errors?.firstName?.message}
									icon={<IconPencil size={16} />}
									value={user.firstName}
									onChange={(e) => setUser({ ...user, firstName: e.target.value })}
									label='Name'
									placeholder='Alexander'
									required
									mt={5}
								/>
								<TextInput
									{...register('lastName', {
										required: {
											value: validationData.lastName.required,
											message: validationData.lastName.requiredErrorMessage,
										},
									})}
									error={errors?.lastName?.message}
									icon={<IconPencil size={16} />}
									value={user.lastName}
									onChange={(e) => setUser({ ...user, lastName: e.target.value })}
									label='Last name'
									placeholder='Dmitriev'
									required
									mt={5}
								/>
								<TextInput
									{...register('location', {
										required: {
											value: validationData.location.required,
											message: validationData.location.requiredErrorMessage,
										},
									})}
									error={errors?.location?.message}
									icon={<IconMap2 size={16} />}
									value={user.location}
									onChange={(e) => setUser({ ...user, location: e.target.value })}
									label='Location'
									placeholder='Minsk'
									required
									mt={5}
								/>
							</>
				}
				<Grid>
					<Col span={12} md={5}>
						<Button
							variant='default'
							fullWidth
							mt='xl'
							onClick={() => prevStep()}
						>
							Back
						</Button>
					</Col>
					<Col span={12} md={7}>
						{active === 3
									<Button fullWidth disabled={!isValid} onClick={() => store.registration(user)}>
							<Button
								fullWidth
								mt='xl'
								onClick={() => {
									nextStep();
									store.registration(email, password, firstName, lastName, location)
								}}
							>
								Let's go!
							</Button>
							:
									<Button fullWidth disabled={!isValid} onClick={() => nextStep()}>
								fullWidth
								mt='xl'
								onClick={() => nextStep()}
							>
								Next step
							</Button>
						}
					</Col>
				</Grid>
			</Paper>
		</Container>
	)
}

export default observer(RegistrationForm) 