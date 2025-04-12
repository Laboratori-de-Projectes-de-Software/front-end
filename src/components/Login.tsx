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

export default function Login() {
  return (
    <>
      <div className="general_container">
        <Footer />
        <div className="login_content">
          <div className="auth-box">
            <div className="auth-section">
              <h2>Welcome back!</h2>
              <label>User/email:</label>
              <input type="text" placeholder="Enter your username" />
              <label>Password:</label>
              <input type="password" placeholder="Enter your password" />
              <Link to="/account">
                <button className="button-round button-blue">Log In</button>
              </Link>
            </div>
          </div>
          <Link to="/signup"><p>Silly you, don't have an account already?</p></Link>
        </div>
      </div>
    </>
  );

}