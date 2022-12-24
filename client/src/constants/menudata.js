import {
  IconFileLike,
  IconFileDownload,
  IconFiles,
  IconSettings,
  IconQuestionMark,
  IconUser,
} from '@tabler/icons'

const menudata = {
  account: [
    { link: 'posts', label: 'Posts', icon: IconFiles },
    { link: 'likes', label: 'Likes', icon: IconFileLike },
    { link: 'saved', label: 'Saved', icon: IconFileDownload },
    { link: 'profile', label: 'Profile', icon: IconUser },
    { link: 'faq', label: 'FAQ', icon: IconQuestionMark },
    { link: 'settings', label: 'Settings', icon: IconSettings },
  ],
  general: [
    { link: 'help', label: 'Posts', icon: IconSettings },
    { link: 'change', label: 'Posts', icon: IconSettings },
    { link: 'repost', label: 'Posts', icon: IconSettings },
  ],
}

export default menudata
