import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ResetPasswordForm from '../components/reset-password-form/reset-password-form';
import resetPasswordStyles from './reset-password.module.css';

type TForgotPasswordRequest = {
  user: {
    forgotPasswordRequest: boolean
  }
}

export default function ResetPasswordPage() {
  const history = useHistory();
  const { forgotPasswordRequest } = useSelector((store: TForgotPasswordRequest) => store.user);

  useEffect(() => {
    if (forgotPasswordRequest === false) {
      history.push('/');
    }
  }, [forgotPasswordRequest, history]);
  return (
    <section className={resetPasswordStyles.container}>
      <ResetPasswordForm />
    </section>
  );
}
