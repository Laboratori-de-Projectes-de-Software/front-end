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

export default function SignUp() {
    // State for signup form
    const [signupData, setSignupData] = useState<SignupFormData>({
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    });
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

        window.APIConection.createUser(userData);

    };



    return (
        <>
            <div className="general_container">
                <Footer />
                <div className="login_content">
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
                            {/* <Link to="/account"> */}
                            <button className="button-round button-blue" onClick={handleSignup}>Sign Up</button>
                            {/* </Link> */}
                        </div>
                    </div>
                <Link to="/login"><p>Silly ME, I already have an account</p></Link>
                </div>
            </div>
        </>
    );

}