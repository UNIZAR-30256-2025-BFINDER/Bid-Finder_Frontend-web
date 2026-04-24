const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const ACCESS_TOKEN_KEY = 'bfinder_access_token';
const REFRESH_TOKEN_KEY = 'bfinder_refresh_token';
const USER_KEY = 'bfinder_user';

export interface AuthUser {
    _id: string;
    nombre: string;
    email: string;
    rol: string;
}

interface AuthResponse {
    success: boolean;
    data: AuthUser & {
        accessToken: string;
        refreshToken: string;
    };
}

export interface RegisterPayload {
    nombre: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

const saveSession = (data: AuthResponse['data']) => {
    const { accessToken, refreshToken, ...user } = data;

    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const parseError = async (response: Response) => {
    try {
        const body = await response.json();
        return body?.error?.message || body?.message || 'Error de autenticación';
    } catch {
        return 'Error de autenticación';
    }
};

export const authService = {
    async register(payload: RegisterPayload): Promise<AuthUser> {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(await parseError(response));
        }

        const result: AuthResponse = await response.json();
        saveSession(result.data);

        const { accessToken, refreshToken, ...user } = result.data;
        void accessToken;
        void refreshToken;

        return user;
    },

    async login(payload: LoginPayload): Promise<AuthUser> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(await parseError(response));
        }

        const result: AuthResponse = await response.json();
        saveSession(result.data);

        const { accessToken, refreshToken, ...user } = result.data;
        void accessToken;
        void refreshToken;

        return user;
    },

    logout() {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getAccessToken() {
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    getCurrentUser(): AuthUser | null {
        const rawUser = localStorage.getItem(USER_KEY);
        if (!rawUser) return null;

        try {
            return JSON.parse(rawUser) as AuthUser;
        } catch {
            return null;
        }
    },

    isAuthenticated() {
        return Boolean(this.getAccessToken() || this.getRefreshToken());
    },
};