import styles from './Post.module.css'

export function Post(props) {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.profile}>
          <img
            className={styles.avatar}
            src="https://github.com/ruyfreire.png"
          />

          <div className={styles.author}>
            <strong>{props.author}</strong>
            <span>Web Developer</span>
          </div>
        </div>

        <time title="01 de Fevereiro às 22h" dateTime="2023-02-01 22:10:00">
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa&#32;👋</p>

        <p>{props.content}</p>

        <p>
          <a href="#">👉&#32;jane.design/doctorcare</a>
        </p>

        <p>
          <a href="#">#novoprojeto</a>&#32;
          <a href="#">#nlw</a>&#32;
          <a href="#">#rocketseat</a>
        </p>
      </div>
    </article>
  )
}
