//interfaces
import { IPost } from '../models/IPost'
//services
import PostService from '../services/PostService'
//constants
import { selectSearchData } from '../constants'
import { observer } from 'mobx-react-lite'
//default libraries
import { FC, useCallback, useContext, useEffect, useState } from 'react'
//hooks
import { useDisclosure } from '@mantine/hooks'
//components
import { Post, CreatePost } from '../components'
//ui libraries
import { Button, Col, Container, Grid, Modal, Select, TextInput } from '@mantine/core'
//icons
import { IconSearch } from '@tabler/icons'
import { Context } from '..'

const Posts: FC = () => {
  // const [opened, setOpened] = useState<boolean>(false)
  const [opened, { close, open }] = useDisclosure(false)
  const [posts, setPosts] = useState<IPost[]>([])

  const { store } = useContext(Context)

  const getPosts = useCallback(async () => {
    try {
      const response = await PostService.fetchPosts()
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  console.log(posts)

  return (
    <Container size='lg'>
      <Modal opened={opened} onClose={close} title='Сomplete information!'>
        <CreatePost />
      </Modal>

      <Grid id='posts' gutter={50}>
        <Col>
          <Grid>
            <Col span={12} md={2}>
              <Select label='Sorted by' placeholder='Choose one' data={selectSearchData} />
            </Col>
            <Col span={12} md={4}>
              <TextInput
                icon={<IconSearch size={16} />}
                label='Search posts'
                placeholder='About animals...'
              />
            </Col>
            <Col span={12} md={4}>
              <Button onClick={open}>Add new post</Button>
            </Col>
            <Col span={12} md={2}></Col>
          </Grid>
          <Grid>
            {store.posts.map(
              (
                post, //store.posts.map
              ) => (
                <Col span={12} md={4}>
                  <Post
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    location={post.location}
                    createdAt={post.createdAt}
                    key={post.id}
                  />
                </Col>
              ),
            )}
          </Grid>
        </Col>
      </Grid>
    </Container>
  )
}

export default observer(Posts)
