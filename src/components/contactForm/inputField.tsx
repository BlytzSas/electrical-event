import type { AnyFieldApi } from "@tanstack/react-form";
import { FieldInfo } from "./fieldInfo";
import type { ChangeEvent } from "react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  field: AnyFieldApi;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ name, placeholder, field, type, value, onChange }: InputFieldProps) {
  return (
    <div className="w-full">
      <input className="border border-(--color-primary) placeholder:text-gray-500 rounded-md px-4 py-2 w-full"
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
      />
      <FieldInfo field={field} />
    </div>
  )
}
