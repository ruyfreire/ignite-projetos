import { PencilSimpleLine } from 'phosphor-react'
import { Avatar } from './Avatar'

import styles from './Aside.module.css'

export function Aside() {
  return (
    <aside className={styles.aside}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/ruyfreire.png" />
        <strong>Ruy Freire</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilSimpleLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}
