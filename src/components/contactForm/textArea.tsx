import type { AnyFieldApi } from "@tanstack/react-form";
import { FieldInfo } from "./fieldInfo";

interface TextAreaProps {
  name: string;
  placeholder: string;
  field: AnyFieldApi;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ name, placeholder, field, value, onChange }: TextAreaProps) {
  return (
    <div className="w-full">
      <textarea className="border border-(--color-primary) placeholder:text-gray-500 rounded-md px-4 py-2 w-full"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FieldInfo field={field} />
    </div>
  );
}
