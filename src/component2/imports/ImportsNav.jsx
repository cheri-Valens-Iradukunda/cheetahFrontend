import { Link } from "react-router-dom"
import "./Deleted.css"

export const ImportsNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/importForm">New Import</Link>
                    <Link className = "nav" to="/importTable">View Imports</Link>
                </div>
            </div>
        </div>
    </>

}