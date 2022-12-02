import { FC, useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import { Box, Button, FileInput, Textarea, TextInput } from '@mantine/core';
import { IconPencil, IconUpload } from '@tabler/icons';

const CreatePost: FC = () => {

	const [title, setTitle] = useState<string>('')
	const [location, setLocation] = useState<string>('')
	const [description, setDescription] = useState<string>('')
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
				value={title}
				onChange={e => setTitle(e.target.value)}
				icon={<IconPencil size={16} />}
				label='Title'
				placeholder='Write a title'
				required
				mt={5}
			/>
			<TextInput
				value={location}
				onChange={e => setLocation(e.target.value)}
				icon={<IconPencil size={16} />}
				label='Location'
				placeholder='Write a location'
				required
				mt={5}
			/>
			<Textarea
				value={description}
				onChange={e => setDescription(e.target.value)}
				label='Description'
				placeholder='Write a description'
				required
				mt={5}
			/>
			<Button fullWidth mt='md' onClick={() => store.createPost(title, description, location)}>Create new post</Button>
		</Box>
	)
}

export default observer(CreatePost) 