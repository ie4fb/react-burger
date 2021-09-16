import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ResetPasswordForm from '../components/reset-password-form/reset-password-form';
import resetPasswordStyles from './reset-password.module.css';

export default function ResetPasswordPage() {
  const history = useHistory();
  const { forgotPasswordRequest } = useSelector(store => store.user);

  useEffect(() => {
    if (forgotPasswordRequest === false) {
      history.push('/');
    }
  }, []);
  return (
    <section className={resetPasswordStyles.container}>
      <ResetPasswordForm />
    </section>
  );
}
