import Footer from "./Footer";
import SideBar from "./SideBar";
import { useState } from "react";
import Usuario from "../assets/user-picture.png";
import InputField from "./InputField";


export default function Account() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="account_save">
              <h2> Account Settings</h2>
              <img src={Usuario} alt="Representación visual del usuario" className="user-image" />
              <div className="form-container">
                <form>


                  <InputField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button className="button-round button-blue">
                    Save
                  </button>

                </form>
              </div>
            </div>
            <div className="IAs_container">

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}