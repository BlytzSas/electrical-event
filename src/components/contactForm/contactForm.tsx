import { Fragment } from "react";
import { useForm } from "@tanstack/react-form";
import { InputField } from "./inputField";
import { TextArea } from "./textArea";
import { Bounce, ToastContainer, toast } from 'react-toastify';


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
      try {
        const response = await fetch("/api/createContact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
        const data = await response.json();

        if (data.success) {
          toast.success('Solicitud Exitosa 🚀!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
          form.reset();
        } else {
          console.log("Error:", data.error.Body.message);
          toast.error(`Peticion Rechazada ❌: ${data.error.Body.message}`, 
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
          );
        }
      } catch (err) {
        
        toast.error('Ocurrió un error al enviar el formulario ❌', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        console.error("Error en la petición:", err);
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  

  return (
    <Fragment>
      <ToastContainer position="top-center" autoClose={3000} />
      <form
      className="p-6 flex flex-col items-center justify-between border rounded-md border-(--color-primary) gap-8 w-full md:w-md"
      onSubmit={handleSubmit}
    >
      <form.Field name="name">
        {(field) => (
          <InputField
            name={field.name}
            type="text"
            value={field.state.value}
            placeholder={formFields[0]?.placeholder || "Name"}
            field={field}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <InputField
            name={field.name}
            type="email"
            value={field.state.value}
            placeholder={formFields[1]?.placeholder || "Email"}
            field={field}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>

      <form.Field name="phone">
        {(field) => (
          <InputField
            name={field.name}
            type="text"
            value={field.state.value}
            placeholder={formFields[2]?.placeholder || "Phone"}
            field={field}
            onChange={(event) => field.handleChange(event.target.value)}
          />
        )}
      </form.Field>

      <form.Field name="message">
        {(field) => (
          <TextArea
            name={field.name}
            value={field.state.value}
            placeholder={formFields[3]?.placeholder || "Message"}
            field={field}
            onChange={(event) => field.handleChange(event.target.value)}
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
    </Fragment>
    
  );
}
