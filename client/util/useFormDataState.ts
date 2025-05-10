import { useState } from "react";

export function useFormDataState<T>(initialState: T) {
    const [formData, setState] = useState(initialState)

    const setFormData = (property: keyof typeof formData) => (value: string) => setState(state => ({ ...state, [property]: value }))

    return [formData, setFormData] as const;
}
