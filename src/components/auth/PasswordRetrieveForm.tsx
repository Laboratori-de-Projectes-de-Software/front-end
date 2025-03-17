import React from "react";

interface PasswordRetrieveForm {
  email: string;
}

export const PasswordRetrieveForm = ({ className }: { className?: string }) => {
  const [form, setForm] = React.useState<PasswordRetrieveForm>({
    email: "",
  });

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div
      className={
        "bg-zinc-700 text-white flex flex-col gap-10 rounded-2xl " +
        (className ? " " + className : "")
      }
    >
      <h1 className="text-4xl self-center">Contraseña olvidada?</h1>
      <p>
        Introduce tu correo a continuación y te mandaremos un correo electrónico
        para que puedas restablecer tu contraseña
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="text-black bg-white rounded-2xl placeholder-gray-700 placeholder-opacity-50 p-2"
        />

        <button
          type="submit"
          className="rounded-3xl bg-orange-300 text-black p-5"
        >
          Aceptar
        </button>
      </form>
      <div className="text-red-500">{error ? error : ""}</div>
      <div className="flex justify-between text-zinc-300">
        {/* Te has olvidado la contraseña? */}
        <a href="/login">Ya tienes cuenta?</a>
      </div>
    </div>
  );
};

export default PasswordRetrieveForm;
