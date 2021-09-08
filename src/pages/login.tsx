import LoginForm from "../components/login-form/login-form"
import loginStyles from './login.module.css';

export default function LoginPage() {

    return(
        <section className={loginStyles.container}>
            <LoginForm />
        </section>
    )
}