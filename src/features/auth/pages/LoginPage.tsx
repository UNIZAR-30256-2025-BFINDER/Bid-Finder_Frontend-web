import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { Logo } from '../../../components/ui/Logo';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="flex items-center justify-between border-b border-white/10 px-8 py-4">
                <Logo />

                <Link
                    to="/register"
                    className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-300"
                >
                    Register
                </Link>
            </header>

            <main className="flex min-h-[calc(100vh-73px)] items-start justify-center px-4 pt-12 md:pt-20">
                <LoginForm />
            </main>
        </div>
    );
};

export default LoginPage;