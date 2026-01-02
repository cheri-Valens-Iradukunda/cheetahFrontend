import { Link } from "react-router-dom"
import "./Deleted.css"

export const ExpenseNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/expenseForm">New expense</Link>
                    <Link className = "nav" to="/expensesApproved">Approved</Link>
                    {
                        localStorage.getItem("userType") == "admin"?
                    <Link className = "nav" to="/expensesPendings">Pending</Link>:<></>
                    }
                </div>
            </div>
        </div>
    </>

}