import { Header } from './components/Header'

import styles from './App.module.css'
import './global.css'
import { Aside } from './components/Aside'
import { Post } from './components/Post'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/ruyfreire.png',
      name: 'Ruy Freire',
      rule: 'Web Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa&#32;👋' },
      {
        type: 'paragraph',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod labore maiores, sequi illo officia, recusandae libero vitae explicabo natus temporibus rerum aliquam dolorum eligendi ratione fugit officiis facilis enim?',
      },
      { type: 'link', content: '👉&#32;jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-02-04T13:00:00.000Z'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/ruyfreire.png',
      name: 'Ruy Freire',
      rule: 'Web Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa&#32;👋' },
      {
        type: 'paragraph',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod labore maiores, sequi illo officia, recusandae libero vitae explicabo natus temporibus rerum aliquam dolorum eligendi ratione fugit officiis facilis enim?',
      },
      { type: 'link', content: '👉&#32;jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-02-04T13:00:00.000Z'),
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
              author={post.author.name}
              content={post.content[1].content}
            />
          ))}
        </main>
      </div>
    </div>
  )
}

export default App
