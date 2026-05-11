/**
 * @fileoverview Utilidades de validación para formularios de autenticación.
 */

/**
 * Valida el formato de un correo electrónico utilizando expresiones regulares.
 * @param {string} email - Correo electrónico introducido por el usuario.
 * @returns {string} Mensaje de error o string vacío si es válido.
 */
export const validateEmail = (email: string): string => {
    if (!email) return 'El email es obligatorio';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? '' : 'Email no válido';
};

/**
 * Valida que la contraseña cumpla con los requisitos mínimos de seguridad (6 caracteres).
 * @param {string} password - Contraseña introducida por el usuario.
 * @returns {string} Mensaje de error o string vacío si es válida.
 */
export const validatePassword = (password: string): string => {
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'Mínimo 6 caracteres';
    return '';
};

/**
 * Valida que el nombre de usuario no esté vacío.
 * @param {string} name - Nombre introducido por el usuario.
 * @returns {string} Mensaje de error o string vacío si es válido.
 */
export const validateName = (name: string): string => {
    if (!name) return 'El nombre es obligatorio';
    return '';
};