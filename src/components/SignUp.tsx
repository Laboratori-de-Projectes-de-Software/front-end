import Footer from "./Footer";
import { Link } from "react-router-dom";
import { UserDTORegister } from "./ConAPI";
import { ChangeEvent, FormEvent, useState } from "react";

interface SignupFormData {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

interface NotificationProps {
    message: string;
    type: "success" | "error";
}

export default function SignUp() {
    // State for signup form
    const [signupData, setSignupData] = useState<SignupFormData>({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    });

    const [notification, setNotification] = useState<NotificationProps | null>(null);

    // Handle signup form changes
    const handleSignupChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    // Function to handle signup button click
    const handleSignup = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        // Validate passwords match
        if (signupData.password !== signupData.repeatPassword) {
            alert("Passwords don't match");
            return;
        }

        // Create user data object for registration
        const userData: UserDTORegister = {
            user: signupData.username,
            mail: signupData.email,
            password: signupData.password
        };

        window.APIConection.createUser(userData).then(() => {
            setNotification({
                message: "Account created successfully!",
                type: "success"
            });
        })
            .catch((error: any) => {
                setNotification({
                    message: error.message || "Failed to create account",
                    type: "error"
                });
            });
    };

    const notificationStyles = {
        container: {
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '16px',
            position: 'relative' as const,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        success: {
            backgroundColor: '#e6f4ea',
            border: '1px solid #34a853',
            color: '#1e7e34'
        },
        error: {
            backgroundColor: '#fdecea',
            border: '1px solid #ea4335',
            color: '#d32f2f'
        },
        closeButton: {
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            marginLeft: '8px'
        }
    };

    // Notification component
    const Notification = ({ message, type }: NotificationProps) => {
        const style = {
            ...notificationStyles.container,
            ...(type === "success" ? notificationStyles.success : notificationStyles.error)
        };

        return (
            <div style={style} role="alert">
                <span>{message}</span>
                <button
                    style={notificationStyles.closeButton}
                    onClick={() => setNotification(null)}
                >
                    &times;
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="general_container">
                <Footer />
                <div className="login_content">
                    {notification && <Notification message={notification.message} type={notification.type} />}
                    <div className="auth-box">
                        <div className="auth-section">
                            <h2>Sign Up</h2>
                            <label>User:</label>
                            <input
                                type="text"
                                name="username"
                                value={signupData.username}
                                onChange={handleSignupChange}
                                placeholder="Choose a username"
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                placeholder="Enter your email"
                            />
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                                placeholder="Create a password"
                            />
                            <label>Repeat Password:</label>
                            <input
                                type="password"
                                name="repeatPassword"
                                value={signupData.repeatPassword}
                                onChange={handleSignupChange}
                                placeholder="Confirm your password"
                            />
                            <button className="button-round button-blue" onClick={handleSignup}>Sign Up</button>
                        </div>
                    </div>
                    <Link to="/login"><p>Silly ME, I already have an account</p></Link>
                </div>
            </div>
        </>
    );
}