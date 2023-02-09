import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

export function Post({ author, content, publishedAt }) {
  const [listComments, setListComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const handleComment = (event) => {
    setNewComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setListComments([...listComments, newComment])
    setNewComment('')
  }

  const handleDeleteComment = (comment) => {
    setListComments(listComments.filter((com) => com !== comment))
  }

  const publishedAtTitle = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })
  const publishedAtToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const isNewCommentEmpty = newComment.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.profile}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.author}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedAtTitle} dateTime={publishedAt.toISOString()}>
          Publicado {publishedAtToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <strong>Deixe seu feedback</strong>

        <textarea
          value={newComment}
          onChange={handleComment}
          placeholder="Escreva um comentário..."
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.comments}>
        {listComments.map((comment) => (
          <Comment
            key={comment}
            comment={comment}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  )
}
