//interfaces
import { IRegistrationForm } from '../models/request/IRegistrationForm'
//functions
import { getStrength } from '../functions/getStrength'
import { convertFileToBase64 } from '../functions/convertToBase64'
//context
import { Context } from '../index'
//observer
import { observer } from 'mobx-react-lite'
//constants
import { requirementsData, validationData } from '../constants'
//default libraries
import { FC, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
//ui libraries
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
	Stepper,
	Grid,
	Col,
	FileInput,
	Box,
	Popover,
	Progress,
	Alert,
	Image,
} from '@mantine/core'
//icons
import {
	IconAt,
	IconCheck,
	IconLock,
	IconMailOpened,
	IconMap2,
	IconPencil,
	IconShieldCheck,
	IconUpload,
	IconUserCheck,
	IconX,
} from '@tabler/icons'

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
	return (
		<Text
			color={meets ? 'teal' : 'red'}
			sx={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size='sm'
		>
			{meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
		</Text>
	)
}

export const RegistrationForm: FC = () => {
	//store with registration function
	const { store } = useContext(Context)

	//user information
	const [user, setUser] = useState<IRegistrationForm>(
		{ email: '', password: '', firstName: '', lastName: '', location: '' }, //image
	)

	const [image, setImage] = useState<File | null>(null)
	const [base64, setBase64] = useState<string>('')

	//upload file to user object
	const uploadFile = async (e: any) => {
		const file = e.target.files[0]
		const base = await convertFileToBase64(file)
		setBase64(base)
		console.log(base64)
	}

	// stepper
	const [active, setActive] = useState<number>(0)
	const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

	//popover for password
	const [popoverOpened, setPopoverOpened] = useState<boolean>(false)

	const checks = requirementsData.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(user.password)}
		/>
	))

	const strength = getStrength(user.password)
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

	//validation with React-hook-form
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
		email: string,
		password: string,
		firstName: string,
		lastName: string,
		location: string,
	) => {
		// console.log(data)
		// store.registration(email, password, firstName, lastName, location)
		// store.registration(data)
		reset()
	}

	return (
		<>
			<Container size={420} my={40}>
				<Title
					align='center'
					sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
				>
					Welcome back!
				</Title>
				<Text color='dimmed' size='sm' align='center' mt={5}>
					Do you have an account?{' '}
				</Text>

				<form>
					{/* onSubmit={handleSubmit(onSubmit)} */}
					<Paper withBorder shadow='md' radius='md' p={30} mt={30}>
						<Stepper active={active}>
							<Stepper.Step icon={<IconUserCheck size={18} />} />
							<Stepper.Step icon={<IconMailOpened size={18} />} />
							<Stepper.Step icon={<IconShieldCheck size={18} />} />
						</Stepper>

						{active === 1 ? (
							<>
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
								<Popover
									opened={popoverOpened}
									shadow='sm'
									position='bottom'
									width='target'
									transition='pop'
								>
									<Popover.Target>
										<div
											onFocusCapture={() => setPopoverOpened(true)}
											onBlurCapture={() => setPopoverOpened(false)}
										>
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
										</div>
									</Popover.Target>
									<Popover.Dropdown>
										<Progress color={color} value={strength} size={5} mb={10} />
										<PasswordRequirement
											label='Includes at least 6 characters'
											meets={user.password.length > 5}
										/>
										{checks}
									</Popover.Dropdown>
								</Popover>
								<Group position='apart' mt='lg'>
									<Checkbox label='Agree with privacy?' sx={{ lineHeight: 1 }} />
								</Group>
							</>
						) : active === 2 ? (
							<>
								<FileInput
									icon={<IconUpload size={16} />}
									value={image}
									onChange={setImage}
									accept='image/png,image/jpeg'
									label='Image'
									placeholder='Upload image'
									mt={5}
								/>
							</>
						) : active === 3 ? (
							<>
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
									>
										Unsuccessfully registration! Lorem Ipsum is simply dummy text of the printing
										and typesetting industry.
									</Alert>
								)}
							</>
						) : (
							<>
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
						)}
						<Grid mt='xl'>
							<Col span={12} md={5}>
								<Button
									variant='default'
									fullWidth
									onClick={() => prevStep()}
									disabled={active === 0}
								>
									Back
								</Button>
							</Col>
							<Col span={12} md={7}>
								{active === 3 ? (
									<Button fullWidth disabled={!isValid} onClick={() => store.registration(user)}>
										Let's go!
									</Button>
								) : (
									<Button fullWidth disabled={!isValid} onClick={() => nextStep()}>
										Next step
									</Button>
								)}
							</Col>
						</Grid>
					</Paper>
				</form>
			</Container>
		</>
	)
}

export default observer(RegistrationForm)
