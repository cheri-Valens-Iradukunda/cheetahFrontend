import { Link } from "react-router-dom"

export const DashNav = () => {
    return<>
        <div className="deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/insertTool">Insert tool</Link>
                    <Link className = "nav" to="/viewTools">View all</Link>
                </div>
            </div>
        </div>
    </>

}