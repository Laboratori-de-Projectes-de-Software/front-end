import React from "react";

interface LoginForm {
  email: string;
  password: string;
}

export const LoginForm = ({ className }: { className?: string }) => {
  const [form, setForm] = React.useState<LoginForm>({
    email: "",
    password: "",
  });

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
      <h1 className="text-4xl self-center">Iniciar Sesión</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="text-black bg-white rounded-2xl placeholder-gray-700 placeholder-opacity-50 p-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="text-black bg-white rounded-2xl placeholder-gray-700 placeholder-opacity-50 p-2"
        />
        <button
          type="submit"
          className="rounded-3xl bg-teal-500 text-black p-5"
        >
          Iniciar Sesión
        </button>
      </form>
      <div className="flex justify-between text-zinc-300">
        {/* Te has olvidado la contraseña? */}
        <a href="/register">¿No tienes cuenta?</a>
        <a href="/passretrieve">¿Has olvidado tu contraseña?</a>
      </div>
    </div>
  );
};

export default LoginForm;
