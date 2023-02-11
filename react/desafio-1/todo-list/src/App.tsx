import { useState } from 'react'
import { Check, PlusCircle, Trash } from 'phosphor-react'

import Logo from './assets/logo.svg'

import styles from './App.module.css'

import './global.css'

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <header className={styles.header}>
        <img src={Logo} alt="Logo" />
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.search}>
            <input type="text" placeholder='Adicione uma nova tarefa' />
            <button>Criar <PlusCircle size={20} /></button>
          </div>

          <div className={styles.resume}>
            <div className={styles.tasks}>
              <p>Tarefas criadas</p>
              <span>5</span>
            </div>

            <div className={styles.complete}>
              <p>Concluídas</p>
              <span>2 de 5</span>
            </div>
          </div>

          <div>
            <div className={checked ? `${styles.card} ${styles.cardChecked}` : styles.card}>
              <input type="checkbox" name="check-1" id="check-1" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
              <div className={styles.check}>
                <label htmlFor="check-1" className={styles.checkbox}>
                  <Check size={12} />
                </label>
              </div>
              <p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
              <button title='Excluir tarefa'>
                <Trash size={16} />
              </button>
            </div>

            <div className={styles.card}>
              <input type="checkbox" name="check-2" id="check-2" />
              <div className={styles.check}>
                <label htmlFor="check-2" className={styles.checkbox}>
                  <Check size={12} />
                </label>
              </div>
              <p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
              <button title='Excluir tarefa'>
                <Trash size={16} />
              </button>
            </div>

            <div className={styles.card}>
              <input type="checkbox" name="check-3" id="check-3" />
              <div className={styles.check}>
                <label htmlFor="check-3" className={styles.checkbox}>
                  <Check size={12} />
                </label>
              </div>
              <p>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
              <button title='Excluir tarefa'>
                <Trash size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
