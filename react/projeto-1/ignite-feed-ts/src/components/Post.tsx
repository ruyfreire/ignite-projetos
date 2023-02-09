import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  type: 'paragraph' | 'link'
  content: string
}

interface PostProps {
  author: Author
  content: Content[]
  publishedAt: Date
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [listComments, setListComments] = useState<string[]>([])
  const [newComment, setNewComment] = useState('')

  const handleComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('')
    setNewComment(event.target.value)
  }

  const handleInvalidComment = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('Este campo é obrigatório')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setListComments([...listComments, newComment])
    setNewComment('')
  }

  const handleDeleteComment = (comment: string) => {
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
          onInvalid={handleInvalidComment}
          required
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
