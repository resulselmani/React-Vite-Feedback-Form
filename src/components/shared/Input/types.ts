import { InputHTMLAttributes } from "react"

export type Props = {
    type: "number" | "text" |"email" | "textarea";
    placeholder: string;
    required: boolean;
    className: string;
    register: any;
    validationSchema: any;
    name: string;
    errorMessage?: string;
    min?: number;
    max?: number;
}

export type InputProps = Props & InputHTMLAttributes<HTMLElement>;