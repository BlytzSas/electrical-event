import { useForm } from "@tanstack/react-form";
import { InputField } from "./inputField";
import { TextArea } from "./textArea";

type FormField = {
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
};

export function ContactForm({ formFields }: { formFields: FormField[] }) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      return value
    },
  });

  return (
    <form
      className="p-6 flex flex-col items-center justify-between border rounded-md border-(--color-primary) gap-8 w-full md:w-md"
      action="https://formspree.io/f/xeoapnkw"
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => (
          <InputField
            name={field.name}
            type="text"
            value={field.state.value}
            placeholder={formFields[0].placeholder}
            field={field}
            onChange={(event) =>
              field.handleChange(event.target.value)
            }
          />
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <InputField
            name={field.name}
            type="email"
            value={field.state.value}
            placeholder={formFields[1].placeholder}
            field={field}
            onChange={(event) =>
              field.handleChange(event.target.value)
            }
          />
        )}
      </form.Field>
      <form.Field name="phone">
        {(field) => (
          <InputField
            name={field.name}
            type="text"
            value={field.state.value}
            placeholder={"Phone"}
            field={field}
            onChange={(event) =>
              field.handleChange(event.target.value)
            }
          />
        )}
      </form.Field>
      <form.Field name="message">
        {(field) => (
          <TextArea
            name={field.name}
            value={field.state.value}
            placeholder={"Message"}
            field={field}
            onChange={(event) =>
              field.handleChange(event.target.value)
            }
          />
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            className="bg-(--color-primary) rounded-md text-(--color-background) px-4 py-2 w-full cursor-pointer"
            type="submit"
            disabled={!canSubmit}
          >
            {isSubmitting ? "..." : "Submit"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
