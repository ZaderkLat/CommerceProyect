//Registrar ususario en la base de datos
'use server'
import { registerUserData } from "@/API/users/request";
import { userData } from "@/interface/requestUser";

//Registrar nuevo usuario en supabase
import { register } from "@/lib/auth/sessionHandler";
import { registerUser } from "@/interface/interfaceAuth";

export const createUser = async (userData: userData, userRegistration: registerUser):
 Promise<{ success: boolean; data?: any; error?: string }> => {
    // Registrar el usuario en Supabase Auth
    const authResponse = await register(userRegistration);

    if (!authResponse.success) {
        console.error("Error al registrar usuario:", authResponse.error);
        return { success: false, error: authResponse.error };
    }

    userData.supabaseUserId = authResponse.data.user.id; // Asignar el ID del usuario de Supabase
    userData.role = "user"; // Asignar un rol por defecto, puedes cambiarlo según tu lógica

    // Registrar los datos del usuario en la base de datos
    const dbResponse = await registerUserData(userData);

    if (!dbResponse.success) {
        return { success: false, error: dbResponse.error };
    }

    return { success: true, data: dbResponse.data };
 

    
}
