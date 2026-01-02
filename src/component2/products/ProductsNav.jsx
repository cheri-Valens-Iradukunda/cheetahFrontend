import { Link } from "react-router-dom"
import "./Deleted.css"

export const ProductsNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/productForm">New products</Link>
                    <Link className = "nav" to="/productTable">View products</Link>
                    {
                        localStorage.getItem("userType") == "admin"?
                        <Link className = "nav" to="/pendingProducts">Pending</Link>:<></>
                    }
                </div>
            </div>
        </div>
    </>

}