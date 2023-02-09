import { Header } from './components/Header'
import { Aside } from './components/Aside'
import { Post } from './components/Post'

import styles from './App.module.css'
import './global.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/ruyfreire.png',
      name: 'Ruy Freire',
      role: 'Web Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod labore maiores, sequi illo officia, recusandae libero vitae explicabo natus temporibus rerum aliquam dolorum eligendi ratione fugit officiis facilis enim?',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
      { type: 'link', content: '#rocketseat' },
    ],
    publishedAt: new Date('2023-02-04T13:00:00.000Z'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/ruyfreire.png',
      name: 'Ruy Freire',
      role: 'Web Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      {
        type: 'paragraph',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod labore maiores, sequi illo officia, recusandae libero vitae explicabo natus temporibus rerum aliquam dolorum eligendi ratione fugit officiis facilis enim?',
      },
      { type: 'link', content: '👉 jane.design/doctorcare' },
      { type: 'link', content: '#rocketseat' },
    ],
    publishedAt: new Date('2023-01-04T13:00:00.000Z'),
  },
]

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Aside />

        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  )
}

export default App
