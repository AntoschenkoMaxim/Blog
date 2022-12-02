import { Grid, Col, Container, Paper, TextInput, Title, createStyles, Button, Tooltip, FileInput } from '@mantine/core'
import { IconAt, IconMap2, IconPencil, IconQuestionMark, IconUpload, } from '@tabler/icons'
import { FC, useContext, useState } from 'react'
import { Context } from '..'

const useStyles = createStyles((theme) => ({
	wrapper: {
		paddingTop: theme.spacing.xl * 2,
		paddingBottom: theme.spacing.xl * 2,
	},
	title: {
		marginBottom: theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}))

const Profile: FC = () => {

	const { classes } = useStyles()

	const { store } = useContext(Context)

	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [location, setLocation] = useState<string>('')
	const [image, setImage] = useState<File | null>(null)

	console.log(image)

	return (
		<Container size='lg' className={classes.wrapper}>
			<Grid id='profile' gutter={50}>
				<Col>
					<Paper withBorder shadow='md' radius='md' p={30} mt={20}>
						<Grid>
							<Col span={12} md={4}>
								<Title order={2} align='left' className={classes.title}>
									User information
								</Title>
								<TextInput
									icon={<IconAt size={16} />}
									value={store.user.email}
									label='Email'
									mt={5}
									rightSection={
										store.user.isActivated
											? <></>
											: <Tooltip label="Confirm your account by email" position="top-end" withArrow>
												<div>
													<IconQuestionMark size={16} style={{ display: 'block', opacity: 0.5 }} />
												</div>
											</Tooltip>
									}
								/>
								<TextInput
									icon={<IconPencil size={16} />}
									value={store.user.firstName}
									onChange={e => setFirstName(e.target.value)}
									label='First name'
									placeholder='Jame'
									mt={5}
								/>
								<TextInput
									icon={<IconPencil size={16} />}
									value={store.user.lastName}
									onChange={e => setLastName(e.target.value)}
									label='Last name'
									placeholder='Anisimov'
									mt={5}
								/>
								<TextInput
									icon={<IconMap2 size={16} />}
									value={store.user.location}
									onChange={e => setLocation(e.target.value)}
									label='Location'
									placeholder='London'
									mt={5}
								/>
								<FileInput
									icon={<IconUpload size={16} />}
									value={image}
									onChange={setImage}
									label='Image'
									placeholder='Pick file'
									mt={5}
								/>
								<Button fullWidth mt='md'>Save</Button>
							</Col>
							<Col span={12} md={8}>
							</Col>
						</Grid>
					</Paper>
				</Col>
			</Grid>
		</Container>
	)
}

export default Profile