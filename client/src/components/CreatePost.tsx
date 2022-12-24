import { FC, useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import { Box, Button, FileInput, Textarea, TextInput } from '@mantine/core';
import { IconPencil, IconUpload } from '@tabler/icons';

const CreatePost: FC = () => {

  const [post, setPost] = useState<ICreatePostForm>({
    title: '',
    description: '',
    location: '',
    // author: authorData
  })
  // const createPost = useCallback(async (title: string, description: string, location: string) => {
  // 	await store.createPost(title, description, location).then(() => {
  // 		props?.onGetPosts()
	const { store } = useContext(Context)

	return (
		<Box>
			<FileInput
				icon={<IconUpload size={16} />}
				label='Image'
				placeholder='Choose image'
				required
			/>
			<TextInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
				icon={<IconPencil size={16} />}
				label='Title'
				placeholder='Write a title'
				required
				mt={5}
			/>
			<TextInput
        value={post.location}
        onChange={(e) => setPost({ ...post, location: e.target.value })}
				icon={<IconPencil size={16} />}
				label='Location'
				placeholder='Write a location'
				required
				mt={5}
			/>
			<Textarea
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
				label='Description'
				placeholder='Write a description'
				required
				mt={5}
			/>
      <Button fullWidth mt='md' onClick={() => store.createPost(post)}>
		</Box>
	)
}

export default observer(CreatePost) 