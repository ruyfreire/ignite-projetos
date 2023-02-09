import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'

import styles from './Comment.module.css'

interface CommentProps {
  comment: string
  onDeleteComment: (comment: string) => void
}

export function Comment({ comment, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  const handleLikeComment = () => {
    setLikeCount((prevState) => prevState + 1)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/ruyfreire.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Ruy Freire</strong>
              <time
                title="01 de Fevereiro às 22h"
                dateTime="2023-02-01 22:10:00"
              >
                Cerca de 3h atrás
              </time>
            </div>

            <button
              title="Deletar comentário"
              onClick={() => onDeleteComment(comment)}
            >
              <Trash size={24} />
            </button>
          </header>

          <p>{comment}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
