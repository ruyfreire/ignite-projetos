import { HTMLAttributes } from 'react'
import { Check, Trash } from 'phosphor-react'
import clsx from 'clsx'

import { ITask } from '../App'

import styles from './Task.module.css'

interface TaskProps extends HTMLAttributes<HTMLLabelElement> {
  task: ITask
  deleting?: boolean
  onChangeStatus: (checked: boolean) => void
  onDelete: (id: ITask['id']) => void
}

export function Task({ task, onChangeStatus, onDelete, deleting, ...props }: TaskProps) {
  const { id, completed, content } = task

  return (
    <label {...props} htmlFor={id} className={clsx(styles.task, {
      [styles.taskCompleted]: completed,
      [styles.taskDeleting]: deleting
    })}>
      <input type="checkbox" id={id} checked={completed} onChange={(event) => onChangeStatus(event.target.checked)} />

      <div className={styles.check}>
        <span className={styles.checkbox}>
          <Check size={12} />
        </span>
      </div>

      <p>{content}</p>

      <button title='Excluir tarefa' onClick={() => onDelete(id)}>
        <Trash size={16} />
      </button>
    </label>
  )
}