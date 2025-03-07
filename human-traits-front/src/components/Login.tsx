import Footer from "./Footer";
import { Link } from "react-router-dom";
export default function Login(){
  
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
            <div className="separator">or</div>
            <div className="auth-section">
              <h2>Sign Up</h2>
              <label>User:</label>
              <input type="text" placeholder="Choose a username" />
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" />
              <label>Password:</label>
              <input type="password" placeholder="Create a password" />
              <label>Repeat Password:</label>
              <input type="password" placeholder="Confirm your password" />
              <Link to="/account">
                <button className="button-round button-blue">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  
}