import { PlusCircle } from 'phosphor-react'

import Logo from './assets/logo.svg'

import styles from './App.module.css'

import './global.css'

export function App() {
  return (
    <div>
      <header className={styles.header}>
        <img src={Logo} alt="Logo" />
      </header>

      <main>
        <div className={styles.search}>
          <input type="text" placeholder='Adicione uma nova tarefa' />
          <button>Criar <PlusCircle size={20} /></button>
        </div>

        <div className={styles.resume}>
          <div className={styles.tasks}>
            <p>Tarefas criadas</p>
            <span>5</span>
          </div>

          <div className={styles.tasksComplete}>
            <p>Concluídas</p>
            <span>2 de 5</span>
          </div>
        </div>

        <div>
          <div className={styles.card}>
            <input type="radio" name="todo" id="todo" />
            <p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
            <button title='Excluir tarefa'>
              X
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
