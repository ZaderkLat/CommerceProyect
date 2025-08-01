"use client";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import AlertComponent from "@/components/uipersonalized/alert";
import { Car, Loader2 } from "lucide-react"
import { login } from "@/lib/auth/sessionHandler";
import { loginUser } from "@/interface/interfaceAuth";
import toast from "react-hot-toast";
export default function FormLogin() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError(null); // Reset error on input change
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitting(true);
        try {
            const user: loginUser = {
                email: formData.email,
                password: formData.password
            };
            const response = await login(user);

            if (!response.success) {
                setError(response.error || "Error desconocido");
                toast.error(response.error || "Error desconocido");
                console.error("Error al iniciar sesión:", response.error);
            } else {
                console.log("Inicio de sesión exitoso:", response.data);
            }
        } catch (error) {
            setError("Error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.");
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsSubmitting(false);
        }
        console.log("Datos del formulario:", formData);

    }
    return (

        <Card className="w-full max-w-md mx-auto  shadow-lg p-6">
            
            <CardHeader>
                <CardTitle className="text-3xl">Inicio de sesión</CardTitle>
                <CardDescription className="text-lg">Ingrese sus credenciales.</CardDescription>
                {error && (

                    <AlertComponent
                        type="destructive"
                        title={error}
                        description=''
                        iconType="error"
                    />

                )}
            </CardHeader>

            <CardContent>

                <form className="flex flex-col gap-4 px-0.5 pb-4 >" onSubmit={handleSubmit}>
                    <div className="flex flex-col ">
                        <label className="text-lg font-normal pb-4" htmlFor="email" >Correo electrónico:</label>
                        <input className=" border border-gray-400 text-lg px-2 py-2"
                            type="text" id="email" name="email"
                            placeholder="correo@ejemplo.com"
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-lg font-normal pb-4" htmlFor="password">Contraseña:</label>
                        <input className=" border border-gray-400 text-lg px-2 py-2"
                            type="password" id="password" name="password"
                            placeholder="********"
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="flex items-center aling pt-5">
                        <Button type="submit" name="login" id="login"
                            className="w-full text-lg"
                            disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Iniciar sesión"}
                        </Button>
                    </div>

                </form>
            </CardContent>

        </Card>

    );
}