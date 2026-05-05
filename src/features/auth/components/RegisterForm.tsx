import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { validateEmail, validatePassword, validateName } from '../utils/registerValidation';

export const RegisterForm: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [submitError, setSubmitError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm({ ...form, [field]: value });
        setSubmitError('');

        let error = '';
        if (field === 'name') error = validateName(value);
        if (field === 'email') error = validateEmail(value);
        if (field === 'password') error = validatePassword(value);

        setErrors({ ...errors, [field]: error });
    };

    const hasErrors = Object.values(errors).some(Boolean);
    const isComplete = form.name && form.email && form.password;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!isComplete || hasErrors) {
            setSubmitError('Revisa los campos antes de continuar.');
            return;
        }

        try {
            setLoading(true);

            await authService.register({
                nombre: form.name,
                email: form.email,
                password: form.password,
            });

            navigate('/dashboard');
        } catch (err) {
            setSubmitError(
                err instanceof Error ? err.message : 'No se pudo completar el registro.',
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
                <h1 className="text-3xl font-bold text-yellow-400">Create your Account</h1>
                <p className="mt-2 text-sm text-gray-400">
                    Start finding smarter auction opportunities
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-medium text-yellow-400">Name</label>
                    <input
                        type="text"
                        placeholder="Javier"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full rounded-md border bg-black px-4 py-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-yellow-400 ${errors.name ? 'border-red-500' : 'border-yellow-400/70'
                            }`}
                    />
                    {errors.name && <p className="mt-2 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-yellow-400">Email</label>
                    <input
                        type="email"
                        placeholder="mail@bif.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full rounded-md border bg-black px-4 py-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-yellow-400 ${errors.email ? 'border-red-500' : 'border-yellow-400/70'
                            }`}
                    />
                    {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-yellow-400">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className={`w-full rounded-md border bg-black px-4 py-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-yellow-400 ${errors.password ? 'border-red-500' : 'border-yellow-400/70'
                            }`}
                    />
                    {errors.password && <p className="mt-2 text-xs text-red-400">{errors.password}</p>}
                </div>

                {submitError && (
                    <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {submitError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!isComplete || hasErrors || loading}
                    className="mt-2 w-full rounded-lg bg-yellow-400 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? 'Registrando...' : 'Register'}
                </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-yellow-400 hover:underline">
                    Login
                </Link>
            </p>
        </form>
    );
};