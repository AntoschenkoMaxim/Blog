import { FC } from 'react'
import { createStyles, Image, Accordion, Grid, Col, Container, Title } from '@mantine/core';
import faqdata from '../constants/faqdata';

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
	item: {
		fontSize: theme.fontSizes.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
	}
}))

const Faq: FC = () => {

	const { classes } = useStyles()

	return (
		<Container className={classes.wrapper} size='lg'>
			<Grid id='faq' gutter={50}>
				<Col span={12} md={6}>
					<Title order={2} align='left' className={classes.title}>
						Frequently Asked Questions
					</Title>
					<Accordion chevronPosition='right' defaultValue='change-profile' variant="separated">
						<>
							{faqdata.map((item) =>
								<Accordion.Item className={classes.item} value={item.value} key={item.value}>
									<Accordion.Control>{item.header}</Accordion.Control>
									<Accordion.Panel>{item.description}</Accordion.Panel>
								</Accordion.Item>
							)}
						</>
					</Accordion>
				</Col>
				<Col span={12} md={6}>
					<Image src='' alt="Frequently Asked Questions" />
				</Col>
			</Grid>
		</Container>
	)
}

export default Faq