import { AuthError } from "@supabase/supabase-js";

export function handleAuthError(error: AuthError): string {
    switch (error.message) {
        case 'Invalid login credentials':
            return "Correo electrónico o contraseña incorrectos";
        case 'Email not confirmed':
            return "Correo electrónico no confirmado. Por favor, verifica tu bandeja de entrada.";
        case 'User not found':
            return "Usuario no encontrado. Por favor, verifica tus credenciales.";
        case 'Password reset required':
            return "Contraseña restablecida requerida. Por favor, restablece tu contraseña.";
        case 'Session expired':
            return "Sesión expirada. Por favor, inicia sesión nuevamente.";
        default:
            return "Error desconocido. Por favor, inténtalo de nuevo más tarde.";
    }
}