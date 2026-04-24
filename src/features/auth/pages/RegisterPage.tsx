import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { Logo } from '../../../components/ui/Logo';

const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="flex items-center justify-between border-b border-white/10 px-8 py-4">
                <Logo />

                <Link
                    to="/login"
                    className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-300"
                >
                    Login
                </Link>
            </header>

            <main className="flex min-h-[calc(100vh-73px)] items-start justify-center px-4 pt-12 md:pt-20">
                <RegisterForm />
            </main>
        </div>
    );
};

export default RegisterPage;