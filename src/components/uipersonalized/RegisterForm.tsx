"use client";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"

import {
    validateForm,
    isRequired,
    isEmail,
    isEqual,
    isPhone,
    isText,
    isStrongPassword,
} from "@/utils/formValidator"

import { registerUser } from "@/interface/interfaceAuth";
import { userData } from "@/interface/requestUser";
import { createUser } from "@/controller/userController/userRequest";


import AlertComponent from "@/components/uipersonalized/alert";
export default function RegisterForm() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
        supabaseUserId: '',
        phoneNumber: '',
    });
    const rules = {
        email: [isRequired(), isEmail()],
        password: [isRequired(), isStrongPassword()],
        passwordConfirm: [isRequired(), isEqual("password", "Las contraseñas no coinciden"), isStrongPassword()],
        firstName: [isRequired("Ingrese su nombre"), isText("Solo se permiten letras")],
        lastName: [isRequired("Ingrese su apellido")],
        phoneNumber: [isRequired(), isPhone()],
    }

    const [formFull, setFormFull] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Verificar si todos los campos requeridos están completos
        setErrors((prev) => ({ ...prev, [name]: "" })) // borra error al escribir
        if (formData.email && formData.password && formData.passwordConfirm && formData.firstName && formData.lastName && formData.phoneNumber) {
            setFormFull(false);
        } else {
            setFormFull(true);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitting(true);

        const errors = validateForm(formData, rules)

        if (Object.keys(errors).length > 0) {
            setIsSubmitting(false);
            setErrors(errors)
            return
        }

        setErrors({})

        const user: userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            supabaseUserId: "",
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            role: "user", // Asignar un rol por defecto, puedes cambiarlo según tu lógica
        };
        const userRegistration: registerUser = {
            email: formData.email,
            password: formData.password,
        };
        const response = await createUser(user, userRegistration);

        if (!response.success) {
            setIsSubmitting(false);
            console.error("Error al registrar usuario:", response.error);
            return;
        }

        console.log("Datos del formulario:", formData);
        setIsSubmitting(false);
    }
    return (

        <Card className="w-full max-w-md mx-auto  shadow-lg p-6">
            <CardHeader>
                <CardTitle className="text-3xl">Registrar usuario</CardTitle>
                <CardDescription className="text-lg">Ingrese sus credenciales.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-4 px-0.5 pb-4" onSubmit={handleSubmit}>
                    {/* Correo */}
                    <div className="flex flex-col">
                        <label className="text-lg font-normal pb-2" htmlFor="email">Correo electrónico:</label>
                        <input
                            className={`border px-2 py-2 text-lg rounded-sm  ${errors.email ? "border-red-500" : "border-gray-400"}`}
                            type="text" id="email" name="email"
                            placeholder="correo@ejemplo.com"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        {errors.email &&
                            <AlertComponent
                                type="destructive"
                                title=""
                                description={errors.email}
                                iconType="error"
                            />
                        }

                    </div>

                    {/* Contraseña */}
                    <div className="flex flex-col">
                        <label className="text-lg font-normal pb-2" htmlFor="password">Contraseña:</label>
                        <input
                            className={`border px-2 py-2 text-lg rounded-sm  ${errors.password ? "border-red-500" : "border-gray-400"}`}
                            type="password" id="password" name="password"
                            placeholder="********"
                            onChange={handleChange}
                            value={formData.password}
                        />
                        {errors.password &&
                            <AlertComponent
                                type="destructive"
                                title=""
                                description={errors.password}
                                iconType="error"
                            />}
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="flex flex-col">
                        <label className="text-lg font-normal pb-2" htmlFor="passwordConfirm">Repetir contraseña:</label>
                        <input
                            className={`border px-2 py-2 text-lg rounded-sm   ${errors.passwordConfirm ? "border-red-500" : "border-gray-400"}`}
                            type="password" id="passwordConfirm" name="passwordConfirm"
                            placeholder="********"
                            onChange={handleChange}
                            value={formData.passwordConfirm}
                        />
                        {errors.passwordConfirm &&
                            <AlertComponent
                                type="destructive"
                                title=""
                                description={errors.passwordConfirm}
                                iconType="error"
                            />}
                    </div>

                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label className="text-lg font-normal pb-2" htmlFor="firstName">Nombre:</label>
                        <input
                            className={`border px-2 py-2 text-lg rounded-sm  ${errors.firstName ? "border-red-500" : "border-gray-400"}`}
                            type="text" id="firstName" name="firstName"
                            placeholder="Nombre"
                            onChange={handleChange}
                            value={formData.firstName}
                        />
                        {errors.firstName &&
                            <AlertComponent
                                type="destructive"
                                title=""
                                description={errors.firstName}
                                iconType="error"
                            />}
                    </div>

                    {/* Apellido */}
                    <div className="flex flex-col">
                        <label className="text-lg font-normal pb-2" htmlFor="lastName">Apellido:</label>
                        <input
                            className={`border px-2 py-2 text-lg rounded-sm  ${errors.lastName ? "border-red-500" : "border-gray-400"}`}
                            type="text" id="lastName" name="lastName"
                            placeholder="Apellido"
                            onChange={handleChange}
                            value={formData.lastName}
                        />
                        {errors.lastName &&
                            <AlertComponent
                                type="destructive"
                                title=""
                                description={errors.lastName}
                                iconType="error"
                            />}
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col">
                        <label className="text-lg font-normal pb-2" htmlFor="phoneNumber">Número de teléfono:</label>
                        <input
                            className={`border px-2 py-2 text-lg rounded-sm   ${errors.phoneNumber ? "border-red-500" : "border-gray-400"}`}
                            type="text" id="phoneNumber" name="phoneNumber"
                            placeholder="12345678"
                            onChange={handleChange}
                            value={formData.phoneNumber}
                        />
                        {errors.phoneNumber &&
                            <AlertComponent
                                type="destructive"
                                title=""
                                description={errors.phoneNumber}
                                iconType="error"
                            />}
                    </div>

                    {/* Botón de submit */}
                    <div className="flex items-center pt-5">
                        <Button
                            type="submit"
                            className="w-full text-lg"
                            disabled={formFull || isSubmitting}
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Registrar usuario"}
                        </Button>
                    </div>
                </form>
            </CardContent>

        </Card>

    );
}