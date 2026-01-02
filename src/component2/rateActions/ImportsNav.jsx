import { Link } from "react-router-dom"
import "./Deleted.css"

export const ImportsNav = () => {
    return<>
        <div className="container-fluid deleted_nav">
            <div className="row">
                <div className="col-sm-12">
                    <Link className = "nav" to="/rateImport">Import</Link>
                    <Link className = "nav" to="/rateExport">Export</Link>
                    <Link className = "nav" to="/rateExpenses">Expenses</Link>
                    <Link className = "nav" to="/rateDamages">Damages</Link>
                </div>
            </div>
        </div>
    </>

}