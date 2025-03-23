import React from "react";
import axios from "axios";

interface LoginForm {
  email: string;
  password: string;
}

export const LoginForm = ({ className }: { className?: string }) => {
  const [form, setForm] = React.useState<LoginForm>({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`localhost:8080/auth/login`, form); // TODO: quitar localhost

      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));

      window.location.href = '/home'; // TODO sería recomendable usar useNavigate pero entonces necesitaría <BrowserRouter>
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Credenciales incorrectas');
      } else {
        setError('Error de conexión con el servidor');
      }
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
