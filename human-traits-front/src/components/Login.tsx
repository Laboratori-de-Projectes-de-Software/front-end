import Footer from "./Footer";

export default function Login(){
  
    return (
      <>
      <div className="general_container">
        <Footer />
        <div className="login_content">
          <div className="auth-box">
            <div className="auth-section">
              <h2>Welcome back!</h2>
              <label>User:</label>
              <input type="text" placeholder="Enter your username" />
              <label>Password:</label>
              <input type="password" placeholder="Enter your password" />
              <button className="button-round button-blue">Log In</button>
            </div>
            <div className="separator">or</div>
            <div className="auth-section">
              <h2>Sign Up</h2>
              <label>User:</label>
              <input type="text" placeholder="Choose a username" />
              <label>Password:</label>
              <input type="password" placeholder="Create a password" />
              <label>Repeat Password:</label>
              <input type="password" placeholder="Confirm your password" />
              <button className="button-round button-blue">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  
}