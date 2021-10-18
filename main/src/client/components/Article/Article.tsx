import styles from './Article.module.scss';

function DateDisplay({ date }: { date: any }) {
  const d = new Date(Date.parse(date));

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return <em>{d.toLocaleDateString('pl-PL', dateFormatOptions)}</em>;
}

export type ArticleProps = {
  title: string;
  content: string;
  date?: Date;
  showTitle?: boolean;
  justify?: boolean;
};

export function Article({
  title,
  content,
  date,
  showTitle = true,
}: ArticleProps) {
  return (
    <div className={styles['article']}>
      {showTitle && <h1 className={styles['title']}>{title}</h1>}
      {date && <DateDisplay date={date} />}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
