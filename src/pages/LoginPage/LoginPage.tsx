import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import { StyledForm, StyledInput, StyledButton, ErrorMessage, Credentials } from './Login.styles';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/tasks');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            localStorage.setItem('token', result.token);
            navigate('/tasks');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Credentials>   <p>
                <strong>Credentials:</strong>
            </p>
                <p>
                    Email: <b>test@test.com</b>
                </p>
                <p>
                    Password: <b>password123</b>
                </p></Credentials>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <StyledInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton type="submit">Login</StyledButton>
        </StyledForm>
    );
};

export default LoginPage;
