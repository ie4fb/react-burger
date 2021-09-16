import formStyles from './form.module.css';
export default function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={formStyles.form}>
      {children}
    </form>
  );
}
