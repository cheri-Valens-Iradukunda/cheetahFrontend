import { Link } from "react-router-dom"

// import "./Deleted.css"

export const DeletedNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/comvert">Comvert</Link>
                    <Link className = "nav" to="/comvertApproved">Approved</Link>
                    {
                        localStorage.getItem("userType") == "admin"?<>
                        <Link className = "nav" to="/comvertPending">Pending</Link>
                        <Link className = "nav" to="/changePrice">Change Price</Link></>:<></>
                    }
                </div>
            </div>
        </div>
    </>

}