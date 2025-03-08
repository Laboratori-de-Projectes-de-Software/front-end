import Footer from "./Footer";
import SideBar from "./SideBar";


interface TableRow {
  trait: string;
  endpoint: string;
  date: string;
}

const tableData: TableRow[] = [
  { trait: "Compassion", endpoint: "http://endpoint.com", date: "01/01/2025" },
  { trait: "Empathy.................", endpoint: "http://endpoint.com", date: "01/01/2025" },
];

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
                <div className="table_container">
                  <table className="table">
                      <thead>
                          <tr>
                          <th>Trait</th>
                          <th>Endpoint</th>
                          <th>Date</th>
                          <th>Delete</th>
                          </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.trait}</td>
                            <td>{row.endpoint}</td>
                            <td>{row.date}</td>
                            <td>
                              <button className="delete-button">✖</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}