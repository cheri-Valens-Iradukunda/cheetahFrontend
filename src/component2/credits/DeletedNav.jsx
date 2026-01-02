import { Link } from "react-router-dom"

import "./Deleted.css"

export const DeletedNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    {/* <Link className = "nav" to="/purchaseCredit">Purchase credits</Link> */}
                    <Link className = "nav" to="/salesCredit">Sales credit</Link>
                    <Link className = "nav" to="/searchCustomer">Search customer</Link>
                </div>
            </div>
        </div>
    </>

}