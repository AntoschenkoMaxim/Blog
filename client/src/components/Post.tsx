import { createStyles, Card, Image, ActionIcon, Group, Text, Avatar } from '@mantine/core';
import { IconHeart, IconBookmark } from '@tabler/icons';
import moment from 'moment'

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.white
	},
	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
	footer: {
		padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
		marginTop: theme.spacing.md,
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
			}`,
	},
}))

interface ArticleCardFooterProps {
	title: string;
	description: string;
	location: string;
	author: string;
	createdAt: string;
	// image: string;
	// footer: string;
	// author: {
	// 	name: string;
	// 	description: string;
	// 	image: string;
	// };
}

export function Post({

	title,
	description,
	location,
	author,
	createdAt
	// image

}: ArticleCardFooterProps) {

	const { classes } = useStyles();

	const date = moment(createdAt).fromNow()

  const { store } = useContext(Context)
	return (
		<Card withBorder p='lg' radius='md' className={classes.card}>
			<Card.Section mb='sm'>
				<Image
					src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
					alt='title'
					height={180}
				/>
			</Card.Section>

			<Text weight={700} className={classes.title} mt="xs">
				{title}
			</Text>
			<Text weight={400} mt="xs">
				{description}
			</Text>

			<Group mt="lg">
				<Avatar src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80' radius="sm" />
				<div>
					<Text weight={500}>{author}</Text>
					<Text size="xs" color="dimmed">
						posted {date}
					</Text>
				</div>
			</Group>

			<Card.Section className={classes.footer}>
				<Group position='apart'>
					<Text size='xs' color='dimmed'>
						733 people likes
					</Text>
					<Group spacing={0}>
						<ActionIcon>
							<IconHeart size={18} stroke={1.5} />
						</ActionIcon>
						<ActionIcon>
							<IconBookmark size={18} stroke={1.5} />
						</ActionIcon>
            <ActionIcon onClick={() => store.deletePostByID(id)}>
              <IconTrash size={18} stroke={1.5} />
            </ActionIcon>
					</Group>
				</Group>
			</Card.Section>
		</Card>
	)
}

export default Post