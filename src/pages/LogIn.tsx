import {Button, Col, Form, Row} from "react-bootstrap";
import loginImage from "../assets/img/login.webp"
import {useState} from "react";
import {login, registerUser} from "../services/apiCalls.ts";
import {useNavigate} from "react-router-dom";

function LogIn() {
    const [signUp, setSignUp] = useState(false);
    const [mail, setEmail] = useState<string>("");
    const [user, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try{
            const response = await registerUser({ mail, user, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user);
            localStorage.setItem("userId", response.data.userId);
            navigate("/");
        }catch(error){
            const email = document.getElementById("email") as HTMLInputElement | null;
            const nombreUsuario = document.getElementById("nombreUsuario") as HTMLInputElement | null;

            // @ts-ignore
            if(error.response.data.type === "USER_ALREADY_EXISTS"){
                nombreUsuario?.classList.add("is-invalid");
                email?.classList.remove("is-invalid");
            }// @ts-ignore
            else if(error.response.data.type === "EMAIL_ALREADY_EXISTS"){
                email?.classList.add("is-invalid");
                nombreUsuario?.classList.remove("is-invalid");
            }
        }
    }

    const handleLogIn = async () => {
        try{
            const response = await login({user, password});
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user);
            localStorage.setItem("userId", response.data.userId);
            navigate("/");
        }catch(error){
            const nombreUsuario = document.getElementById("nombreUsuario") as HTMLInputElement | null;
            const password = document.getElementById("password") as HTMLInputElement | null;

            // @ts-ignore
            if(error.status === 401){
                nombreUsuario?.classList.add("is-invalid");
                password?.classList.add("is-invalid");
            }
        }
    }

    const resetErrors = () => {
        const email = document.getElementById("email") as HTMLInputElement | null;
        const nombreUsuario = document.getElementById("nombreUsuario") as HTMLInputElement | null;
        email?.classList.remove("is-invalid");
        nombreUsuario?.classList.remove("is-invalid");
    }

    return (
        <>
            <Row className="gx-0" style={{height:'100vh'}}>
                <Col xs={12} lg={6}
                     className="d-flex flex-column justify-content-center align-items-center h-100 custom-primary"
                >
                    <h2 className="text-light fs-1 fw-bold text-center d-block w-50 mb-5 pb-5">CYBER ARENA</h2>
                    <h1 className="text-light fw-bold text-start d-block w-50">
                        {
                            signUp ? "Sign Up" : "Log In"
                        }
                    </h1>
                    <p className="text-light fs-4 mb-5 w-50">
                        {
                            signUp ?
                                "!Bienvenido! Crea una cuenta y empieza a competir"
                                :
                                "!Bienvenido de nuevo! Por favor, inicia sesión."
                        }
                    </p>
                    {
                        signUp &&
                        <Form.Group controlId="email" className="mb-4 w-50">
                            <Form.Label className="text-light">Correo</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Correo"
                                value={mail}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este correo ya está registrado
                            </Form.Control.Feedback>
                        </Form.Group>
                    }
                    <Form.Group controlId="nombreUsuario" className="mb-4 w-50">
                        <Form.Label className="text-light">Usuario</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Usuario"
                            value={user}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {signUp ? "El usuario ya existe" : ""}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password" className="w-50">
                        <Form.Label className="text-light">Contraseña</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Contraseña"
                            name={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Nombre de usuario o contraseña inválido
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        className="w-25 mt-5 custom-action"
                        onClick={() => signUp ? handleSignUp() : handleLogIn()}
                    >
                        {
                            signUp ? "Sign Up" : "Log In"
                        }
                    </Button>
                    <p className="text-light mt-3">
                        {
                            signUp ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"
                        }
                        <span className="text-primary" style={{cursor: "pointer"}}
                              onClick={() => {
                                  setSignUp(!signUp)
                                  resetErrors();
                              }}
                        >
                            &nbsp;
                            {
                                signUp ? "Iniciar sesión" : "Registrate"
                            }
                        </span>
                    </p>
                </Col>
                <Col lg={6} className="d-none d-lg-block mh-100">
                    <img src={loginImage} alt="Log in image" className="object-fit-cover w-100 h-100"/>
                </Col>
            </Row>
        </>
    );
}

export default LogIn;