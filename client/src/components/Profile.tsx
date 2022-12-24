//context
import { Context } from '..'
//default libraries
import { FC, useContext, useState } from 'react'
//ui libraries
import {
  Grid,
  Col,
  Container,
  Paper,
  TextInput,
  Title,
  createStyles,
  Button,
  Tooltip,
  FileInput,
  Alert,
} from '@mantine/core'
//icons
import { IconAt, IconMap2, IconPencil, IconQuestionMark, IconUpload } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  wrapper: {},
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

  // setFirstName(store.user.firstName)
  // setLastName(store.user.lastName)
  // setLocation(store.user.location)

  console.log(image)

  return (
    <Container size='lg' className={classes.wrapper}>
      <Grid id='profile' gutter={50}>
        <Col>
          <Grid>
            <Paper withBorder shadow='md' radius='md' p={30} mt={20}>
              <Col span={12}>
                <Title order={2} align='left' className={classes.title}>
                  User information
                </Title>
                {!store.user.isActivated ? (
                  <Alert color='red' mt='xs' mb='xs' title='Account is not confirmed!'>
                    Your account is not confirmed! Please, confirm your account by mail.
                  </Alert>
                ) : (
                  <Alert color='teal' mt='xs' mb='xs' title='Account is confirmed!'>
                    Your account is confirmed! No action is required.
                  </Alert>
                )}
                <TextInput
                  icon={<IconAt size={16} />}
                  value={store.user.email}
                  label='Email'
                  mt={5}
                  rightSection={
                    !store.user.isActivated && (
                      <Tooltip label='Confirm your account by email' position='top-end' withArrow>
                        <div>
                          <IconQuestionMark size={16} style={{ display: 'block', opacity: 0.5 }} />
                        </div>
                      </Tooltip>
                    )
                  }
                />
                <TextInput
                  icon={<IconPencil size={16} />}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  label='First name'
                  placeholder='Jame'
                  mt={5}
                />
                <TextInput
                  icon={<IconPencil size={16} />}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  label='Last name'
                  placeholder='Anisimov'
                  mt={5}
                />
                <TextInput
                  icon={<IconMap2 size={16} />}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                <Button fullWidth mt='md'>
                  Save
                </Button>
              </Col>
            </Paper>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Paper withBorder shadow='md' radius='md' p={30} mt={20} ml={30}>
                <Col span={12}>
                  <Title order={2} align='left' className={classes.title}>
                    User information
                  </Title>
                  {!store.user.isActivated ? (
                    <Alert color='red' mt='xs' mb='xs' title='Account is not confirmed!'>
                      Your account is not confirmed! Please, confirm your account by mail.
                    </Alert>
                  ) : (
                    <Alert color='teal' mt='xs' mb='xs' title='Account is confirmed!'>
                      Your account is confirmed! No action is required.
                    </Alert>
                  )}
                </Col>
              </Paper>
              <Paper withBorder shadow='md' radius='md' p={30} mt={20} ml={30}>
                <Col span={12}>
                  <TextInput
                    icon={<IconMap2 size={16} />}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                  <Button fullWidth mt='md'>
                    Save
                  </Button>
                </Col>
              </Paper>
            </div>
          </Grid>
        </Col>
      </Grid>
    </Container>
  )
}

export default Profile
