import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, validateName } from './registerValidation';

describe('registerValidation utils', () => {
    describe('validateEmail', () => {
        it('devuelve error si está vacío', () => {
            expect(validateEmail('')).toBe('El email es obligatorio');
        });
        it('devuelve error si el formato es inválido', () => {
            expect(validateEmail('correosin-arroba.com')).toBe('Email no válido');
        });
        it('devuelve string vacío si es válido', () => {
            expect(validateEmail('test@test.com')).toBe('');
        });
    });

    describe('validatePassword', () => {
        it('devuelve error si es corta', () => {
            expect(validatePassword('12345')).toBe('Mínimo 6 caracteres');
        });
        it('devuelve string vacío si tiene 6 o más', () => {
            expect(validatePassword('123456')).toBe('');
        });
    });

    describe('validateName', () => {
        it('devuelve error si está vacío', () => {
            expect(validateName('')).toBe('El nombre es obligatorio');
        });
    });
});