// utils/formValidator.ts
type ValidatorFn = (value: any, allValues?: any) => string | null

export function validateForm(data: any, rules: { [field: string]: ValidatorFn[] }) {
  const errors: { [key: string]: string } = {}

  for (const field in rules) {
    for (const validator of rules[field]) {
      const error = validator(data[field], data)
      if (error) {
        errors[field] = error
        break // solo primer error por campo
      }
    }
  }

  return errors
}

// Validadores reutilizables
export const isRequired = (msg = "Campo obligatorio") => (v: any) =>
  !v?.toString().trim() ? msg : null

export const isEmail = (msg = "Correo inválido") => (v: any) =>
  !v?.includes("@") ? msg : null

export const minLength = (min: number, msg: string) => (v: string) =>
  v?.length < min ? msg : null

export const isEqual = (field: string, msg: string) => (v: string, data: any) =>
  v !== data[field] ? msg : null

export const isPhone = (msg = "Teléfono inválido") => (v: string) =>
  !/^\d{8,}$/.test(v) ? msg : null

export const isText = (msg = "Solo se permiten letras") => (v: string) =>
  !/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v) ? msg : null;


export const isStrongPassword = (
  msg = "Debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un símbolo"
) => (v: string) =>
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v) ? msg : null