import Footer from "./Footer";
import SideBar from "./SideBar";

export default function Account() {


  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="IAs_container">
                <h2>Add AIs</h2>
                <div>
                    <label>Trait: </label>
                    <input type="text" placeholder="Trait" />
                    <label>Secret: </label>
                    <input type="text" placeholder="Secret" />
                    <label>Endpoint: </label>
                    <input type="text" placeholder="Endpoint" />
                </div>
                <button className="button-round button-blue">ADD</button>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Trait</th>
                        <th>Endpoint</th>
                        <th>Date</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Compassion</td>
                        <td>http://endpoint.com</td>
                        <td>01/01/2025</td>
                        <td>
                            <button className="delete-button">✖</button>
                        </td>
                        </tr>
                        <tr>
                        <td>Empathy</td>
                        <td>http://endpoint.com</td>
                        <td>01/01/2025</td>
                        <td>
                            <button className="delete-button">✖</button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}