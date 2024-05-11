import React, { useState } from 'react';
import './login.scss'; // Uvozimo stilove

const Login = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const toggleMode = () => {
        const newMode = mode === 'login' ? 'signup' : 'login';
        setMode(newMode);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        setError('');

        try {
            const response = await fetch('http://localhost/grading-management-system/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            // Uspješna prijava
            console.log('Login successful');

            // Redirekcija na željenu rutu
            window.location.href = '/courses';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={`app app--is-${mode}`}>
            <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
            <section className={`form-block form-block--is-${mode}`}>
                <header className="form-block__header">
                    <h1>{mode === 'login' ? 'Welcome' : 'Sign up'}</h1>
                    <div className="form-block__toggle-block">
                        {/*} <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                        <input id="form-toggler" type="checkbox" onClick={toggleMode} />
                        <label htmlFor="form-toggler"></label>*/}
                    </div>
                </header>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-block__input-wrapper">
                        <div className={`form-group form-group--${mode}`}>
                            {mode === 'login' ? (
                                <>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <input type="text" id="fullname" placeholder="Full Name" />
                                    <input type="email" id="email" placeholder="Email" />
                                    <input type="password" id="createpassword" placeholder="Password" />
                                    <input type="password" id="repeatpassword" placeholder="Repeat Password" />
                                </>
                            )}
                        </div>
                    </div>
                    <button className="button button--primary full-width" type="submit">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
                </form>
            </section>
        </div>
    );
};

export default Login;
