import styles from './Article.module.scss';

function DateDisplay({
  dateOrStringDate,
}: {
  dateOrStringDate: Date | string;
}) {
  const dateActually =
    typeof dateOrStringDate === 'string'
      ? new Date(Date.parse(dateOrStringDate))
      : dateOrStringDate;

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return <em>{dateActually.toLocaleDateString('pl-PL', dateFormatOptions)}</em>;
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
      {date && <DateDisplay dateOrStringDate={date} />}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
