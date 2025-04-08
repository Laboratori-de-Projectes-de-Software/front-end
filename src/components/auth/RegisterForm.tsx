import React from "react";
import { saveToken, sendRequest, saveUserInfo } from "../../utils/auth";

const register_url = "http://localhost:8080/register";
const redirect_url = "/login";
interface RegisterForm {
  user: string;
  email: string;
  password: string;
}

export const RegisterForm = ({ className }: { className?: string }) => {
  const [form, setForm] = React.useState<RegisterForm>({
    email: "",
    password: "",
    user: "",
  });

  const [repetirPassword, setRepetirPassword] = React.useState<string>("");

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      if (form.password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        return;
      }

      if (form.password !== repetirPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      const response = await sendRequest("POST", register_url, form);

      if (response.status === 200) {
        window.location.href = redirect_url;
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error en el registro");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error en el registro");
      } else {
        setError("Error de conexión con el servidor");
      }
      console.log(err);
    }
    console.log(form);
  };

  return (
    <div
      className={
        "bg-zinc-700 text-white flex flex-col gap-10 rounded-2xl " +
        (className ? " " + className : "")
      }
    >
      <h1 className="text-4xl self-center">Creación de cuenta</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="text-black bg-white rounded-2xl placeholder-gray-700 placeholder-opacity-50 p-2"
        />
        <input
          type="text"
          placeholder="Nombre"
          value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })}
          className="text-black bg-white rounded-2xl placeholder-gray-700 placeholder-opacity-50 p-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="text-black bg-white rounded-2xl placeholder-gray-700 placeholder-opacity-50 p-2"
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={repetirPassword}
          onChange={(e) => setRepetirPassword(e.target.value)}
          className="text-black bg-white rounded-2xl placeholder-gray-700 placeholder-opacity-50 p-2"
        />
        <button
          type="submit"
          className="rounded-3xl bg-green-700 text-white p-5"
        >
          Registrar
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

export default RegisterForm;
