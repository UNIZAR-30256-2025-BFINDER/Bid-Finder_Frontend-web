import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm({ ...form, [field]: value });
        setError('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!form.email || !form.password) {
            setError('Introduce email y contraseña.');
            return;
        }

        try {
            setLoading(true);

            await authService.login({
                email: form.email,
                password: form.password,
            });

            navigate('/dashboard');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'No se pudo iniciar sesión'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl border border-yellow-400/20 bg-[#050816]/95 p-8 shadow-2xl"
        >
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-3xl font-black text-black shadow-lg">
                    B
                </div>
                <h1 className="text-3xl font-bold text-yellow-400">
                    Login to your Account
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    See what is going on with your business
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-medium text-yellow-400">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="mail@bif.com"
                        value={form.email}
                        onChange={(e) =>
                            handleChange('email', e.target.value)
                        }
                        className="w-full rounded-md border border-yellow-400/70 bg-black px-4 py-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-yellow-400">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) =>
                            handleChange('password', e.target.value)
                        }
                        className="w-full rounded-md border border-yellow-400/70 bg-black px-4 py-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                {error && (
                    <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Entrando...' : 'Login'}
                </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
                Not registered yet?{' '}
                <Link
                    to="/register"
                    className="font-semibold text-yellow-400 hover:underline"
                >
                    Create an account
                </Link>
            </p>
        </form>
    );
};