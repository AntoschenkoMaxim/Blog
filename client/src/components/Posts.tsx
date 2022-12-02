import { Button, Col, Container, Grid, Modal, Select, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { FC, useEffect, useState } from 'react'
import { IPost } from '../models/IPost'
import PostService from '../services/PostService'
import {Post, CreatePost} from '../components'

const Posts: FC = () => {

	const [opened, setOpened] = useState<boolean>(false)
	const [posts, setPosts] = useState<IPost[]>([])

	const getPosts = async () => {
		try {
			const response = await PostService.fetchPosts()
			setPosts(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getPosts()
	}, [])

	return (
		<Container size='lg'>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title='Сomplete information!'
			>
				<CreatePost />
			</Modal>

			<Grid id='posts' gutter={50}>
				<Col>
					<Grid>
						<Col span={12} md={2}>
							<Select
								label='Sorted by'
								placeholder='Choose one'
								data={[
									{ value: 'likes', label: 'Likes' },
									{ value: 'title', label: 'Title' },
									{ value: 'description', label: 'Description' },
									{ value: 'comments', label: 'Comments' },
								]}
							/>
						</Col>
						<Col span={12} md={4}>
							<TextInput
								icon={<IconSearch size={16} />}
								label='Search posts'
								placeholder='Hard work'
							/>
						</Col>
						<Col span={12} md={4}>
							<Button onClick={() => setOpened(true)}>Add new post</Button>
						</Col>
						<Col span={12} md={2}>
						</Col>
					</Grid>
					<Grid>
						{posts.map(post =>
							<Col span={12} md={4}>
								<Post
									title={post.title}
									description={post.description}
									location={post.location}
									author='post.postedBy'
									createdAt={post.createdAt}
									key={post.id} />
							</Col>
						)}
					</Grid>
				</Col>
			</Grid>
		</Container>
	)
}

export default Posts