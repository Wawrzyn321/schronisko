import { useRef, useState } from 'react';
import styles from './Form.module.scss';

export function Form({
  handleSubmit,
  children,
}: {
  handleSubmit: () => any;
  children: (valid: boolean) => React.ReactNode;
}) {
  const formRef = useRef(null);
  const [valid, setValid] = useState(false);

  const onChange = () => setValid(formRef.current.checkValidity());

  const onSubmit = (e: { preventDefault: () => any }) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form
      className={styles['form']}
      ref={formRef}
      onChange={onChange}
      onSubmit={onSubmit}
    >
      {children(valid)}
    </form>
  );
}
