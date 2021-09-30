import styles from './Article.module.scss';

export function Article({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className={styles['article']}>
      <h1 className={styles['title']}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
