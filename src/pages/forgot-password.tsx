import ForgotPasswordForm from "../components/forgot-password-form/forgot-password-form"
import forgotPasswordStyles from './forgot-password.module.css';

export default function ForgotPasswordPage() {

    return(
        <section className={forgotPasswordStyles.container}>
            <ForgotPasswordForm />
        </section>
    )
}