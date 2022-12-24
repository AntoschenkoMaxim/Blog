//context
import { Context } from '..'
//constants
import { menuData } from '../constants'
//default libraries
import { FC, useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
//ui libraries
import {
  Navbar,
  SegmentedControl,
  createStyles,
  useMantineTheme,
  AppShell,
  Header,
  MediaQuery,
  Burger,
} from '@mantine/core'
//icons
import { IconLogout, IconSwitchHorizontal } from '@tabler/icons'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  return {
    navbar: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
      textTransform: 'uppercase',
      letterSpacing: -0.25,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },
    header: {
      paddingTop: theme.spacing.sm,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
      }`,
      marginBottom: 120,
    },

    mainSection: {
      paddingBottom: theme.spacing.sm,
    },

    user: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      },

      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },

    burger: {
      [theme.fn.largerThan('xs')]: {
        display: 'none',
      },
    },

    userActive: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  }
})

const Layout: FC = () => {
  const { store } = useContext(Context)

  const theme = useMantineTheme()
  const [opened, setOpened] = useState<boolean>(false)
  const { classes, cx } = useStyles()
  const [section, setSection] = useState<'account' | 'general'>('account')
  const [active, setActive] = useState('Posts')

  const links = menuData[section].map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      navbar={
        <Navbar
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 300 }}
          p='md'
          className={classes.navbar}
        >
          <Navbar.Section>
            <SegmentedControl
              value={section}
              onChange={(value: 'account' | 'general') => setSection(value)}
              transitionTimingFunction='ease'
              fullWidth
              data={[
                { label: 'Account', value: 'account' },
                { label: 'System', value: 'general' },
              ]}
            />
          </Navbar.Section>

          <Navbar.Section grow mt='xl'>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a href='#' className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
              <span>Change account</span>
            </a>

            <a href='#' className={classes.link} onClick={() => store.logout()}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
            {/* <Button
							leftIcon={<IconLogout stroke={'1,5'} />}
							fullWidth
							variant='default'
							onClick={() => store.logout()}
						>
							Logout
						</Button> */}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((opened) => !opened)}
                size='sm'
                color={theme.colors.gray[6]}
                ml='xl'
              />
            </MediaQuery>
            {/* <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
							<MantineLogo size={36} />
						</MediaQuery> */}
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  )
}

export default Layout
