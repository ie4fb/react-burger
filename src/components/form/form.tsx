import formStyles from './form.module.css';
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={formStyles.form}>
      {children}
    </form>
  );
}
