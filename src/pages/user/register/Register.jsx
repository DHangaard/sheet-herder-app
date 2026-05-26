import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { register } from '../../../services/userService'
import FormCard from '../../../components/formCard/FormCard.jsx'
import Field from '../../../components/field/Field.jsx'
import Button from '../../../components/button/Button.jsx'
import StatusMessage from '../../../components/statusMessage/StatusMessage.jsx'
import styles from './Register.module.css'

// Variables and regex used for validation - kept identical to server validation
const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[a-z\d._%+\-]+@[a-z\d.\-]+\.[a-z]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z\d_\-]+$/;
// Matches Java's \p{Punct} as there is no direct equivilant in js
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;

export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [emailError, setEmailError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [verifyPasswordError, setVerifyPasswordError] = useState(null);
    const [apiError, setApiError] = useState(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const isFormValid =
        email.trim() !== '' &&
        username.trim().length >= MIN_USERNAME_LENGTH &&
        password.length >= MIN_PASSWORD_LENGTH &&
        password === verifyPassword &&
        !emailError &&
        !usernameError &&
        !passwordError &&
        !verifyPasswordError;

    function handleChange(setter) {
        return function(event) {
            setter(event.target.value);
            setApiError(null);
        };
    }

    function validateEmail() {
        const normalized = email.trim().toLowerCase();
        if (!normalized) {
            setEmailError('Email cannot be blank');
        } else if (!EMAIL_REGEX.test(normalized)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError(null);
        }
    }

    function validateUsername() {
        const trimmed = username.trim();
        if (!trimmed) {
            setUsernameError('Username cannot be blank');
        } else if (trimmed.length < MIN_USERNAME_LENGTH) {
            setUsernameError('Username must be at least 3 characters');
        } else if (!USERNAME_REGEX.test(trimmed)) {
            setUsernameError('Username can only contain letters, digits, underscores and hyphens');
        } else {
            setUsernameError(null);
        }
    }

    function validatePassword() {
        if (!password) {
            setPasswordError('Password cannot be blank');
        } else if (password.length < MIN_PASSWORD_LENGTH) {
            setPasswordError('Password must be at least 8 characters');
        } else if (!PASSWORD_REGEX.test(password)) {
            setPasswordError('Password must contain uppercase, lowercase, digit and special character');
        } else {
            setPasswordError(null);
        }
    }

    function validateVerifyPassword() {
        if (password !== verifyPassword) {
            setVerifyPasswordError('Passwords do not match');
        } else {
            setVerifyPasswordError(null);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setApiError(null);
        setLoading(true);
        try {
            await register({ email, username, password });
            navigate('/login', { state: { successMessage: 'User created' } });
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <FormCard title="Create User">
            <form onSubmit={handleSubmit}>
                <div className={styles.fields}>
                    <Field
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleChange(setEmail)}
                        onBlur={validateEmail}
                        autoComplete="email"
                        error={emailError}
                    />
                    <Field
                        label="Username"
                        id="username"
                        value={username}
                        onChange={handleChange(setUsername)}
                        onBlur={validateUsername}
                        autoComplete="username"
                        error={usernameError}
                    />
                    <Field
                        label="Password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                        onBlur={validatePassword}
                        autoComplete="new-password"
                        error={passwordError}
                    />
                    <Field
                        label="Verify Password"
                        id="verifyPassword"
                        type="password"
                        value={verifyPassword}
                        onChange={handleChange(setVerifyPassword)}
                        onBlur={validateVerifyPassword}
                        autoComplete="new-password"
                        error={verifyPasswordError}
                    />
                </div>
                <div className={styles.buttonWrapper}>
                    <Button type="submit" disabled={loading || !isFormValid}>Create User</Button>
                </div>
            </form>
            <StatusMessage type="error" message={apiError} />
            <div className={styles.footer}>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </div>
        </FormCard>
    )
}