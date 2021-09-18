import RegisterForm from "../components/register-form/register-form"
import registerStyles from './register.module.css';

export default function RegisterPage() {

    return(
        <section className={registerStyles.container}>
            <RegisterForm />
        </section>
    )
}