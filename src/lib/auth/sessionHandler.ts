import { supabase } from "@/lib/supabaseClient";
import { loginUser, registerUser } from "@/interface/interfaceAuth";
import { LoginResponse } from "@/interface/interfaceAuth";
import { handleAuthError } from "./errorSessionHandler";
//registra un nuevo usuario
//retorna un objeto con el estado de la operación
export async function register(registerUser : registerUser) : Promise<LoginResponse> {

    const {data, error} =  await supabase.auth.signUp({
        email: registerUser.email,
        password: registerUser.password
    });
    console.error("Datos de registro:", data.user);
    if(error) {
        console.error("Error al registrar usuario:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true, data: data };

}
export async function login(userData : loginUser) : Promise<LoginResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
    });

    if (error) {
        const errorMessage = handleAuthError(error);
        console.error("Error al iniciar sesión:", error.message);
        return { success: false, error: errorMessage };
    }
    

    return { success: true, data: data };
}

export async function logout(): Promise<LoginResponse> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return { success: false, error: error.message };
    }

    return { success: true };
}

export async function getCurrentUser(){
   const session = await supabase.auth.getSession();
   
   if (session.data.session) {
       return session.data.session.user;
   }
   return null;
}   

