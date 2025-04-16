import Footer from "./Footer";
import { Link } from "react-router-dom";
import { UserDTOLogin, UserResponseDTO } from "./ConAPI";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';


interface loginFormData {
  username: string;
  password: string;
}

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

export default function Login() {

      const navigate = useNavigate();

        // State for login form
      const [loginData, setloginData] = useState<loginFormData>({
          username: "",
          password: "",
      });
  
      const [notification, setNotification] = useState<NotificationProps | null>(null);
  
      // Handle login form changes
      const handleloginChange = (e: ChangeEvent<HTMLInputElement>): void => {
          const { name, value } = e.target;
          setloginData({
              ...loginData,
              [name]: value
          });
      };
  
      // Function to handle login button click
      const handlelogin = (e: FormEvent<HTMLButtonElement>): void => {
          e.preventDefault();
  
          // Create user data object for log in
          const userData: UserDTOLogin = {
              user: loginData.username,
              password: loginData.password
          };
  
          window.APIConection.loginUser(userData).then((response: UserResponseDTO) => {
              setNotification({
                  message: "Account logged in successfully!",
                  type: "success"
              });
              setCookie("token",response.token,response.expiresIn);
              setCookie("userId", response.userId.toString(),response.expiresIn);
              navigate("/addia");
          })
              .catch((error: any) => {
                  setNotification({
                      message: error.message || "Failed to log account",
                      type: "error"
                  });
              });
      };

      function setCookie(name: string, value: string, date: Date): void {
        let expires = "; expires=" + date;
        
        document.cookie = name + "=" + value + expires + "; path=/";
      }
  
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
                <h2>Welcome back!</h2>
                <label>User:</label>
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleloginChange}
                  placeholder="Choose a username"
                />
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleloginChange}
                  placeholder="Enter password"
                />
                <button className="button-round button-blue" onClick={handlelogin}>Log In</button>
              </div>
            </div>
          <Link to="/signup"><p>Silly you, don't have an account already?</p></Link>
        </div>
      </div>
    </>
  );

}