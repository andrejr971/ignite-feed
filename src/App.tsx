import { Header } from "./components/Header"
import { Post } from "./components/Post"
import { v4 as uuid } from 'uuid'

import styles from './App.module.css';
import { Sidebar } from "./components/Sidebar";

export type IUser = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  role: string;
}

const user: IUser = {
  id: '1',
  avatarUrl: 'https://avatars.githubusercontent.com/u/49952031?v=4',
  cover: 'https://media-exp1.licdn.com/dms/image/C4D16AQEOKAUhMcOmoQ/profile-displaybackgroundimage-shrink_350_1400/0/1649427880318?e=1659571200&v=beta&t=ubnjteJFt_Qgy1bzxq3QfjqnCp8kFbkzlQAMppeBTLc',
  name: 'André Junior',
  role: 'Dev Backend & Frontend'
}

const posts = [
  {
    id: uuid(),
    author: {
      avatarUrl: user.avatarUrl,
      name: user.name,
      role: user.role
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋',
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link',
        content: `👉 jane.design/doctorcare`,
      },
    ],
    publishedAt: new Date('2022-06-02 12:16:00'),
  },
  {
    id: uuid(),
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'CTO @Rocketseat'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋',
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
      },
      {
        type: 'link',
        content: '👉 jane.design/doctorcare',
      },
    ],
    publishedAt: new Date('2022-06-01 08:00:00'),
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <aside>
          <Sidebar user={user} />
        </aside>

        <main>
          {posts.map(post => (
            <Post key={post.id} post={post} user={user} />
          ))}
        </main>
      </div>
    </div>
  )
}


