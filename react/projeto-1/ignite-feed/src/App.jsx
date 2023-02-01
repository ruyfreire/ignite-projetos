import { Header } from './components/Header'

import styles from './App.module.css'
import './global.css'
import { Aside } from './components/Aside'
import { Post } from './components/Post'

function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Aside />

        <main>
          <Post
            author="Ruy"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod labore maiores, sequi illo officia, recusandae libero vitae explicabo natus temporibus rerum aliquam dolorum eligendi ratione fugit officiis facilis enim?"
          />
          <Post
            author="José"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quod labore maiores, sequi illo officia, recusandae libero vitae explicabo natus temporibus rerum aliquam dolorum eligendi ratione fugit officiis facilis enim?"
          />
        </main>
      </div>
    </div>
  )
}

export default App
