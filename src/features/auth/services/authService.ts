/**
 * @fileoverview Servicio de Autenticación
 * Gestiona la comunicación con la API para el login, registro y el almacenamiento
 * local de la sesión del usuario (JWT tokens).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
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

/**
 * Guarda los tokens y la información del usuario en el almacenamiento local.
 * @param {AuthResponse['data']} data - Datos de respuesta de la API con tokens y usuario.
 */
const saveSession = (data: AuthResponse['data']) => {
    const { accessToken, refreshToken, ...user } = data;

    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Parsea el cuerpo de la respuesta HTTP para extraer el mensaje de error de la API.
 * @param {Response} response - Objeto Response nativo de fetch.
 * @returns {Promise<string>} Mensaje de error extraído o genérico.
 */
const parseError = async (response: Response): Promise<string> => {
    try {
        const body = await response.json();
        return body?.error?.message || body?.message || 'Error de autenticación';
    } catch {
        return 'Error de autenticación';
    }
};

export const authService = {
    /**
     * Registra un nuevo usuario en la plataforma y guarda su sesión.
     * @param {RegisterPayload} payload - Credenciales y datos del nuevo usuario.
     * @returns {Promise<AuthUser>} Datos del usuario registrado.
     * @throws {Error} Si el backend rechaza el registro.
     */
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

    /**
     * Inicia sesión en la plataforma y guarda los tokens de acceso.
     * @param {LoginPayload} payload - Email y contraseña del usuario.
     * @returns {Promise<AuthUser>} Datos del usuario autenticado.
     * @throws {Error} Si las credenciales son incorrectas.
     */
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

    /**
     * Elimina los tokens y la información del usuario del almacenamiento local.
     */
    logout() {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    /**
     * @returns {string | null} El Access Token guardado en sessionStorage.
     */
    getAccessToken(): string | null {
        return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    },

    /**
     * @returns {string | null} El Refresh Token guardado en localStorage.
     */
    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    /**
     * Obtiene el perfil del usuario activo leyendo el localStorage.
     * @returns {AuthUser | null} Objeto del usuario o null si no hay sesión.
     */
    getCurrentUser(): AuthUser | null {
        const rawUser = localStorage.getItem(USER_KEY);
        if (!rawUser) return null;

        try {
            return JSON.parse(rawUser) as AuthUser;
        } catch {
            return null;
        }
    },

    /**
     * Verifica de forma síncrona si existe una sesión activa basándose en los tokens.
     * @returns {boolean} True si hay un token almacenado.
     */
    isAuthenticated(): boolean {
        return Boolean(this.getAccessToken() || this.getRefreshToken());
    },
};