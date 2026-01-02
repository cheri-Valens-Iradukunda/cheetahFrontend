import { Link } from "react-router-dom"
import "./Deleted.css"

export const ExportsNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/exportForm">New export</Link>
                    <Link className = "nav" to="/exportTable">View export</Link>
                </div>
            </div>
        </div>
    </>

}