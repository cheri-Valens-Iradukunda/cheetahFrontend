import { Link } from "react-router-dom"
// import "./Deleted.css"

export const ReportNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/dailyReport">Daily report</Link>
                    <Link className = "nav" to="/monthlyReport">Search report</Link>
                </div>
            </div>
        </div>
    </>

}