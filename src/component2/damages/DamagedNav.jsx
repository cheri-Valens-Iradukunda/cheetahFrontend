import { Link } from "react-router-dom"
import "./Deleted.css"

export const DamagedNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/damagedForm">New Damage</Link>
                    {/* <Link className = "nav" to="/damagedTable">View Damages</Link> */}
                    <Link className = "nav" to="/damagedApproved">Approved</Link>
                    {
                        localStorage.getItem("userType") == "admin"?
                    <Link className = "nav" to="/damagedPendings">Pending</Link>:<></>
                    }
                </div>
            </div>
        </div>
    </>

}