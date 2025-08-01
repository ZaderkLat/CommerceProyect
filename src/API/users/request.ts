'use server'
import { supabase } from "@/lib/supabaseClient"
import { userData } from "@/interface/requestUser";
import { create } from "domain";

export async function registerUserData(userData: userData)
: Promise<{ success: boolean; data?: any; error?: string }> {
    // Registrar el usuario en Supabase Auth
    const { data, error } = await supabase
        .from('users')
        .insert({
            first_name: userData.firstName,
            last_name: userData.lastName,
            supabase_user_id: userData.supabaseUserId,
            email: userData.email,
            phone_number: userData.phoneNumber,
            role: userData.role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }); 
    if (error) {
        console.error("Error al registrar datos del usuario:", error.message);
        return { success: false, error: error.message };
    }
    return { success: true, data: data };
 
}