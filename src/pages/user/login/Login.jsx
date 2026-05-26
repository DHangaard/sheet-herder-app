import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuthActions } from '../../../context/auth/useAuth.js'
import FormCard from '../../../components/formCard/FormCard.jsx'
import Field from '../../../components/field/Field.jsx'
import Button from '../../../components/button/Button.jsx'
import StatusMessage from '../../../components/statusMessage/StatusMessage.jsx'
import styles from './Login.module.css'

export default function Login() {
    const { login } = useAuthActions();
    const navigate = useNavigate();
    const location = useLocation();

    const [status, setStatus] = useState(() => {
        if (location.state?.successMessage) {
            return { type: 'success', message: location.state.successMessage };
        }
        return null;
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus(null);
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/');
        } catch {
            setStatus({ type: 'error', message: 'invalid credentials' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <FormCard title="Login">
            <form onSubmit={handleSubmit}>
                <div className={styles.fields}>
                    <Field
                        label="Email"
                        id="email"
                        value={email}
                        onChange={event => {
                            setEmail(event.target.value);
                            setStatus(null);    
                        }}
                        autoComplete="email"
                    />
                    <Field
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={event => {
                            setPassword(event.target.value);
                            setStatus(null);
                        }}
                        autoComplete="current-password"
                    />
                </div>
                <div className={styles.buttonWrapper}>
                    <Button type="submit" disabled={loading || !isFormValid}>Login</Button>
                </div>
            </form>
            <StatusMessage type={status?.type} message={status?.message} />
            <div className={styles.footer}>
                <a
                    href="#"
                    className={styles.disabledLink}
                    aria-disabled="true"
                    tabIndex={-1}
                    onClick={event => event.preventDefault()}
                >
                    Forgot password?
                </a>
                <span>New? <Link to="/register">Create user</Link></span>
            </div>
        </FormCard>
    )
}