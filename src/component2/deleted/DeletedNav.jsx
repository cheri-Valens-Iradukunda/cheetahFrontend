import { Link } from "react-router-dom"

import "./Deleted.css"

export const DeletedNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/deletedApproved">Approved</Link>
                    {
                        localStorage.getItem("userType") == "admin"?
                    <Link className = "nav" to="/deletedPendings">Pending</Link>:<></>
                    }
                </div>
            </div>
        </div>
    </>

}