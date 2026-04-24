export const validateEmail = (email: string) => {
    if (!email) return 'El email es obligatorio';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? '' : 'Email no válido';
};

export const validatePassword = (password: string) => {
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'Mínimo 6 caracteres';
    return '';
};

export const validateName = (name: string) => {
    if (!name) return 'El nombre es obligatorio';
    return '';
};